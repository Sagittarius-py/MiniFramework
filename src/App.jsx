import MiniFramework from "../Modules/MiniFramework";
import ImageComp from "./image";

import State1 from "./State1";
import State2 from "./State2";
import MapComp from "./MapComp";
import Effect from "./Effect";
import StyledComp from "./StyledComp";
import { MyContext } from "./Context";
import Modal from "./Modal";
import AxiosComp from "./AxiosComp";

export default function App() {
	return (
		<MyContext.Provider value={{ count: 0 }}>
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
					<State2 />
					<hr />
					<StyledComp />
					<hr />
					<Modal />
					<hr />
					<AxiosComp />
				</div>
				<footer></footer>
			</div>
		</MyContext.Provider>
	);
}
