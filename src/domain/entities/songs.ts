interface Props {
    id?: string
    name?: string
    youtubeUrl?: string
    localUrl?: string
}

export class Song {
    private _id?: string
    private _name?: string
    private _youtubeUrl?: string
    private _localUrl?: string

    constructor() {}

    get id(): string | undefined {
        return this._id;
    }

    set id(value: string | undefined) {
        this._id = value;
    }

    get name(): string | undefined {
        return this._name;
    }

    set name(value: string | undefined) {
        this._name = value;
    }

    get youtubeUrl(): string | undefined {
        return this._youtubeUrl;
    }

    set youtubeUrl(value: string | undefined) {
        this._youtubeUrl = value;
    }

    get localUrl(): string | undefined {
        return this._localUrl;
    }

    set localUrl(value: string | undefined) {
        this._localUrl = value;
    }

    create(props: Props): Song {
        const songs = new Song();

        songs.id = props.id;
        songs.name = props.name ?? undefined;
        songs.youtubeUrl = props.youtubeUrl ?? undefined;
        songs.localUrl = props.localUrl ?? undefined;
        
        return songs;
    }
}