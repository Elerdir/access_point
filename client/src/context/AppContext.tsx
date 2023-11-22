import {createContext, useState} from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }: any) => {
	const [appObject, setAppObject] = useState({});

	return (
		<AppContext.Provider value={{ appObject, setAppObject }}>
			{children}
		</AppContext.Provider>
	)
}

export default AppContext;