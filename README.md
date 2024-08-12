# MiniFramework

MiniFramework is a lightweight custom JavaScript UI framework that provides basic functionality similar to React. It includes support for functional components, state management, and lifecycle hooks like `useEffect`. This framework is built for learning purposes and to demonstrate how modern frontend frameworks like React work under the hood.

## Features

- **Custom JSX-like syntax**: Create elements using a custom `createElement` function.
- **State management**: Manage component state with `useState`.
- **Lifecycle methods**: Use `useEffect` to handle side effects in functional components.
- **Class-based components**: Support for class-based components with lifecycle hooks.
- **Component re-rendering**: Automatic re-rendering when state changes.

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/MiniFramework.git
```


# Usage
## Creating Components
You can create functional components using JavaScript functions. Components can manage their own state and use lifecycle methods like useEffect.
```bash
import MiniFramework from "./Modules/MiniFramework";

const MyComponent = () => {
    const [count, setCount] = MiniFramework.useState({ count: 0 });

    MiniFramework.useEffect(() => {
        console.log("Component mounted or updated!");

        return () => {
            console.log("Cleanup on unmount or update");
        };
    }, [count]);

    return (
        <div>
            <p>Count: {count.count}</p>
            <button onClick={() => setCount(prev => ({ count: prev.count + 1 }))}>
                Increment
            </button>
        </div>
    );
};

export default MyComponent;
```

## Rendering Components
To render a component, use the MiniFramework.render function:

```bash
import MiniFramework from "./Modules/MiniFramework";
import MyComponent from "./MyComponent";

const container = document.getElementById("app");
MiniFramework.render(<MyComponent />, container);
```

## Class-Based Components
You can also create class-based components by extending MiniFramework.Component:

```bash
class MyClassComponent extends MiniFramework.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    mount() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Increment
                </button>
            </div>
        );
    }
```

## Lifecycle Methods in Class Components
* willInit: Called before the component mounts.
* didInit: Called after the component mounts.
* didUpdate: Called after the component updates.
### Custom Hooks
The framework allows you to create and use custom hooks by leveraging the existing useState and useEffect implementations.

## Contributing
Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.
