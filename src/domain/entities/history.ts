import { Song } from "./songs"



interface Props {
    id: string
    songId: string
    createdAt?: Date | null
    updatedAt?: Date | null

    song?: Song
}

export class History {
    private _id: string
    private _songId: string
    private _createdAt?: Date | null
    private _updatedAt?: Date | null
    private _song?: Song

    constructor() {}

    get id(): string {
        return this._id
    }

    set id(value: string) {
        this._id = value
    }

    get songId(): string {
        return this._songId
    }

    set songId(value: string) {
        this._songId = value
    }

    get createdAt(): Date | undefined | null {
        return this._createdAt
    }

    set createdAt(value: Date | undefined | null) {
        this._createdAt = value
    }

    get updatedAt(): Date | undefined | null {
        return this._updatedAt
    }

    set updatedAt(value: Date | undefined | null) {
        this._updatedAt = value
    }

    get song(): Song | undefined {
        return this._song
    }

    set song(value: Song | undefined) {
        this._song = value
    }

    create(props: Partial<Props>): History {
        const history = new History()

        history.id = props.id ?? ""
        history.songId = props.songId ?? ""
        history.createdAt = props.createdAt ? new Date(props.createdAt) : undefined
        history.updatedAt = props.updatedAt ? new Date(props.updatedAt) : undefined

        history.song = props.song

        return history
    }
}