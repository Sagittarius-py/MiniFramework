import MiniFramework from "../Modules/MiniFramework";
import { MyContext } from "./Context";

const State2 = () => {
	const contextValue = MyContext.useContext();
	const [state, setState] = MiniFramework.useState(contextValue);

	const increment = () => {
		setState((prevState) => ({ count: prevState.count + 1 }));
	};

	// Funkcja do aktualizacji wartości kontekstu
	const updateContext = () => {
		MyContext.setContextValue({ count: state.count + 1 });
		console.log(contextValue);
	};

	return (
		<div>
			<p>Count: {contextValue.count}</p>
			<button
				onClick={() => {
					increment();
					updateContext(); // Aktualizuj kontekst po inkrementacji
				}}
			>
				Increment
			</button>
			<p style={{ color: "white" }}>Contextowa zmiana stanu</p>
		</div>
	);
};

export default State2;
