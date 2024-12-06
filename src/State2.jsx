import MiniFramework from "../Modules/MiniFramework";
import { CounterContext } from "./Context";

const State2 = () => {
	const counter = CounterContext.useContext();

	const increment = () => {
		// Bezpośrednia zmiana wartości kontekstu
		CounterContext.setValue(counter + 1);
	};

	return (
		<div>
			<button onClick={increment}>Zwiększ o 1</button>
			<p>Wartość kontekstu w innym komponencie: {counter}</p>
		</div>
	);
};

export default State2;
