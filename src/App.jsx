import MiniFramework from "../Modules/MiniFramework";
import ImageComp from "./image";
import State2 from "./State2";

export default class App extends MiniFramework.Component {
	constructor(props) {
		super(props);
	}

	mount() {
		return (
			<div>
				<header>
					<h1 style="">Welcome in Mini.js</h1>
				</header>
				<div id="container">
					<ImageComp />
					<hr></hr>
					<State2 />
				</div>
				<footer></footer>
			</div>
		);
	}
}
