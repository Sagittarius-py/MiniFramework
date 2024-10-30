import MiniFramework from "../Modules/MiniFramework";

export const MyContext = MiniFramework.createContext();

export const MyContextProvider = ({ children }) => {
	const [contextValue, setContextValue] = MiniFramework.useState({ count: 0 });

	return (
		<MyContext.Provider value={{ contextValue, setContextValue }}>
			{children}
		</MyContext.Provider>
	);
};
