import MiniFramework from "../Modules/MiniFramework";
import ImageComp from "./image";

import State1 from "./State1";
import State2 from "./State2";
import MapComp from "./MapComp";
import Effect from "./Effect";
import StyledComp from "./StyledComp";
import { MyContext } from "./Context";
import AxiosComp from "./AxiosComp";
import "./App.css"; // Importowanie pliku CSS

export default function App() {
	const routes = {
		"/": () =>
			MiniFramework.createElement(
				"div",
				null,
				"Welcome to Mini.js! Choose a page from the menu."
			),
		"/image": ImageComp,
		"/state1": State1,
		"/state2": State2,
		"/map": MapComp,
		"/effect": Effect,
		"/styled": StyledComp,
		"/axios": AxiosComp,
		"/404": () =>
			MiniFramework.createElement("div", null, "404 - Page Not Found"),
	};

	return (
		<MyContext.Provider value={{ count: 0 }}>
			<div>
				{/* Nagłówek aplikacji */}
				<header className="header">
					<h1>Welcome to Mini.js</h1>
				</header>

				{/* Menu nawigacyjne */}
				<nav className="nav">
					<MiniFramework.Link to="/" className="nav-link">
						Home
					</MiniFramework.Link>
					<MiniFramework.Link to="/image" className="nav-link">
						Image Component
					</MiniFramework.Link>
					<MiniFramework.Link to="/state1" className="nav-link">
						State 1
					</MiniFramework.Link>
					<MiniFramework.Link to="/state2" className="nav-link">
						State 2
					</MiniFramework.Link>
					<MiniFramework.Link to="/map" className="nav-link">
						Map Component
					</MiniFramework.Link>
					<MiniFramework.Link to="/effect" className="nav-link">
						Effect
					</MiniFramework.Link>
					<MiniFramework.Link to="/styled" className="nav-link">
						Styled Component
					</MiniFramework.Link>
					<MiniFramework.Link to="/axios" className="nav-link">
						Axios Component
					</MiniFramework.Link>
				</nav>

				{/* Kontener na komponenty w zależności od trasy */}
				<div id="container" className="container">
					<MiniFramework.Router routes={routes} />
				</div>
			</div>
		</MyContext.Provider>
	);
}
