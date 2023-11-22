import {createContext, useState} from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
	const [appObject, setAppObject] = useState({});
	console.log(appObject)

	return (
		<AppContext.Provider value={{ appObject, setAppObject }}>
			{children}
		</AppContext.Provider>
	)
}

export default AppContext;