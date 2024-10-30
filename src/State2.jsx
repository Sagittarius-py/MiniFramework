import MiniFramework from "../Modules/MiniFramework";
import { MyContext } from "./Context";

const State2 = () => {
	const contextValue = MyContext.useContext();

	// Funkcja do aktualizacji wartości kontekstu bez używania lokalnego stanu
	const increment = () => {
		MyContext.setContextValue({ count: contextValue.count + 1 });
		console.log(contextValue); // Sprawdzenie wartości kontekstu w konsoli
	};

	return (
		<div>
			<p>Count: {contextValue.count}</p>
			<button
				onClick={() => {
					increment();
				}}
			>
				Increment
			</button>
			<p style={{ color: "white" }}>Contextowa zmiana stanu</p>
		</div>
	);
};

export default State2;
