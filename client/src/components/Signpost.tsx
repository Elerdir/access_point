import {useContext} from "react";
import {Header} from "./Header";
import "./Signpost.css";
import UserContext from "../context/UserContext";

export const Signpost = () => {
	const { userObject }: any = useContext(UserContext);

	return (
		<>
			<Header />
			<section id={"signpost"}>
				<h2>Vyber si službu</h2>
				{userObject?.userToApps ?
					userObject.userToApps.map(({ id, appName, url }: {id: number, appName: string, url: string}) => {
					return <p key={id}><a href={url}>{appName}</a> </p>
				}) :
					<p>Zatím nemáte žádné služby</p>
				}
			</section>
		</>
	);
};