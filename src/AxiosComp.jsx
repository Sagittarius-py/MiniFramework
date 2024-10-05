import axios from "axios";
import MiniFramework from "../Modules/MiniFramework";

function AxiosComp() {
	// Initialize state for the fetched data and error state
	const [data, setData] = MiniFramework.useState(null);
	const [error, setError] = MiniFramework.useState(null);

	// useEffect with an empty dependency array to ensure it only runs once on mount
	MiniFramework.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://cat-fact.herokuapp.com/facts"
				);
				setData(response.data); // Update the data state
			} catch (err) {
				setError("Error fetching data"); // Update the error state if there's an issue
			}
		};
		fetchData();
	}, []); // Empty array ensures the effect runs only once when the component mounts

	// Conditional rendering based on whether there is data or an error
	if (error) {
		return <div>{error}</div>;
	}

	if (data) {
		// Render the list of cat facts
		return (
			<div>
				<h1>Cat Facts</h1>
				<ul>
					{data.map((fact, index) => (
						<li key={index}>{fact.text}</li> // Render each fact's text
					))}
				</ul>
			</div>
		);
	} else {
		return <div>Loading...</div>; // Show a loading message while fetching
	}
}

export default AxiosComp;
