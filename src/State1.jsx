import MiniFramework from "../Modules/MiniFramework";

const State2 = (props) => {
	const [state, setState] = MiniFramework.useState({ count: 0 });

	const increment = () => {
		console.log(state);
		setState((prevState) => ({ count: prevState.count + 1 }));
	};
	return (
		<div>
			<p>Count: {state.count}</p>
			<button onClick={() => increment()}>Increment</button>
		</div>
	);
};

export default State2;
