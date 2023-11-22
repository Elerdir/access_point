import "./Administration.css";
import {Header} from "./Header";
import {useContext, useEffect, useState} from "react";
import axios, { getAllUsers} from "../api/Axios";
import AuthContext from "../context/AuthProvider";
import AppContext from "../context/AppContext";

export const Administration = () => {
	const {auth} = useContext(AuthContext);
	const {setAppObject} = useContext(AppContext);
	const [allUsers, setAllUsers] = useState([]);

	const fetchAllUsers = async () => {
		try {
			const headers = {
				"Content-Type": "application/json",
				'Authorization': 'SJKNFM?NK-DFGVV-FDFVD5-vdF52-dFDF'
			};

			const response = await axios.post(
				"/user/all",
				{},
				{
					headers: headers,
					// withCredentials: false,
					mode: 'no-cors',

				}
			);

			const apps = response?.data?.apps;
			console.log('data ok: ', response?.data?.apps)
			setAllUsers(response?.data.users);
			setAppObject({apps});

            console.log(apps)
		} catch (err) {
			console.log('data err: ',err);
			console.log(err?.header)
			console.log(err?.response?.message)
		}
	}

		// getAllUsers()
		// 	.then(res => res.json())
		// 	.then(data => {
		// 		setAllUsers(data.allUsers);
		// 	})

	useEffect(() => {
		fetchAllUsers();
	}, []);

	return (
		<>
			<Header />
			<section id={"administration"}>
				<h2>Seznam uživatelů</h2>
				<ul>
					{allUsers.map(({ id, firstName, lastName, email }) => {
						return <li key={id}>{firstName + " " + lastName} {email} <a href={"/administration-user-apps"}>Seznam služeb</a></li>
					})}
				</ul>
			</section>
		</>
	);
};