import App from "./App";
import MiniFramework from "../Modules/MiniFramework";
import "./style.css";

const AppComp = new App();

// Initialize and render the App component
MiniFramework.render(AppComp.mount(), document.querySelector("#root"));
