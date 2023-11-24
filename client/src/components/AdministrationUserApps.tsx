import "./AdministrationUserApps.css";
import {Header} from "./Header";
import AppContext from "../context/AppContext";
import {useContext} from "react";
import UserContext from "../context/UserContext";

export const AdministrationUserApps = () => {
    const {appObject}: any = useContext(AppContext);
    const { userObject }: any = useContext(UserContext);

    console.log(userObject?.list)

    return (
        <>
            <Header />
            <section id={"administration-user-apps"}>
                <ul>
                    {userObject?.list.map(({id, appName, defaultApp, url}: {id: number, appName: string, defaultApp: boolean, url: string}) => {
                        return <li key={id}>{appName} {defaultApp} {url}</li>
                    })}
                </ul>
                <form>
                    <input type="text" placeholder={"název aplikace"}/>
                    <input type="checkbox" name={"default"}/>Výchozí
                    <input type="text" placeholder={"url"}/>
                </form>
            </section>
        </>
    );
};