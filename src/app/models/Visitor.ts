import { Client } from './Client'

export class Visitor {
    id: number
    groupID: number
    first_name: string
    last_name: string
    email: string
    password: string
    phone: string
    bday: string
    photo : File | string
}