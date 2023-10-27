import {useEffect, useState} from "react";
import axios from "../api/Axios";
import {Signpost} from "./Signpost";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PASSWORD_REGEX = /^(?=.*[a-z]).{3,24}$/;
const REGISTER_URL = '/registration';

export const Registration = () => {
	const [firstName, setFirstName] = useState('');

	const [lastName, setLastName] = useState('');

	const [birthDate, setBirthDate] = useState('');

	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatchPassword, setValidMatchPassword] = useState(false);
	const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
		setValidMatchPassword(password === matchPassword);
	}, [password, matchPassword])

	useEffect(() => {
		setErrMsg('');
	}, [password, matchPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();

		// if button enabled with JS hack. Ochrana před hacknutím
		const v5 = PASSWORD_REGEX.test(password);
		if (!v5) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			const response = await axios.post(REGISTER_URL,
				JSON.stringify({ firstName, lastName, birthDate, email, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				}
			);
			setSuccess(true);

			setFirstName('');
			setLastName('');
			setBirthDate('');
			setEmail('');
			setPassword('');
			setMatchPassword('');
		} catch (err) {
			// není připojení k serveru, možná ho stačí spustit
			if (!err?.response) {
				setErrMsg('No Server Response');
			// 	jméno už je v db, todo: otestovat jestli funguje a co kontroluje
			} else if (err.response?.status === 409) {
				setErrMsg('Username Taken');
			} else {
				// todo: tady padne
				setErrMsg('Registration Failed')
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
					<h2>Registruj se</h2>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="zadej jméno"
							autoComplete="off"
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
							required
						/>
						<input
							type="text"
							placeholder="zadej příjmení"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							autoComplete="off"
							required
						/>
						<input
							type="date"
							placeholder="zadej datum narozeni"
							value={birthDate}
							onChange={(e) => setBirthDate(e.target.value)}
							required
						/><br/>
						<input
							type="email"
							placeholder="zadej email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="off"
							required
						/><br/>

						<label htmlFor="password">
							Password:
							<FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
							<FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
						</label>
						<input
							type="password"
							id="password"
							placeholder="zadej heslo"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							aria-invalid={validPassword ? "false" : "true"}
							aria-describedby="pwdnote"
							onFocus={() => setPasswordFocus(true)}
							onBlur={() => setPasswordFocus(false)}
						/>
						<p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} />
							8 to 24 characters.<br />
							Must include uppercase and lowercase letters, a number and a special character.<br />
							Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
						</p>

						<label htmlFor="confirm_pwd">
							Confirm Password:
							<FontAwesomeIcon icon={faCheck} className={validMatchPassword && matchPassword ? "valid" : "hide"} />
							<FontAwesomeIcon icon={faTimes} className={validMatchPassword || !matchPassword ? "hide" : "invalid"} />
						</label>
						<input
							type="password"
							id="confirm_pwd"
							placeholder="zadej heslo znovu"
							value={matchPassword}
							onChange={(e) => setMatchPassword(e.target.value)}
							required
							aria-invalid={validMatchPassword ? "false" : "true"}
							aria-describedby="confirmnote"
							onFocus={() => setMatchPasswordFocus(true)}
							onBlur={() => setMatchPasswordFocus(false)}
						/>
						<p id="confirmnote" className={matchPasswordFocus && !validMatchPassword ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must match the first password input field.
						</p>
						<button disabled={!validPassword || !validMatchPassword} value="Registrovat">Registrovat</button>
					</form>
				</section>
			)}
		</>
	);
};