interface Props {
    id?: string
    title?: string
    artist?: string
    duration?: number
    imgUrl?: string
    youtubeUrl?: string
    localUrl?: string
    createdAt?: Date
    updatedAt?: Date
}

export class Song {
    private _id?: string
    private _title?: string
    private _artist?: string
    private _duration?: number
    private _imgUrl?: string
    private _youtubeUrl?: string
    private _localUrl?: string
    private _createdAt?: Date
    private _updatedAt?: Date


    constructor() {}

    get id(): string | undefined {
        return this._id;
    }

    set id(value: string | undefined) {
        this._id = value;
    }

    get title(): string | undefined {
        return this._title;
    }

    set title(value: string | undefined) {
        this._title = value;
    }

    get artist(): string | undefined {
        return this._artist;
    }

    set artist(value: string | undefined) {
        this._artist = value;
    }

    get duration(): number | undefined {
        return this._duration;
    }

    set duration(value: number | undefined) {
        this._duration = value;
    }   

    get imgUrl(): string | undefined {
        return this._imgUrl;
    }

    set imgUrl(value: string | undefined) {
        this._imgUrl = value;
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

    get createdAt(): Date | undefined {
        return this._createdAt;
    }

    set createdAt(value: Date | undefined) {
        this._createdAt = value;
    }

    get updatedAt(): Date | undefined {
        return this._updatedAt;
    }

    set updatedAt(value: Date | undefined) {
        this._updatedAt = value;
    }



    create(props: Props): Song {
        const songs = new Song();

        songs.id = props.id;
        songs.title = props.title ?? undefined;
        songs.artist = props.artist ?? undefined;
        songs.duration = props.duration ?? undefined;
        songs.youtubeUrl = props.youtubeUrl ?? undefined;
        songs.localUrl = props.localUrl ?? undefined;
        songs.imgUrl = props.imgUrl ?? undefined;
        songs.createdAt = props.createdAt ? new Date(props.createdAt) : undefined;
        songs.updatedAt = props.updatedAt ? new Date(props.updatedAt): undefined;

        
        return songs;
    }
}