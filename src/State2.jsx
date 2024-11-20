import MiniFramework from "../Modules/MiniFramework";
import { CounterContext } from "./Context";

const State2 = () => {
	const context = CounterContext; // Uzyskujemy dostęp do kontekstu
	const value = context.useContext(); // Pobieramy bieżącą wartość kontekstu

	// Funkcja do zmiany wartości kontekstu o 1
	const increment = () => {
		context.setContextValue(value + 1); // Zwiększamy wartość o 1
	};

	return (
		<div>
			<button onClick={increment}>Zwiększ o 1</button>
		</div>
	);
};

export default State2;
