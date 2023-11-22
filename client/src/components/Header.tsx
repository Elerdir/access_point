import "./Header.css";
import {useContext, useState} from "react";
import AuthContext from "../context/AuthProvider";
import UserContext from "../context/UserContext";

export const Header = () => {
	const { auth }: any = useContext(AuthContext);
	const { userObject }: any = useContext(UserContext);
	const [showProfile, setShowProfile] = useState(false);

	const firstName = userObject.userO?.firstName;
	const lastName = userObject.userO?.lastName;

	const handleOnClick = () => {
		setShowProfile(!showProfile);
	}

	return (
		<div id={"header"}>
			<div id={"header-name"} onClick={handleOnClick}>{firstName?.slice(0, 1) + lastName?.slice(0, 1)}</div>
			{showProfile &&
				<div id={"profile"}>
					{/*{firstName + " " + lastName} {auth.user}*/}
					Profil<br/>
					Změna hesla<br/>
					<a href={"/"}>Odhlášení</a>
				</div>}
		</div>
	);
};