import "./Header.css";
import {useContext, useState} from "react";
import AuthContext from "../context/AuthProvider";

export const Header = (userObject) => {
	const { auth } = useContext(AuthContext);
	const [showProfile, setShowProfile] = useState(false);

	const handleOnClick = () => {
		setShowProfile(!showProfile);
	}

	return (
		<div id={"header"}>
			<div onClick={handleOnClick}>{userObject.userObject.firstName + " " + userObject.userObject.lastName}</div>
			{showProfile && <div id={"profile"}>{auth.user} <a href={"/"}> Odhlášení </a> Profil Změna hesla</div>}
		</div>
	);
};