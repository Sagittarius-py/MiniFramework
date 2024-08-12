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

	let newList = exampleStrings.map((elem) => {
		return <p style="color: white">{elem}</p>;
	});

	return <div>{newList}</div>;
};

export default MapComp;
