import {useEffect, useState} from "react";
import {getAllApps} from "../api/Axios";
import {Header} from "./Header";
import "./Signpost.css";

export const Signpost = () => {
	const [allApps, setAllApps] = useState<[]>([]);

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
			<Header />
			<section id={"signpost"}>
				<h2>Vyber si službu</h2>
				{allApps.map(({ id, appName, url }: {id: number, appName: string, url: string}) => {
					return <p key={id}><a href={url}>{appName}</a> </p>
				})}
			</section>
		</>

	);
};