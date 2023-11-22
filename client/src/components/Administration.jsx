import "./Administration.css";
import {Header} from "./Header";
import {useContext, useEffect, useState} from "react";
import axios, { getAllUsers} from "../api/Axios";
import AuthContext from "../context/AuthProvider";

export const Administration = () => {
	const {auth} = useContext(AuthContext);
	const [allUsers, setAllUsers] = useState([]);

	const fetchAllUsers = async () => {
		try {
			const response = await axios.post(
				"/user/all",
				{
					// headers: {'Accept': 'application/json', 'Authorization': `Basic ${auth.token}`},
					header: {'Accept': 'application/json', 'Authorization': 'SJKNFM?NK-DFGVV-FDFVD5-vdF52-dFDF'},
					// withCredentials: false,
					mode: 'no-cors',
					// Accept: 'application/json',
					// Authorization: 'SJKNFM?NK-DFGVV-FDFVD5-vdF52-dFDF'

				}
			);

			console.log(response?.data)
			setAllUsers(response?.data);
		} catch (err) {
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
				{allUsers.map(({ id, firstName, lastName, email }) => {
					return <p key={id}>{firstName + " " + lastName}</p>
				})}
			</section>
		</>
	);
};