import MiniFramework from "../Modules/MiniFramework";

const State1 = (props) => {
	const [state, setState] = MiniFramework.useState({ count: 0 });

	const increment = () => {
		console.log(state);
		setState((prevState) => ({ count: prevState.count + 1 }));
	};
	return (
		<div>
			<p>Count: {state.count}</p>
			<button onClick={() => increment()}>Increment</button>
			<p style="color: white">
				Zmiana stanu i dynamiczne renderowanie w komponentach funkcyjnych
			</p>
		</div>
	);
};

export default State1;
