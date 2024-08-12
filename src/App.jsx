import MiniFramework from "../Modules/MiniFramework";
import ImageComp from "./image";
import State2 from "./State2";
import State1 from "./State1";
import MapComp from "./MapComp";
import Effect from "./Effect";

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
					<State1 />
					{/* <State2 /> */}
					<hr></hr>
					<MapComp />
					<hr></hr>
					<Effect />
				</div>
				<footer></footer>
			</div>
		);
	}
}
