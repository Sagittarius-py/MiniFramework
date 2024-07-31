import MiniFramework from "../Modules/MiniFramework";
import image from "./1.jpg";

const ImageComp = () => {
	return (
		<div>
			<img name="image" id="image" src={image} alt="fireSpot" />
			<br />
			<label for="image" style="color: white">
				Importowane zdjęcie w jsx
			</label>
		</div>
	);
};

export default ImageComp;
