const MiniFramework = {
	currentComponent: null,
	stateIndex: 0,
	stateMap: new WeakMap(),

	createElement: (tag, props, ...children) => {
		if (typeof tag === "function" && !tag.isReactComponent) {
			const component = () => {
				const element = tag(props);
				element.props.id = tag.name;
				MiniFramework.currentComponent = element;
				stateIndex = 0;
				return element;
			};
			return component();
		}

		if (tag.prototype && tag.isReactComponent) {
			const componentInstance = new tag(props);
			componentInstance.willInit();
			const componentElement = componentInstance.mount();
			return componentElement;
		}

		return {
			tag,
			props: { ...props, children },
		};
	},

	render: function (frameworkEl, container, replace = false) {
		if (typeof frameworkEl === "string" || typeof frameworkEl === "number") {
			if (replace) {
				container.innerHTML = "";
			}
			container.appendChild(document.createTextNode(frameworkEl));
			return;
		}

		if (typeof frameworkEl.tag === "function") {
			const isClassComponent =
				frameworkEl.tag.prototype && frameworkEl.tag.prototype.isReactComponent;

			if (isClassComponent) {
				const componentInstance = new frameworkEl.tag(frameworkEl.props);
				componentInstance.willInit();
				const componentElement = componentInstance.mount();
				this.render(componentElement, container, replace);
			} else {
				const componentElement = frameworkEl.tag(frameworkEl.props);
				this.render(componentElement, container, replace);
			}
			return;
		}

		const actualDOMElement = document.createElement(frameworkEl.tag);

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

		frameworkEl?.props?.children?.forEach((child) => {
			this.render(child, actualDOMElement);
		});

		if (replace) {
			container.innerHTML = "";
		}
		container.appendChild(actualDOMElement);
	},

	useState: function (initialState) {
		const component = MiniFramework.currentComponent;
		if (!component) {
			throw new Error("useState must be called within a component");
		}

		const stateIndex = MiniFramework.stateIndex++;
		let componentState = MiniFramework.stateMap.get(component) || [];

		const handler = {
			set(target, key, value) {
				target[key] = value;
				MiniFramework.update(component);
				return true;
			},
		};

		const state = new Proxy(initialState, handler);
		componentState[stateIndex] = state;

		const setState = (newState) => {
			const currentState = componentState[stateIndex];
			if (typeof newState === "function") {
				Object.assign(currentState, new Proxy(newState(currentState), handler));
			} else {
				Object.assign(currentState, newState);
			}
			MiniFramework.update(component);
		};

		this.stateMap.set(component, componentState);

		return [componentState[stateIndex], setState];
	},
	update: function (component) {
		const container = document.getElementById(component.props.id);
		console.log(component, "container");
		if (container) {
			this.render(component, container, true);
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
