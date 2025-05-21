import { createId } from '@paralleldrive/cuid2'
import { PlaylistSong } from './playlist-song'

interface Props {
  id?: string | null
  playlistSongs?: PlaylistSong[]
  name?: string | null
  description?: string | null
  pinned?: boolean | null
  imgUrl?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Playlist {
  private _id?: string | null
  private _name?: string | null
  private _imgUrl?: string | null
  private _pinned?: boolean | null
  private _playlistSongs?: PlaylistSong[]
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

  get playlistSongs() {
    return this._playlistSongs
  }

  set playlistSongs(value: PlaylistSong[] | undefined) {
    this._playlistSongs = value
  }

  get description() {
    return this._description
  }

  set description(value: string | undefined | null) {
    this._description = value
  }

  get pinned() {
    return this._pinned
  }

  set pinned(value: boolean | undefined | null) {
    this._pinned = value
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

    playlist.id = props.id ?? createId()
    playlist.name = props.name
    playlist.imgUrl = props.imgUrl
    playlist.pinned = props.pinned
    playlist.playlistSongs = props.playlistSongs
    playlist.description = props.description
    playlist.createdAt = props.createdAt
    playlist.updatedAt = props.updatedAt

    return playlist
  }
}
