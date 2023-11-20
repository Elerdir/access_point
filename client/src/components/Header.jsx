import "./Header.css";
import {useContext, useState} from "react";
import AuthContext from "../context/AuthProvider";

export const Header = (userObject) => {
	const { auth } = useContext(AuthContext);
	const [showProfile, setShowProfile] = useState(false);
	const firstName = userObject.userObject.firstName;
	const lastName = userObject.userObject.lastName;

	const handleOnClick = () => {
		setShowProfile(!showProfile);
	}

	return (
		<div id={"header"}>
			<div id={"header-name"} onClick={handleOnClick}>{firstName.slice(0, 1) + lastName.slice(0, 1)}</div>
			{showProfile &&
				<div id={"profile"}>
					{/*{firstName + " " + lastName} {auth.user} */}
					Profil<br/>
					Změna hesla<br/>
					<a href={"/"}>Odhlášení</a>
				</div>}
		</div>
	);
};