import { Song } from './songs'

interface Props {
  id?: string | null
  songs?: Song[]
  name?: string | null
  description?: string | null
  imgUrl?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Playlist {
  private _id?: string | null
  private _name?: string | null
  private _imgUrl?: string | null
  private _songs?: Song[]
  private _description?: string | null
  private _createdAt?: Date | null
  private _updatedAt?: Date | null

  constructor() {}

  get id() {
    return this._id
  }

  set id(value: string | undefined | null) {
    this._id = value
  }

  get name() {
    return this._name
  }
  set name(value: string | undefined | null) {
    this._name = value
  }

  get imgUrl() {
    return this._imgUrl
  }

  set imgUrl(value: string | undefined | null) {
    this._imgUrl = value
  }

  get songs() {
    return this._songs
  }

  set songs(value: Song[] | undefined) {
    this._songs = value
  }

  get description() {
    return this._description
  }

  set description(value: string | undefined | null) {
    this._description = value
  }

  get createdAt() {
    return this._createdAt
  }

  set createdAt(value: Date | undefined | null) {
    this._createdAt = value
  }

  get updatedAt() {
    return this._updatedAt
  }

  set updatedAt(value: Date | undefined | null) {
    this._updatedAt = value
  }

  create(props: Props): Playlist {
    const playlist = new Playlist()

    playlist.id = props.id
    playlist.name = props.name
    playlist.imgUrl = props.imgUrl
    playlist.songs = props.songs
    playlist.description = props.description
    playlist.createdAt = props.createdAt
    playlist.updatedAt = props.updatedAt

    return playlist
  }
}
