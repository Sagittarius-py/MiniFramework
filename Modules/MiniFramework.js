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
			this.createPortal(frameworkEl.content, frameworkEl.targetContainer);
			return;
		}

		// Obsługa tablicy elementów
		if (Array.isArray(frameworkEl)) {
			if (replace) {
				container.innerHTML = ""; // Opróżnia kontener, jeśli replace jest true
			}
			frameworkEl.forEach((element) => {
				this.render(element, container, false); // Rekurencyjnie renderuje każdy element z tablicy
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
			this.currentComponent = frameworkEl; // Ustawia aktualny komponent
			this.stateIndex = 0; // Resetuje indeks stanu
			this.effectIndex = 0; // Resetuje indeks efektu
			const componentElement = frameworkEl.tag(frameworkEl.props); // Wywołuje funkcję komponentu
			this.currentComponent = null;

			const domNode = this.render(componentElement, container, replace); // Rekurencyjnie renderuje element
			this.componentMap.set(frameworkEl, domNode); // Mapuje komponent na element DOM
			return domNode;
		}

		if (replace && container.firstChild) {
			const oldComponent = this.componentMap.get(container.firstChild);
			if (oldComponent) {
				this.cleanupEffects(oldComponent); // Czyszczenie efektów, gdy komponent zostaje zastąpiony
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
			this.render(child, actualDOMElement);
		});

		// Zastępuje zawartość kontenera, jeśli replace jest true
		if (replace) {
			container.innerHTML = "";
		}
		container.appendChild(actualDOMElement);

		// Uruchamia efekty po renderowaniu
		this.runEffects(frameworkEl);

		return actualDOMElement; // Zwraca element DOM
	},

	// Hook useState
	useState: function (initialState) {
		const component = this.currentComponent;

		if (!component) {
			throw new Error("useState must be called within a component");
		}

		const stateIndex = this.stateIndex++; // Increment state index
		let componentState = this.stateMap.get(component) || [];

		// Initialize state if not already set
		if (typeof componentState[stateIndex] === "undefined") {
			componentState[stateIndex] = initialState;
		}

		const setState = (newState) => {
			const currentState = componentState[stateIndex];
			const updatedState =
				typeof newState === "function" ? newState(currentState) : newState;

			// Update only if the state has changed
			if (updatedState !== currentState) {
				componentState[stateIndex] = updatedState;
				this.stateMap.set(component, componentState); // Save state back to map
				MiniFramework.update(component); // Trigger a component update
			}
		};

		this.stateMap.set(component, componentState);
		return [componentState[stateIndex], setState];
	},

	// Hook useEffect
	useEffect: function (effect, deps) {
		const component = this.currentComponent;
		if (!component) {
			throw new Error("useEffect must be called within a component");
		}

		const effectIndex = this.effectIndex++;
		let componentEffects = this.effectMap.get(component) || [];

		const prevEffect = componentEffects[effectIndex];
		const hasChanged =
			!prevEffect ||
			!deps ||
			deps.some((dep, i) => dep !== prevEffect.deps?.[i]);

		// If dependencies have changed, or if this is the first time running
		if (hasChanged) {
			if (prevEffect && prevEffect.cleanup) {
				prevEffect.cleanup(); // Clean up previous effect
			}

			const cleanup = effect(); // Run the new effect and store its cleanup function
			componentEffects[effectIndex] = { deps, cleanup };
		}

		this.effectMap.set(component, componentEffects);
	},

	// Uruchamianie efektów po renderowaniu komponentu
	runEffects: function (component) {
		const componentEffects = this.effectMap.get(component) || []; // Pobiera efekty komponentu
		componentEffects.forEach((effect) => {
			if (effect.cleanup) {
				effect.cleanup(); // Wywołuje funkcję czyszczącą efektu, jeśli istnieje
			}
			effect.cleanup = effect.effect(); // Uruchamia efekt i zapisuje funkcję czyszczącą
		});
	},

	// Obsługa przerywania efektów podczas odmontowywania komponentu
	cleanupEffects: function (component) {
		const componentEffects = this.effectMap.get(component) || [];
		componentEffects.forEach((effect) => {
			if (effect.cleanup) {
				effect.cleanup(); // Wywołanie wszystkich funkcji czyszczących
			}
		});
		this.effectMap.delete(component); // Usunięcie efektów z mapy po odmontowaniu
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
		const oldNode = this.componentMap.get(component);
		this.currentComponent = component; // Ustawiamy `currentComponent`, żeby działały hooki
		const newNode = component.tag(component.props); // Tworzymy nowy element komponentu

		if (!this.diff(oldNode, newNode)) {
			this.cleanupEffects(component); // Czyścimy efekty przed ponownym renderowaniem
			const domNode = this.render(component, oldNode, true);
			this.componentMap.set(component, domNode);
		} else {
			this.runEffects(component);
		}
		this.currentComponent = null; // Czyszczenie `currentComponent` po aktualizacji
	},

	// Funkcja do tworzenia kontekstu
	createContext: function (defaultValue) {
		const context = {
			defaultValue, // Wartość domyślna kontekstu
			state: defaultValue, // Bieżący stan kontekstu
			subscribers: new Set(), // Zbiór subskrybentów aktualizacji kontekstu
		};

		// Funkcja do modyfikacji wartości kontekstu
		function setContextValue(newValue) {
			context.state = newValue; // Ustawia nową wartość stanu kontekstu
			context.subscribers.forEach((callback) => callback(newValue)); // Powiadamia subskrybentów o zmianie
		}

		// Komponent Provider umożliwiający aktualizację kontekstu
		function Provider({ value, children }) {
			if (value !== undefined) {
				setContextValue(value); // Aktualizuje wartość kontekstu, jeśli została podana
			}
			return children; // Renderuje dzieci
		}

		// Hook useContext do uzyskiwania wartości kontekstu
		function useContext() {
			const [value, setValue] = MiniFramework.useState(context.state); // Uzyskuje aktualną wartość kontekstu

			MiniFramework.useEffect(() => {
				const updateValue = (newValue) => setValue(newValue); // Funkcja aktualizująca stan z nową wartością kontekstu
				context.subscribers.add(updateValue); // Dodaje funkcję aktualizującą do subskrybentów
				return () => context.subscribers.delete(updateValue); // Usuwa funkcję z subskrybentów podczas odmontowania
			}, []);

			return value; // Zwraca wartość kontekstu
		}

		return {
			Provider, // Komponent Provider
			useContext, // Hook useContext
			setContextValue, // Funkcja do zmiany wartości kontekstu
		};
	},
	useStyle: function (styles) {
		const component = this.currentComponent;
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

	//! Routing
	Router: function ({ routes }) {
		const [currentPath, setCurrentPath] = MiniFramework.useState(
			window.location.pathname
		);

		MiniFramework.useEffect(() => {
			const onLocationChange = () => setCurrentPath(window.location.pathname);

			window.addEventListener("popstate", onLocationChange);

			return () => {
				window.removeEventListener("popstate", onLocationChange);
			};
		}, []);

		// Renderuje komponent dla bieżącej ścieżki
		const Component = routes[currentPath] || routes["/404"]; // Obsługa 404, jeśli ścieżka nie pasuje
		return Component ? Component() : null;
	},
	navigate: function (path) {
		window.history.pushState({}, "", path);
		const popStateEvent = new PopStateEvent("popstate");
		window.dispatchEvent(popStateEvent); // Wyzwala event popstate, aby Router mógł zareagować
	},
	Link: function ({ to, children }) {
		const handleClick = (event) => {
			event.preventDefault(); // Zapobiega domyślnemu przeładowaniu strony
			MiniFramework.navigate(to); // Wywołuje nawigację
		};

		return MiniFramework.createElement(
			"a",
			{ href: to, onClick: handleClick },
			children
		);
	},
};

// Klasa bazowa dla komponentów
class MiniComponent {
	constructor(props) {
		this.props = props; // Przypisanie właściwości (props) do instancji komponentu
		this.state = {}; // Inicjalizacja stanu komponentu jako pustego obiektu
		this.willInit(); // Wywołanie metody willInit (przed montowaniem komponentu)
		this.mount(); // Wywołanie metody mount (montowanie komponentu)
		this.didInit(); // Wywołanie metody didInit (po zamontowaniu komponentu)
	}

	willInit() {} // Metoda wywoływana przed montowaniem komponentu

	didInit() {} // Metoda wywoływana po zamontowaniu komponentu

	didUpdate() {} // Metoda wywoływana po aktualizacji komponentu

	mainDiv() {
		this.name = this.constructor.name; // Przypisuje nazwę klasy do zmiennej name
		return `${this.constructor.name}`; // Zwraca nazwę klasy jako string
	}

	// Ustawia nowy stan komponentu
	setState(partialState) {
		this.state = { ...this.state, ...partialState }; // Aktualizuje stan komponentu
		MiniFramework.update(this); // Aktualizuje komponent w DOM
	}

	// Metoda montująca, musi być zaimplementowana przez podklasę
	mount() {
		throw new Error("Component subclass must implement mount method."); // Rzuca błąd, jeśli metoda nie została zaimplementowana
	}

	// Oznacza, że jest to komponent kompatybilny z Reactem
	static isReactComponent = true;
}

// Dodanie klasy MiniComponent do MiniFramework jako jego składnik
MiniFramework.Component = MiniComponent;

export default MiniFramework;
