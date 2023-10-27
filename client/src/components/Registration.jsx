import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Signpost} from "./Signpost";

// todo: upravit?
const FIRSTNAME_REGEX = /^[A-Z][a-z]{3,23}$/;
const LASTNAME_REGEX = /^[A-Z][a-z]{3,23}$/;
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
	// const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatchPassword, setValidMatchPassword] = useState(false);
	// const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	// useEffect(() => {
	// 	console.log(firstNameFocus.current)
	// 	firstNameFocus.current.focus();
	// }, [])

	useEffect(() => {
		setValidFirstName(FIRSTNAME_REGEX.test(firstName));
	}, [firstName])

	// useEffect(() => {
	// 	setValidLastName(LASTNAME_REGEX.test(lastName));
	// }, [lastName])

	// useEffect(() => {
	// 	setValidBirthDate(BIRTHDATE_REGEX.test(birthDate));
	// }, [birthDate])
	//
	// useEffect(() => {
	// 	setValidEmail(EMAIL_REGEX.test(email));
	// }, [email])

	// useEffect(() => {
	// 	setValidPassword(PASSWORD_REGEX.test(password));
	// 	setValidMatchPassword(password === matchPassword);
	// }, [password, matchPassword])

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

		// if button enabled with JS hack
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
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 409) {
				setErrMsg('Username Taken');
			} else {
				setErrMsg('Registration Failed')
			}
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
				<form action="" onSubmit={handleSubmit}>
					<h2>Registruj se</h2>
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
					<p id="uidnote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
						{/*<FontAwesomeIcon icon={faInfoCircle} />*/}
						4 to 24 characters.<br />
						Must begin with a letter.<br />
						Letters, numbers, underscores, hyphens allowed.
					</p><br/>
					<input type="text" placeholder="zadej příjmení" value={lastName} onChange={(e) => setLastName(e.target.value)}/><br/>
					<input type="date" placeholder="zadej datum narozeni" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/><br/>
					<input type="email" placeholder="zadej email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
					<input type="password" placeholder="zadej heslo" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
					<input type="password" placeholder="zadej heslo znovu" value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)}/><br/>
					<input type="submit" value="Registrovat"/><br/>
				</form>
			</section>

	)}
		</>
	);
};