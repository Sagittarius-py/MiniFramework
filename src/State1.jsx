import MiniFramework from "../Modules/MiniFramework";

const State1 = (props) => {
	const [wartosc, setWartosc] = MiniFramework.useState({ wartosc: 0 });

	const increment = () => {
		setWartosc(() => {
			wartosc: wartosc.wartosc + 1;
		});
	};
	return (
		<div>
			<p>Count: {wartosc.wartosc}</p>
			<button
				onClick={() => {
					increment();
				}}
			>
				Increment
			</button>
			<p style="color: white">
				Zmiana stanu i dynamiczne renderowanie w komponentach funkcyjnych
			</p>
		</div>
	);
};

export default State1;
