import { Song } from "./songs";

interface Props {
    id: string;
    songs: Song[];
    name?: string;
    imgUrl?: string;
}

export class Playlist {
    private _id: string;
    private _name?: string;
    private _imgUrl?: string;
    private _songs: Song[];

    constructor() {}

    get id() {
        return this._id;
    }

    set id(value: string) {
        this._id = value
    }

    get name() {
        return this._name;
    }
    set name(value: string | undefined) {
        this._name = value
    }

    get imgUrl() {
        return this._imgUrl;
    }

    set imgUrl(value: string | undefined) {
        this._imgUrl = value
    }

    get songs() {
        return this._songs;
    }

    set songs(value: Song[]) {
        this._songs = value
    }

    create(props: Props): Playlist {
        const playlist = new Playlist();

        playlist.id = props.id;
        playlist.name = props.name;
        playlist.imgUrl = props.imgUrl;
        playlist.songs = props.songs;

        return playlist;
    }
}
