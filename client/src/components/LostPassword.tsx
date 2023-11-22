import "./LostPassword.css";
import {useState} from "react";

export const LostPassword = () => {
	const [user, setUser] = useState("");

	const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		console.log(user)
	}

	return (
		<section id={"lost-password"}>
			<h2>Zadej email použitý při registraci</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="zadej email"
					onChange={(e) => setUser(e.target.value)}
					value={user}
					required
				/>
				<button type="submit">Poslat žádost o změnu hesla</button>
			</form>
		</section>
	);
};