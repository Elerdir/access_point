export const Login = () => {
	return (
		<>
			<form action="">
				<h2>Přihlaš se</h2>
				<input type="email" placeholder="zadej email"/><br/>
				<input type="password" placeholder="zadej heslo"/><br/>
				<input type="submit" value="Přihlásit"/><br/>
				<input type="button" value="Registrace"/>
				<input type="button" value="Zapomenuté heslo?"/>
			</form>
		</>
	);
};