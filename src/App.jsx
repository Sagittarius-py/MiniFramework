import MiniFramework from "../Modules/MiniFramework";
import ImageComp from "./image";

import State1 from "./State1";
import MapComp from "./MapComp";
import Effect from "./Effect";
import { MyContext } from "./Context";

export default function App() {
	return (
		<MyContext.Provider>
			<div>
				<header>
					<h1>Welcome to Mini.js</h1>
				</header>
				<div id="container">
					<ImageComp />
					<hr />
					<State1 />
					<hr />
					<MapComp />
					<hr />
					<Effect />
					<hr />
				</div>
				<footer></footer>
			</div>
		</MyContext.Provider>
	);
}
