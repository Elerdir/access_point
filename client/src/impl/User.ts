import {UserToApp} from "./UserToApp";

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthday: Date,
    administration: boolean,
    token: string,
    needChangePassword: boolean,
    userToApps: UserToApp[]
}
