import App from "./App";
import MiniFramework from "../Modules/MiniFramework";
import "./style.css";

// Initialize and render the App component
MiniFramework.render(
	MiniFramework.createElement(App),
	document.querySelector("#root")
);
