import MiniFramework from "../Modules/MiniFramework";
import { CounterContext } from "./Context";

const State2 = () => {
	const value = CounterContext.useContext();

	const increment = () => {
		console.log("Current value before increment:", value); // Log przed inkrementacją
		const newValue = value + 1;
		console.log("New value:", newValue); // Log nowej wartości
		CounterContext.setContextValue(newValue);
	};

	return (
		<div>
			<button onClick={increment}>Zwiększ o 1</button>
			<p>Wartość kontekstu w innym komponencie: {value}</p>
		</div>
	);
};

export default State2;
