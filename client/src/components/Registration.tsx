export const Registration = () => {
	return (
		<>
			<form action="">
				<h2>Registruj se</h2>
				<input type="text" placeholder="zadej jméno"/><br/>
				<input type="text" placeholder="zadej příjmení"/><br/>
				<input type="date" placeholder="zadej datum narozeni"/><br/>
				<input type="email" placeholder="zadej email"/><br/>
				<input type="password" placeholder="zadej heslo"/><br/>
				<input type="password" placeholder="zadej heslo znovu"/><br/>
				<input type="submit" value="Registrovat"/><br/>
			</form>
		</>
	);
};