import { User } from './User'

export class Client {
    clientID: number
    adminID: number
    company_name: string
    company_logo: string
    wifi_beacon: boolean
    user_reg: boolean
    tracking: boolean
    live_tracking: boolean
    fr_inter_video: boolean
    smileToVote: boolean
    admin: User

    constructor() {
        this.clientID = 0
        this.admin = new User();
    }
}