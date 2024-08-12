import MiniFramework from "../Modules/MiniFramework";

const Effect = () => {
	const [count, setCount] = MiniFramework.useState({ count: 0 });

	MiniFramework.useEffect(() => {
		console.log("Component mounted or updated!");

		// Cleanup logic when the component unmounts or before the next effect
		return () => {
			console.log("Cleanup on unmount or update");
		};
	}, [count]);

	return (
		<div>
			<p>Count: {count.count}</p>
			<button
				onClick={() =>
					setCount((prevState) => ({ count: prevState.count + 1 }))
				}
			>
				Increment
			</button>
		</div>
	);
};

export default Effect;
