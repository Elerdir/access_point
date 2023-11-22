import "./AdministrationUserApps.css";
import {Header} from "./Header";
import AppContext from "../context/AppContext";
import {useContext} from "react";

export const AdministrationUserApps = () => {
    const {appObject} = useContext(AppContext);
    console.log(appObject)
    console.log(appObject?.apps)

    return (
        <>
            <Header />
            <section id={"administration-user-apps"}>
                <ul>
                    {/*{appObject.map((app) => {*/}
                    {/*    return app;*/}
                    {/*})}*/}
                </ul>
            </section>
        </>
    );
};