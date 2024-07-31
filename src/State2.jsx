import MiniFramework from "../Modules/MiniFramework";

export default class State2 extends MiniFramework.Component {
	constructor(props) {
		super();
		this.props = props;
	}

	willInit() {
		const [getCount, setCount] = MiniFramework.useState({ count: 1 }, this);
		this.getCount = getCount;
		this.setCount = setCount;

		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
	}

	increment() {
		const currentState = this.getCount();
		this.setCount({ count: currentState.count + 1 });
	}

	decrement() {
		const currentState = this.getCount();
		this.setCount({ count: currentState.count - 1 });
	}

	mount() {
		return (
			<div id={this.constructor.name}>
				<button onClick={this.increment}>Increase</button>
				<button onClick={this.decrement}>Decrease</button>
				<h1>
					<h1>Count: {this.getCount().count}</h1>
				</h1>
			</div>
		);
	}
}
