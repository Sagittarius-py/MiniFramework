import MiniFramework from "../Modules/MiniFramework";
import image from "./1.jpg";
import { MyContext } from "./Context";
const ImageComp = () => {
	const contextValue = MyContext.useContext();
	return (
		<div>
			<img name="image" id="image" src={image} alt="fireSpot" />
			<br />
			<label for="image" style="color: white">
				Importowane zdjęcie w jsx
			</label>
			<p>Wartość contextu w innym componencie: {contextValue.count}</p>
		</div>
	);
};

export default ImageComp;
