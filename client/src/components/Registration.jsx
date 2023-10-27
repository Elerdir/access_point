import {useEffect, useRef, useState} from "react";
import axios from "../api/Axios";
import {Signpost} from "./Signpost";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// todo: upravit?
const FIRSTNAME_REGEX = /^[A-Z]{1,23}$/;
// const LASTNAME_REGEX = /^[A-Z][a-z]{3,23}$/;
const LASTNAME_REGEX = /^[A-Z]{0,23}$/;
// todo: musí začít velkým ěi malým a následuje velký či malý, písmena, - nebo _ 4 až 24 znaků
const BIRTHDATE_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/registration';

export const Registration = () => {
	const firstNameRef = useRef();
	const errRef = useRef();

	const [firstName, setFirstName] = useState('');
	const [validFirstName, setValidFirstName] = useState(false);
	const [firstNameFocus, setFirstNameFocus] = useState(false);

	const [lastName, setLastName] = useState('');
	const [validLastname, setValidLastName] = useState(false);

	const [birthDate, setBirthDate] = useState('');
	const [validBirthDate, setValidBirthDate] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatchPassword, setValidMatchPassword] = useState(false);
	const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	// todo: Really useful video. However I am trying to type this in TypeScript and running into a couple of issues and could use some help.
	//
	// 1. userRef.current.focus() gives error of possibly undefined.
	// Doing userRef.current?.focus() gives "Property 'focus' does not exist on type 'never'.
	//
	// 2. In login we use
	// <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
	//
	// Got this error.
	//
	// "Type 'MutableRefObject<undefined>' is not assignable to type 'LegacyRef<HTMLParagraphElement> | undefined'.
	//
	//   Type 'MutableRefObject<undefined>' is not assignable to type 'RefObject<HTMLParagraphElement>'.
	//
	//     Types of property 'current' are incompatible.
	//
	//       Type 'undefined' is not assignable to type 'HTMLParagraphElement | null'."
	//
	// Any help is appreciated.
	// You need to typesafe your refs

	// Does anyone know why the first useEffect() gives me this error?
	// TypeError: Cannot read properties of undefined (reading 'focus')
	// You are trying to focus on something that is undefined. Going by memory here,
	// but I think I used a ref to set the focus on the first input.
	// For it to be undefined, you must have missed a step concerning the useRef hook and assigning the ref to the input.
	// ya I had just missed a ref it works now. Amazing tutorial btw. I definitely will be watching more of your content.
	// useEffect(() => {
	// 	console.log(firstNameFocus.current)
	// 	firstNameFocus.current.focus();
	// }, [])

	useEffect(() => {
		setValidFirstName(FIRSTNAME_REGEX.test(firstName));
	}, [firstName])

	useEffect(() => {
		setValidLastName(LASTNAME_REGEX.test(lastName));
	}, [lastName])

	useEffect(() => {
		setValidBirthDate(BIRTHDATE_REGEX.test(birthDate));
	}, [birthDate])

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email])

	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
		setValidMatchPassword(password === matchPassword);
	}, [password, matchPassword])

	useEffect(() => {
		setErrMsg('');
	}, [firstName, lastName, birthDate, email, password, matchPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(firstName)
		console.log(lastName)
		console.log(birthDate)
		console.log(email)
		console.log(password)
		console.log(matchPassword)

		// if button enabled with JS hack. Ochrana před hacknutím
		// todo: funguje, doplnit
		const v1 = FIRSTNAME_REGEX.test(firstName);
		const v2 = LASTNAME_REGEX.test(lastName);
		const v5 = PASSWORD_REGEX.test(password);
		if (!v1 || !v2 || !v5) {
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
			// TODO: remove console.logs before deployment
			console.log(JSON.stringify(response?.data));
			//console.log(JSON.stringify(response))
			setSuccess(true);
			console.log("povedlo")
			//clear state and controlled inputs
			setFirstName('');
			setLastName('');
			setBirthDate('');
			setEmail('');
			setPassword('');
			setMatchPassword('');
		} catch (err) {
			console.log(err.response)
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
			// todo: spravit, má se zaměřit na chybu pro přístupnost pro někoho kdo nevidí
			// errRef.current.focus();
		}
	}

	return (
		<>
		{success ? (
			// todo: rovnou přesměruje na rozcestník či admina. Nezmění adresu
			<section>
				<Signpost />
			</section>
		) : (
			<section>
				<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
				<form onSubmit={handleSubmit}>
					<h2>Registruj se</h2>
					<label htmlFor="firstName">
						FirstName:
						<FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
						<FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
					</label>
					<input
						type="text"
						placeholder="zadej jméno"
						id="firstName"
						ref={firstNameRef}
						autoComplete="off"
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
						required
						aria-invalid={validFirstName ? "false" : "true"}
						aria-describedby="uidnote"
						onFocus={() => setFirstNameFocus(true)}
						onBlur={() => setFirstNameFocus(false)}
					/>
					{/*todo: sladit zupozornění s regex, ideálně pokud se změní regex tak se autimaticky změní i hláška*/}
					<p id="uidnote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
						<FontAwesomeIcon icon={faInfoCircle} />
						4 to 24 characters.<br />
						Must begin with a letter.<br />
						Letters, numbers, underscores, hyphens allowed.
					</p><br/>
					<input type="text" placeholder="zadej příjmení" value={lastName} onChange={(e) => setLastName(e.target.value)}/><br/>
					<input type="date" placeholder="zadej datum narozeni" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/><br/>
					<input type="email" placeholder="zadej email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>

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
					{/*todo: přidat další inputy. Rozdíl mezi input a button?*/}
					<button disabled={!validFirstName || !validPassword || !validMatchPassword} value="Registrovat">Registrovat</button>
				</form>
			</section>

	)}
		</>
	);
};