import MiniFramework from "../Modules/MiniFramework";

const StyledComp = () => {
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
		</div>
	);
};

export default StyledComp;
