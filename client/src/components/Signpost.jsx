import {useEffect, useState} from "react";
import {getAllApps} from "../api/Axios";

export const Signpost = () => {
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
		<section>
			<h2>Vyber si službu</h2>
			{allApps.map(({ appName, url }) => {
				return <p><a href={url}>{appName}</a> </p>
			})}
		</section>
	);
};