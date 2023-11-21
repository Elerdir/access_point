import {createContext, useState} from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
	const [userObject, setUserObject] = useState({});

	return (
		<UserContext.Provider value={{ userObject, setUserObject }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext;