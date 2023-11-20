import {useEffect, useState} from "react";
import {getAllApps} from "../api/Axios";
import {Header} from "./Header";

export const Signpost = (userObject) => {
	const [allApps, setAllApps] = useState([]);

	const fetchAllApps = () =>
		getAllApps()
			.then(res => res.json())
			.then(data => {
				setAllApps(data.allApps);
			})

	useEffect(() => {
		fetchAllApps();
	}, []);

	return (
		<>
			<Header userObject={userObject.userObject}/>
			<section>
				<h2>Vyber si službu</h2>
				{allApps.map(({ id, appName, url }) => {
					return <p key={id}><a href={url}>{appName}</a> </p>
				})}
			</section>
		</>

	);
};