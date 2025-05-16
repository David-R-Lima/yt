import { Song } from "./songs";

interface Props {
    id: string;
    songs: Song[];
    name?: string;
    description?: string;
    imgUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Playlist {
    private _id: string;
    private _name?: string;
    private _imgUrl?: string;
    private _songs: Song[];
    private _description?: string;
    private _createdAt?: Date;
    private _updatedAt?: Date;

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

    get description() {
        return this._description;
    }

    set description(value: string | undefined) {
        this._description = value
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(value: Date | undefined) {
        this._createdAt = value
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(value: Date | undefined) {
        this._updatedAt = value
    }

    create(props: Props): Playlist {
        const playlist = new Playlist();

        playlist.id = props.id;
        playlist.name = props.name;
        playlist.imgUrl = props.imgUrl;
        playlist.songs = props.songs;
        playlist.description = props.description;
        playlist.createdAt = props.createdAt;
        playlist.updatedAt = props.updatedAt;

        return playlist;
    }
}
