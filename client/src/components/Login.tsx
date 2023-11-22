import {useContext, useEffect, useState} from "react";
import axios from "../api/Axios";
import AuthContext from "../context/AuthProvider";
import "./Login.css";
import {useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";

const LOGIN_URL = '/adm/login';

export const Login = () => {
	const { setAuth }: any = useContext(AuthContext);
	const { setUserObject }: any = useContext(UserContext);
	const [user, setUser] = useState("");
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setErrMsg('');
	}, [user, password])

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				LOGIN_URL + "?user=" + user + "&password=" + password,
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: false
				}
			);

			const token = response?.data?.user?.token;
			const administration = response?.data?.user?.administration;
			const userO = response?.data?.user;

			setUserObject({userO});
			setAuth({ user, password, administration, token });
			setUser('');
			setPassword('');

			if (administration) {
				navigate("/administration");
			} else {
				navigate("/signpost");
			}
		} catch (err) {
			console.log(err)
			// console.log(err?.response)
			// if (!err?.response) {
			// 	//todo: tohle napíše i když je server v pořádku a je chyba v kódu
			// 	setErrMsg('No Server Response');
			// } else if (err?.response?.status === 400) {
			// 	setErrMsg('Missing Username or Password');
			// } else if (err?.response?.status === 401) {
			// 	setErrMsg('Unauthorized');
			// } else {
			// 	setErrMsg('Login Failed');
			// }
		}
	}

	return (
		<section id={"login"}>
			<p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
			<h2>Přihlaš se</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="zadej email"
					onChange={(e) => setUser(e.target.value)}
					value={user}
					required
				/>
				<input
					type="password"
					placeholder="zadej heslo"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
				/>
				<button type="submit">Přihlásit</button>
				<button><a href={"/registration"}>Registrace</a></button>
				<button><a href={"/lost-password"}>Zapomenuté heslo?</a></button>
			</form>
		</section>
	);
};