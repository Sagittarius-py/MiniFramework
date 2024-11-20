import MiniFramework from "../Modules/MiniFramework";
import image from "./1.jpg";
import { CounterContext } from "./Context";

const ImageComp = () => {
	const context = CounterContext; // Uzyskujemy dostęp do kontekstu
	const value = context.useContext(); // Pobieramy bieżącą wartość kontekstu

	return (
		<div>
			<img name="image" id="image" src={image} alt="fireSpot" />
			<br />
			<label htmlFor="image" style={{ color: "white" }}>
				Importowane zdjęcie w JSX
			</label>
			<p>Wartość contextu w innym komponencie: {value}</p>{" "}
		</div>
	);
};
export default ImageComp;
