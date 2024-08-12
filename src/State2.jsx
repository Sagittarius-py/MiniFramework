import MiniFramework from "../Modules/MiniFramework";

export default class State2 extends MiniFramework.Component {
	constructor(props) {
		super(props);
		const [state, setState] = MiniFramework.classState({ count: 0 });
		this.state = state;
		this.setState = setState;
	}

	increment = () => {
		this.setState((prevState) => ({ count: prevState.count + 1 }));
	};

	mount() {
		return (
			<div>
				<p>Count: {this.state.count}</p>
				<button onClick={this.increment}>Increment</button>
			</div>
		);
	}
}
