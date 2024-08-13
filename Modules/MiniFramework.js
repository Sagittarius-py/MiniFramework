const MiniFramework = {
	currentComponent: null, // Aktualny komponent, który jest renderowany
	stateIndex: 0, // Indeks stanu dla hooków
	effectIndex: 0, // Indeks efektu dla hooków
	stateMap: new WeakMap(), // Mapa przechowująca stany komponentów
	effectMap: new WeakMap(), // Mapa przechowująca efekty komponentów
	componentMap: new WeakMap(), // Mapa przechowująca komponenty i ich odpowiadające im elementy DOM

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
		if (typeof frameworkEl.tag === "function") {
			this.currentComponent = frameworkEl; // Ustawia aktualny komponent
			this.stateIndex = 0; // Resetuje indeks stanu
			this.effectIndex = 0; // Resetuje indeks efektu
			const componentElement = frameworkEl.tag(frameworkEl.props); // Wywołuje funkcję komponentu
			this.currentComponent = null;

			const domNode = this.render(componentElement, container, replace); // Rekurencyjnie renderuje element
			this.componentMap.set(frameworkEl, domNode); // Mapuje komponent na element DOM
			return domNode;
		}

		// Tworzy rzeczywisty element DOM dla standardowych tagów
		const actualDOMElement = document.createElement(frameworkEl.tag);

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
		const component = this.currentComponent; // Pobiera aktualny komponent

		if (!component) {
			throw new Error("useState must be called within a component"); // Błąd, jeśli useState jest używany poza komponentem
		}

		const stateIndex = this.stateIndex++; // Inkrementuje indeks stanu
		let componentState = this.stateMap.get(component) || []; // Pobiera stan komponentu

		if (!componentState[stateIndex]) {
			componentState[stateIndex] = initialState; // Inicjalizuje stan, jeśli nie jest jeszcze ustawiony
		}

		const setState = (newState) => {
			const currentState = componentState[stateIndex]; // Bieżący stan
			const updatedState =
				typeof newState === "function" ? newState(currentState) : newState; // Nowy stan

			if (updatedState !== currentState) {
				componentState[stateIndex] = updatedState; // Aktualizuje stan, jeśli się zmienił
				MiniFramework.update(component); // Aktualizuje komponent
			}
		};

		this.stateMap.set(component, componentState); // Aktualizuje mapę stanów

		return [componentState[stateIndex], setState]; // Zwraca stan i funkcję do jego aktualizacji
	},

	// Hook useEffect
	useEffect: function (effect, deps) {
		const component = this.currentComponent; // Pobiera aktualny komponent

		if (!component) {
			throw new Error("useEffect must be called within a component"); // Błąd, jeśli useEffect jest używany poza komponentem
		}

		const effectIndex = this.effectIndex++; // Inkrementuje indeks efektu
		let componentEffects = this.effectMap.get(component) || []; // Pobiera efekty komponentu

		const prevEffect = componentEffects[effectIndex]; // Poprzedni efekt

		// Sprawdza, czy zależności się zmieniły
		const hasChanged =
			!prevEffect || !deps || deps.some((dep, i) => dep !== prevEffect.deps[i]);

		if (hasChanged) {
			if (prevEffect && prevEffect.cleanup) {
				prevEffect.cleanup(); // Wywołuje funkcję czyszczącą poprzedniego efektu
			}

			const cleanup = effect(); // Uruchamia nowy efekt
			componentEffects[effectIndex] = { deps, cleanup }; // Zapisuje nowy efekt
		}

		this.effectMap.set(component, componentEffects); // Aktualizuje mapę efektów
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

	// Aktualizacja komponentu
	update: function (component) {
		const domNode = this.componentMap.get(component); // Pobiera element DOM powiązany z komponentem
		if (domNode) {
			this.render(component, domNode, true); // Renderuje komponent ponownie, zastępując jego zawartość
		}
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
