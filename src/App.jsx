import MiniFramework from "../Modules/MiniFramework";
import ImageComp from "./image";
import State1 from "./State1";
import State2 from "./State2";
import MapComp from "./MapComp";
import Effect from "./Effect";
import StyledComp from "./StyledComp";
import AxiosComp from "./AxiosComp";
import "./App.css";

export default function App() {
	// Create context
	const CounterContext = MiniFramework.createContext(0);

	// Define routes
	// const routes = {
	// 	"/": () => (
	// 		<div className="welcome-page">
	// 			Welcome to Mini.js! Choose a page from the menu.
	// 		</div>
	// 	),
	// 	"/image": ImageComp,
	// 	"/state1": State1,
	// 	"/state2": State2,
	// 	"/map": MapComp,
	// 	"/effect": Effect,
	// 	"/styled": StyledComp,
	// 	"/axios": AxiosComp,
	// 	"/404": () => <div className="not-found">404 - Page Not Found</div>,
	// };

	// Create router
	// const { Router, Link } = MiniFramework.createRouter(routes);

	return (
		<CounterContext.Provider value={10}>
			<div className="app-container">
				{/* Application header */}
				<header className="header">
					<h1>Welcome to Mini.js</h1>
				</header>

				{/* Navigation menu */}
				{/* <nav className="nav">
					<Link to="/" className="nav-link">
						Home
					</Link>
					<Link to="/image" className="nav-link">
						Image Component
					</Link>
					<Link to="/state1" className="nav-link">
						State 1
					</Link>
					<Link to="/state2" className="nav-link">
						State 2
					</Link>
					<Link to="/map" className="nav-link">
						Map Component
					</Link>
					<Link to="/effect" className="nav-link">
						Effect
					</Link>
					<Link to="/styled" className="nav-link">
						Styled Component
					</Link>
					<Link to="/axios" className="nav-link">
						Axios Component
					</Link>
				</nav> */}

				{/* Route container */}
				<div id="container" className="container">
					<ImageComp />
					<State1 />
					<State2 />
					<MapComp />
					<Effect />
					<StyledComp />
					<AxiosComp />
				</div>
			</div>
		</CounterContext.Provider>
	);
}
