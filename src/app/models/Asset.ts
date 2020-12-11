import { UploadFile } from 'ngx-uploader';

export class Asset {
    assetID: number
    campaignID: number
    seq: number
    title: string
    desc: string
    wallpaper: string
    wallpaper_file: File | null
    video_file: UploadFile | null
    video: string
    distance_min: number
    distance_max: number
    body_gestures: string
    facial_gestures: string
    gender: string
    updated_at: string

    constructor(seq, assetID = 0) {
        this.assetID = assetID
        this.seq = seq;
        this.title = "Asset "+ seq;
        this.desc = "";
        this.wallpaper = "";
        this.wallpaper_file = null;
        this.video = "";
        this.video_file = null;
        this.distance_min = 0;
        this.distance_max = 0;
        this.body_gestures = "";
        this.facial_gestures = "";
        this.gender = "";
    }
}