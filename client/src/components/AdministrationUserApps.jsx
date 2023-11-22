import "./AdministrationUserApps.css";
import {Header} from "./Header";
import AppContext from "../context/AppContext";
import {useContext} from "react";

export const AdministrationUserApps = () => {
    const {appObject} = useContext(AppContext);
    console.log(appObject?.list)

    return (
        <>
            <Header />
            <section id={"administration-user-apps"}>
                <ul>
                    {appObject?.list.map(({id, appName, defaultApp, url}) => {
                        return <li key={id}>{appName} {defaultApp} {url}</li>
                    })}
                </ul>
            </section>
        </>
    );
};