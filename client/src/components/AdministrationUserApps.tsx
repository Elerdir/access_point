import "./AdministrationUserApps.css";
import {Header} from "./Header";
import AppContext from "../context/AppContext";
import React, {useContext} from "react";
import UserContext from "../context/UserContext";
import {User} from "../impl/User";

export const AdministrationUserApps: React.FC<User> = (user: User) => {
    const {appObject}: any = useContext(AppContext);
    const { userObject }: any = useContext(UserContext);

    console.log(appObject?.list)
    console.log(userObject?.userO?.user?.userToApps)

    return (
        <>
            <Header />
            <section id={"administration-user-apps"}>
                {/*todo: načíst aplikace upravovaného uživatele a ne admina*/}
                {/*{userObject?.userO?.user?.userToApps ?*/}
                {/*    userObject?.userO?.apps.filter(({ id }: {id: number}) => {*/}
                {/*        return id === userObject?.userO?.user?.userToApps.map(({appId}: {appId: number}) => appId)[0]*/}
                {/*    }).map(({ appName, url }: {appName: number, url: number}) => {*/}
                {/*        return <p><a href={`${url}`}>{appName}</a></p>*/}
                {/*    }) :*/}
                {/*    <p>Zatím nemáte žádné služby</p>*/}
                {/*}*/}
                <ul>
                    {appObject?.list.map(({id, appName, defaultApp, url}: {id: number, appName: string, defaultApp: boolean, url: string}) => {
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
