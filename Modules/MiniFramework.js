const MiniFramework = {
	currentComponent: null, // Aktualny komponent, który jest renderowany
	stateIndex: 0, // Indeks stanu dla hooków
	effectIndex: 0, // Indeks efektu dla hooków
	stateMap: new WeakMap(), // Mapa przechowująca stany komponentów
	effectMap: new WeakMap(), // Mapa przechowująca efekty komponentów
	componentMap: new WeakMap(), // Mapa przechowująca komponenty i ich odpowiadające im elementy DOM
	contextMap: new WeakMap(), // Mapy WeakMap do przechowywania wartości kontekstów

	// Funkcja do tworzenia elementu
	createElement: (tag, props, ...children) => {
		if (typeof tag === "function" && !tag.isReactComponent) {
			// Jeżeli tag jest funkcją i nie jest komponentem klasowym
			return { tag, props: { ...props, children } };
		}

		if (tag.prototype && tag.isReactComponent) {
			// Jeżeli tag jest komponentem klasowym
			const componentInstance = new tag(props); // Tworzy instancję komponentu
			componentInstance.willInit(); // Metoda wywoływana przed montowaniem komponentu
			const componentElement = componentInstance.mount(); // Montuje komponent
			componentInstance.didInit(); // Metoda wywoływana po zamontowaniu komponentu
			return componentElement;
		}

		// Zwraca obiekt reprezentujący element DOM
		return {
			tag,
			props: { ...props, children },
		};
	},

	// Funkcja do renderowania elementu w kontenerze DOM
	render: function (frameworkEl, container, replace = false) {
		if (frameworkEl && frameworkEl.props?.isPortal) {
			console.log(typeof frameworkEl.tag);
			return;
		}

		// Obsługa tablicy elementów
		if (Array.isArray(frameworkEl)) {
			if (replace) {
				container.innerHTML = ""; // Opróżnia kontener, jeśli replace jest true
			}
			frameworkEl.forEach((element) => {
				MiniFramework.render(element, container, false); // Rekurencyjnie renderuje każdy element z tablicy
			});
			return;
		}

		// Obsługa stringów i liczb
		if (typeof frameworkEl === "string" || typeof frameworkEl === "number") {
			if (replace) {
				container.innerHTML = ""; // Opróżnia kontener, jeśli replace jest true
			}
			container.appendChild(document.createTextNode(frameworkEl)); // Dodaje tekst do kontenera
			return;
		}

		// Obsługa komponentów funkcyjnych
		if (frameworkEl && typeof frameworkEl.tag === "function") {
			MiniFramework.currentComponent = frameworkEl; // Ustaw aktualny komponent
			MiniFramework.stateIndex = 0; // Resetuj indeks stanu
			MiniFramework.effectIndex = 0; // Resetuj indeks efektu
			const componentElement = frameworkEl.tag(frameworkEl.props);
			MiniFramework.currentComponent = null; // Wyczyść `currentComponent` po renderowaniu

			const domNode = MiniFramework.render(
				componentElement,
				container,
				replace
			);
			MiniFramework.componentMap.set(frameworkEl, domNode);
			return domNode;
		}

		if (replace && container.firstChild) {
			const oldComponent = MiniFramework.componentMap.get(container.firstChild);
			if (oldComponent) {
				MiniFramework.cleanupEffects(oldComponent); // Czyszczenie efektów, gdy komponent zostaje zastąpiony
			}
		}

		// Tworzy rzeczywisty element DOM dla standardowych tagów
		const actualDOMElement = document.createElement(frameworkEl?.tag);

		if (frameworkEl?.props && frameworkEl?.props.className) {
			actualDOMElement.className = frameworkEl.props.className; // Zastosowanie klasy CSS
		}
		// Aplikuje atrybuty (props) do utworzonego elementu, z wyłączeniem dzieci
		Object.keys(frameworkEl?.props || {})
			.filter((key) => key !== "children")
			.forEach((property) => {
				if (property.startsWith("on")) {
					// Dodaje event listener, jeśli atrybut zaczyna się od "on"
					actualDOMElement.addEventListener(
						property.substring(2).toLowerCase(),
						frameworkEl.props[property]
					);
				} else if (property === "className") {
					// Obsługa klasy CSS
					actualDOMElement.className = frameworkEl.props[property];
				} else {
					// Inne atrybuty
					actualDOMElement[property] = frameworkEl.props[property];
				}
			});

		// Rekurencyjnie renderuje dzieci
		frameworkEl?.props?.children?.forEach((child) => {
			MiniFramework.render(child, actualDOMElement);
		});

		// Zastępuje zawartość kontenera, jeśli replace jest true
		if (replace) {
			container.innerHTML = "";
		}
		container.appendChild(actualDOMElement);

		// Uruchamia efekty po renderowaniu
		MiniFramework.runEffects(frameworkEl);

		return actualDOMElement; // Zwraca element DOM
	},

	useState: function (initialState) {
		const component = this.currentComponent;

		if (!component) {
			throw new Error("useState must be called within a component");
		}

		// Upewnienie się, że każdy komponent ma unikalny klucz
		const componentInstanceKey = component.instanceKey || Symbol();
		component.instanceKey = componentInstanceKey;

		// Reset `stateIndex` przy każdym renderze komponentu
		if (MiniFramework.lastComponent !== component) {
			MiniFramework.stateIndex = 0;
			MiniFramework.lastComponent = component;
		}

		const stateIndex = MiniFramework.stateIndex++;
		let componentState = MiniFramework.stateMap.get(componentInstanceKey) || [];

		// Inicjalizacja stanu, jeśli nie jest jeszcze ustawiony
		if (typeof componentState[stateIndex] === "undefined") {
			componentState[stateIndex] = initialState;
		}

		const setState = (newState) => {
			const currentState = componentState[stateIndex];
			const updatedState =
				typeof newState === "function" ? newState(currentState) : newState;

			// Aktualizuj stan tylko, jeśli jest inny
			if (updatedState !== currentState) {
				componentState[stateIndex] = updatedState;
				MiniFramework.stateMap.set(componentInstanceKey, componentState);
				MiniFramework.update(component); // Wywołaj renderowanie komponentu
			}
		};

		// Zapisz stan w `stateMap` dla tego komponentu
		MiniFramework.stateMap.set(componentInstanceKey, componentState);
		return [componentState[stateIndex], setState];
	},

	// Hook useEffect
	useEffect: function (effect, deps) {
		const component = MiniFramework.currentComponent;
		if (!component) {
			throw new Error("useEffect must be called within a component");
		}

		const effectIndex = MiniFramework.effectIndex++;
		let componentEffects = MiniFramework.effectMap.get(component) || [];

		const prevEffect = componentEffects[effectIndex];
		const hasChanged =
			!prevEffect ||
			!deps ||
			deps.some((dep, i) => dep !== prevEffect.deps?.[i]);

		if (hasChanged) {
			if (prevEffect && prevEffect.cleanup) {
				prevEffect.cleanup(); // Clean up previous effect
			}

			let isActive = true; // Guard for async operations
			const cleanup = effect(() => isActive); // Pass `isActive` to effect

			componentEffects[effectIndex] = {
				deps,
				cleanup: () => {
					isActive = false; // Mark as inactive
					if (cleanup) cleanup();
				},
			};
		}

		MiniFramework.effectMap.set(component, componentEffects);
	},

	// Uruchamianie efektów po renderowaniu komponentu
	runEffects: function (component) {
		const componentEffects = MiniFramework.effectMap.get(component) || []; // Pobiera efekty komponentu
		componentEffects.forEach((effect) => {
			if (effect.cleanup) {
				effect.cleanup(); // Wywołuje funkcję czyszczącą efektu, jeśli istnieje
			}
			effect.cleanup = effect.effect(); // Uruchamia efekt i zapisuje funkcję czyszczącą
		});
	},

	// Obsługa przerywania efektów podczas odmontowywania komponentu
	cleanupEffects: function (component) {
		const componentEffects = MiniFramework.effectMap.get(component) || [];
		componentEffects.forEach((effect) => {
			if (effect.cleanup) {
				effect.cleanup(); // Wywołanie wszystkich funkcji czyszczących
			}
		});
		MiniFramework.effectMap.delete(component); // Usunięcie efektów z mapy po odmontowaniu
	},

	diff: function (oldNode, newNode) {
		if (!oldNode || !newNode) return false; // Sprawdzenie, czy któryś z węzłów jest null

		if (typeof oldNode !== typeof newNode) return false;
		if (typeof newNode === "string" || typeof newNode === "number") {
			return oldNode === newNode;
		}
		if (oldNode.tag !== newNode.tag) {
			return false;
		}

		const oldProps = oldNode.props || {};
		const newProps = newNode.props || {};

		const oldKeys = Object.keys(oldProps);
		const newKeys = Object.keys(newProps);

		if (oldKeys.length !== newKeys.length) {
			return false;
		}

		for (let key of newKeys) {
			if (key === "children") continue;
			if (oldProps[key] !== newProps[key]) return false;
		}

		return true;
	},

	// Aktualizacja komponentu
	update: function (component) {
		const oldNode = MiniFramework.componentMap.get(component);
		MiniFramework.currentComponent = component; // Ustawiamy `currentComponent`, aby hooki działały poprawnie
		MiniFramework.stateIndex = 0; // Resetuj indeks stanu
		MiniFramework.effectIndex = 0; // Resetuj indeks efektu

		const newNode = component.tag(component.props);

		if (!MiniFramework.diff(oldNode, newNode)) {
			MiniFramework.cleanupEffects(component);
			const domNode = MiniFramework.render(component, oldNode, true);
			MiniFramework.componentMap.set(component, domNode);
		} else {
			MiniFramework.runEffects(component);
		}

		MiniFramework.currentComponent = null;
	},

	createContext: function (defaultValue) {
		let contextState = defaultValue;
		const subscribers = new Set();

		return {
			Provider: function ({ value, children }) {
				// Aktualizacja globalnego stanu kontekstu
				if (value !== undefined) {
					contextState = value;
				}

				// Powiadamianie subskrybentów o zmianie
				subscribers.forEach((subscriber) => {
					try {
						subscriber(contextState);
					} catch (error) {
						console.error("Context subscriber error:", error);
					}
				});

				return children;
			},

			useContext: function () {
				const [contextValue, setContextValue] =
					MiniFramework.useState(contextState);

				// Efekt synchronizujący wartość kontekstu
				MiniFramework.useEffect(() => {
					const updateHandler = (newValue) => {
						setContextValue(newValue);
					};

					// Dodanie subskrybenta
					subscribers.add(updateHandler);

					// Czyszczenie subskrybenta
					return () => {
						subscribers.delete(updateHandler);
					};
				}, []);

				return contextValue;
			},

			// Metoda do bezpośredniej zmiany wartości kontekstu
			setValue: (newValue) => {
				contextState = newValue;
				subscribers.forEach((subscriber) => {
					try {
						subscriber(newValue);
					} catch (error) {
						console.error("Context update error:", error);
					}
				});
			},
		};
	},

	useStyle: function (styles) {
		const component = MiniFramework.currentComponent;
		if (!component) {
			throw new Error("useStyle must be called within a component");
		}

		const styleTagId = `style-${component.tag.name}`;
		let styleTag = document.getElementById(styleTagId);

		if (!styleTag) {
			styleTag = document.createElement("style");
			styleTag.id = styleTagId;
			document.head.appendChild(styleTag);
		}

		const className = `class-${component.tag.name}-${Math.random()
			.toString(36)
			.substr(2, 5)}`;

		// Konwersja stylów z camelCase na kebab-case
		const css = `
			.${className} {
				${Object.entries(styles)
					.map(([key, value]) => {
						const kebabKey = key
							.replace(/([a-z])([A-Z])/g, "$1-$2")
							.toLowerCase();
						return `${kebabKey}: ${value};`;
					})
					.join(" ")}
			}
		`;

		// Dodawanie nowego CSS do istniejącego styleTag
		styleTag.appendChild(document.createTextNode(css));

		return className;
	},

	// createRouter: function (routes) {
	// 	// Private state to track current route and route parameters
	// 	let currentRoute = null;
	// 	let routeParams = {};

	// 	// Utility function to parse route parameters
	// 	const parseRouteParams = (pattern, path) => {
	// 		const params = {};
	// 		const patternParts = pattern.split("/").filter(Boolean);
	// 		const pathParts = path.split("/").filter(Boolean);

	// 		// Only attempt parameter parsing if the number of parts match
	// 		if (patternParts.length === pathParts.length) {
	// 			patternParts.forEach((part, index) => {
	// 				if (part.startsWith(":")) {
	// 					const paramName = part.slice(1);
	// 					params[paramName] = pathParts[index];
	// 				}
	// 			});
	// 		}

	// 		return params;
	// 	};

	// 	// Router object with methods
	// 	const Router = {
	// 		// Match route and return corresponding component
	// 		match: (path) => {
	// 			// Normalize path by removing trailing slashes and ensuring leading slash
	// 			path = path.replace(/\/+$/, "") || "/";

	// 			// Find the first matching route
	// 			for (let route in routes) {
	// 				// Convert route pattern to a regex that handles parameters
	// 				const routeRegex = new RegExp(
	// 					`^${route.replace(/:[^/]+/g, "([^/]+)")}$`
	// 				);

	// 				if (routeRegex.test(path)) {
	// 					currentRoute = route;
	// 					routeParams = parseRouteParams(route, path);
	// 					return routes[route];
	// 				}
	// 			}

	// 			// Fallback to 404 route if no match is found
	// 			return routes["/404"] || null;
	// 		},

	// 		// Get current route parameters
	// 		getParams: () => ({ ...routeParams }),

	// 		// Get current matched route
	// 		getCurrentRoute: () => currentRoute,
	// 	};

	// 	// Create a routing component that uses the Router
	// 	const RouterComponent = () => {
	// 		const [currentPath, setCurrentPath] = MiniFramework.useState(
	// 			window.location.pathname
	// 		);

	// 		MiniFramework.useEffect(() => {
	// 			const handleLocationChange = () => {
	// 				const newPath = window.location.pathname;
	// 				setCurrentPath(newPath);
	// 			};

	// 			window.addEventListener("popstate", handleLocationChange);

	// 			return () => {
	// 				window.removeEventListener("popstate", handleLocationChange);
	// 			};
	// 		}, []);

	// 		const Component = Router.match(currentPath);

	// 		// Pass route parameters to the matched component
	// 		return Component
	// 			? MiniFramework.createElement(Component, {
	// 					key: currentPath,
	// 					routeParams: Router.getParams(),
	// 			  })
	// 			: null;
	// 	};

	// 	// Enhanced navigation function
	// 	const navigate = (path, replace = false) => {
	// 		// Normalize path
	// 		path = path.replace(/\/+$/, "") || "/";

	// 		if (replace) {
	// 			window.history.replaceState({}, "", path);
	// 		} else {
	// 			window.history.pushState({}, "", path);
	// 		}

	// 		// Dispatch popstate to trigger route change
	// 		window.dispatchEvent(new PopStateEvent("popstate"));
	// 	};

	// 	// Create a Link component that works with the new router
	// 	const Link = ({ to, replace = false, children, ...props }) => {
	// 		const handleClick = (event) => {
	// 			event.preventDefault();
	// 			navigate(to, replace);
	// 		};

	// 		return MiniFramework.createElement(
	// 			"a",
	// 			{
	// 				...props,
	// 				href: to,
	// 				onClick: handleClick,
	// 			},
	// 			children
	// 		);
	// 	};

	// 	return {
	// 		Router: RouterComponent,
	// 		navigate,
	// 		Link,
	// 		getParams: Router.getParams,
	// 		getCurrentRoute: Router.getCurrentRoute,
	// 	};
	// },
};

export default MiniFramework;
