import {Signpost} from "./Signpost";
import {useContext, useEffect, useState} from "react";
import axios from "../api/Axios";
import AuthContext from "../context/AuthProvider";

// todo: správný odkaz
const LOGIN_URL = '/api';

export const Login = () => {
	const { setAuth } = useContext(AuthContext);
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		setErrMsg('');
	}, [user, password])

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(LOGIN_URL,
				JSON.stringify({ user, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				}
			);
			console.log(JSON.stringify(response?.data));
			//console.log(JSON.stringify(response));
			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			setAuth({ user, password, roles, accessToken });
			setUser('');
			setPassword('');
			setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
		}
	}

	return (
		<>
			{success ? (
				<>
					<Signpost />
				</>
			) : (
				<section>
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
						<button>Registrace</button>
						<button>Zapomenuté heslo?</button>
					</form>
				</section>
			)}
		</>
	);
};