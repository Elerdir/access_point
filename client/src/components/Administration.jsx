import "./Administration.css";
import {Header} from "./Header";
import {useEffect, useState} from "react";
// import { getAllUsers} from "../api/Axios";

export const Administration = (userObject) => {
	const [allUsers, setAllUsers] = useState([]);

	// const fetchAllUsers = () =>
	// 	getAllUsers()
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			setAllUsers(data.allUsers);
	// 		})
	//
	// useEffect(() => {
	// 	fetchAllUsers();
	// }, []);

	return (
		<>
			<Header userObject={userObject.userObject}/>
			<section id={"administration"}>
				<h2>Seznam uživatelů</h2>
				{/*{allUsers.map(({ id, firstName, lastName, email }) => {*/}
				{/*	return <p key={id}><a href={}>{}</a> </p>*/}
				{/*})}*/}
			</section>
		</>
	);
};