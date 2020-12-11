import { Client } from './Client'

export class User {
    userID: number
    roleID: number
    first_name: string
    last_name: string
    photo: string
    email: string
    password: string
    phone: string
    exp: number
    iat: number
    client: Client

    constructor() {
        this.userID = 0
    }
}