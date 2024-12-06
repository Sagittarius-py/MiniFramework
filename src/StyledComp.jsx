import MiniFramework from "../Modules/MiniFramework";
import { CounterContext } from "./Context";

const StyledComp = () => {
	const value = CounterContext.useContext();
	const className = MiniFramework.useStyle({
		backgroundColor: "lightblue",
		padding: "10px",
		borderRadius: "5px",
		border: "1px solid black",
	});

	return (
		<div>
			<div className={className}>
				<p>This component is styled using CSS-in-JS!</p>
			</div>
			<p>Komponent stylowany za pomocą JS-CSS</p>
			<p>Wartość contextu w innym komponencie: {value}</p>{" "}
		</div>
	);
};

export default StyledComp;
