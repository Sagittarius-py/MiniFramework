const MiniFramework = {
	currentComponent: null,
	stateIndex: 0,
	effectIndex: 0,
	stateMap: new WeakMap(),
	effectMap: new WeakMap(),
	componentMap: new WeakMap(),

	createElement: (tag, props, ...children) => {
		if (typeof tag === "function" && !tag.isReactComponent) {
			return { tag, props: { ...props, children } };
		}

		if (tag.prototype && tag.isReactComponent) {
			const componentInstance = new tag(props);
			componentInstance.willInit();
			const componentElement = componentInstance.mount();
			componentInstance.didInit();
			return componentElement;
		}

		return {
			tag,
			props: { ...props, children },
		};
	},

	render: function (frameworkEl, container, replace = false) {
		// Handle arrays of elements
		if (Array.isArray(frameworkEl)) {
			if (replace) {
				container.innerHTML = "";
			}
			frameworkEl.forEach((element) => {
				this.render(element, container, false);
			});
			return;
		}

		// Handle string or number types
		if (typeof frameworkEl === "string" || typeof frameworkEl === "number") {
			if (replace) {
				container.innerHTML = "";
			}
			container.appendChild(document.createTextNode(frameworkEl));
			return;
		}

		// Handle functional components
		if (typeof frameworkEl.tag === "function") {
			this.currentComponent = frameworkEl;
			this.stateIndex = 0;
			this.effectIndex = 0;
			const componentElement = frameworkEl.tag(frameworkEl.props);
			this.currentComponent = null;

			const domNode = this.render(componentElement, container, replace);
			this.componentMap.set(frameworkEl, domNode);
			return domNode;
		}

		// Create the actual DOM element for standard elements
		const actualDOMElement = document.createElement(frameworkEl.tag);

		// Apply props to the created element, excluding children
		Object.keys(frameworkEl?.props || {})
			.filter((key) => key !== "children")
			.forEach((property) => {
				if (property.startsWith("on")) {
					actualDOMElement.addEventListener(
						property.substring(2).toLowerCase(),
						frameworkEl.props[property]
					);
				} else if (property === "className") {
					actualDOMElement.className = frameworkEl.props[property];
				} else {
					actualDOMElement[property] = frameworkEl.props[property];
				}
			});

		// Recursively render children
		frameworkEl?.props?.children?.forEach((child) => {
			this.render(child, actualDOMElement);
		});

		// Replace content in the container if required
		if (replace) {
			container.innerHTML = "";
		}
		container.appendChild(actualDOMElement);

		// Run effects after rendering
		this.runEffects(frameworkEl);

		return actualDOMElement;
	},

	useState: function (initialState) {
		const component = this.currentComponent;

		if (!component) {
			throw new Error("useState must be called within a component");
		}

		const stateIndex = this.stateIndex++;
		let componentState = this.stateMap.get(component) || [];

		if (!componentState[stateIndex]) {
			componentState[stateIndex] = initialState;
		}

		const setState = (newState) => {
			const currentState = componentState[stateIndex];
			const updatedState =
				typeof newState === "function" ? newState(currentState) : newState;

			if (updatedState !== currentState) {
				componentState[stateIndex] = updatedState;
				MiniFramework.update(component);
			}
		};

		this.stateMap.set(component, componentState);

		return [componentState[stateIndex], setState];
	},

	useEffect: function (effect, deps) {
		const component = this.currentComponent;

		if (!component) {
			throw new Error("useEffect must be called within a component");
		}

		const effectIndex = this.effectIndex++;
		let componentEffects = this.effectMap.get(component) || [];

		const prevEffect = componentEffects[effectIndex];

		const hasChanged =
			!prevEffect || !deps || deps.some((dep, i) => dep !== prevEffect.deps[i]);

		if (hasChanged) {
			if (prevEffect && prevEffect.cleanup) {
				prevEffect.cleanup();
			}

			const cleanup = effect();
			componentEffects[effectIndex] = { deps, cleanup };
		}

		this.effectMap.set(component, componentEffects);
	},

	runEffects: function (component) {
		const componentEffects = this.effectMap.get(component) || [];
		componentEffects.forEach((effect) => {
			if (effect.cleanup) {
				effect.cleanup();
			}
			effect.cleanup = effect.effect();
		});
	},

	update: function (component) {
		const domNode = this.componentMap.get(component);
		if (domNode) {
			this.render(component, domNode, true);
		}
	},
};

class MiniComponent {
	constructor(props) {
		this.props = props;
		this.state = {};
		this.willInit();
		this.mount();
		this.didInit();
	}

	willInit() {}

	didInit() {}

	didUpdate() {}

	mainDiv() {
		this.name = this.constructor.name;
		return `${this.constructor.name}`;
	}

	setState(partialState) {
		this.state = { ...this.state, ...partialState };
		MiniFramework.update(this);
	}

	mount() {
		throw new Error("Component subclass must implement mount method.");
	}

	static isReactComponent = true;
}

MiniFramework.Component = MiniComponent;

export default MiniFramework;
