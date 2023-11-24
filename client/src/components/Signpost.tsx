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
				{userObject?.userO?.user?.userToApps ?
					userObject?.userO?.apps.filter(({ id }: {id: number}) => {
						console.log(userObject?.userO?.user?.userToApps.map(({appId}: {appId: number}) => appId))
						return id === userObject?.userO?.user?.userToApps.map(({appId}: {appId: number}) => appId)[0]
					}).map(({ appName, url }: {appName: number, url: number}) => {
						return <p><a href={`${url}`}>{appName}</a></p>
				}) :
					<p>Zatím nemáte žádné služby</p>
				}
			</section>
		</>
	);
};