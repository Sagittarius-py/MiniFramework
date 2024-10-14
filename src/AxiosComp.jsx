import axios from "axios";
import MiniFramework from "../Modules/MiniFramework";

function AxiosComp() {
	// Initialize state for the fetched data and error state
	const [data, setData] = MiniFramework.useState(null);
	const [error, setError] = MiniFramework.useState(null);

	// useEffect with an empty dependency array to ensure it only runs once on mount
	MiniFramework.useEffect(() => {
		// Fetch data only if it's not already loaded
		if (!data) {
			const fetchData = async () => {
				try {
					const response = await axios.get("http://localhost:8000/api/get");
					setData(response.data); // Update the data state
				} catch (err) {
					setError("Error fetching data"); // Update the error state if there's an issue
				}
			};
			fetchData();
		}
	}, [data]); // Adding 'data' as a dependency ensures it fetches only when data is null

	// Conditional rendering based on whether there is data or an error
	if (error) {
		return <div>{error}</div>;
	}
	console.log(data);

	if (data) {
		return (
			<div>
				<h1>Products</h1>
				<ul>
					{data.map((product) => (
						<li key={product._id}>{product.product_name}</li> // Render each fact's text
					))}
				</ul>
			</div>
		);
	} else {
		return <div>Loading...</div>; // Show a loading message while fetching
	}
}

export default AxiosComp;
