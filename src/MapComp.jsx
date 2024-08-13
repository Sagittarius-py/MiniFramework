import MiniFramework from "../Modules/MiniFramework";

const MapComp = () => {
	const exampleStrings = [
		"Hello, world!",
		"JavaScript is awesome.",
		"Let's learn to code.",
		"Arrays can hold multiple values.",
		"This is a string example.",
		"Have a great day!",
		"Coding is fun!",
		"Happy coding!",
		"OpenAI creates amazing tools.",
		"ChatGPT is here to help.",
	];

	return (
		<div>
			{exampleStrings.map((elem) => {
				return <p style="">{elem}</p>;
			})}
			<p style="color: white">Generowanie dynamicznych list znaczników</p>
		</div>
	);
};

export default MapComp;
