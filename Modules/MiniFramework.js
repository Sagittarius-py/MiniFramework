const MiniFramework = {
	createElement: (tag, props, ...children) => {
		if (typeof tag === "function" && !tag.isReactComponent) {
			return tag(props);
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
				this.currentComponent = frameworkEl.tag;
				this.stateIndex = 0;
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
	useState: function (initialState, component) {
		// Create a proxy handler to intercept state changes
		const handler = {
			set(target, key, value) {
				target[key] = value;
				MiniFramework.update(component);
				return true; // Indicate success
			},
		};

		// Create a proxy object
		const state = new Proxy(initialState, handler);

		// Get state function
		const getState = () => state;

		// Set state function
		const setState = (newState) => {
			if (typeof newState === "function") {
				// For functional updates
				Object.assign(state, newState(state));
			} else {
				// For direct updates
				Object.assign(state, newState);
			}
		};

		return [getState, setState];
	},

	update: function (component) {
		console.log(component);
		const container = document.getElementById(component.constructor.name);
		if (container) {
			this.render(component.mount(), container, true);
		}
	},

	getApi: async function (url, method = "GET") {
		try {
			const response = await fetch(url, { method });
			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching data:", error.message);
		}
	},

	replaceValues: function (jsxCode, array) {
		if (typeof jsxCode !== "string") {
			throw new Error("Invalid JSX code provided.");
		}

		const placeholderRegex = /{{(\d+)}}/g;

		const replacedCode = jsxCode.replace(placeholderRegex, (match, index) => {
			const replacementIndex = parseInt(index, 10);
			if (replacementIndex >= 0 && replacementIndex < array.length) {
				return array[replacementIndex];
			}
			return match;
		});

		return replacedCode;
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

	// Method called when the component is mounted to the DOM
	didInit() {}

	// Method called before the component is updated
	didUpdate() {}

	mainDiv() {
		this.name = this.constructor.name;
		return `${this.constructor.name}`;
	}

	setState(partialState) {
		this.state = { ...this.state, ...partialState };
		MiniFramework.update(this);
	}

	// Method that subclasses should implement
	mount() {
		throw new Error("Component subclass must implement mount method.");
	}

	// Required to identify class components
	static isReactComponent = true;
}

MiniFramework.Component = MiniComponent;

export default MiniFramework;
