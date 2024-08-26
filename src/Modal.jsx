import MiniFramework from "../Modules/MiniFramework";

const Modal = ({ children }) => {
	const style = {
		backgroundColor: "rgba(0,0,0,0.5)",
		padding: "20px",
		borderRadius: "10px",
		position: "absolute",
		width: "90vw",
		height: "90vh",
	};

	return MiniFramework.createPortal(
		<div style={style} isPortal>
			cok
		</div>
	);
};

export default Modal;
