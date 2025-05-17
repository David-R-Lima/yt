interface Props {
  id?: string | null
  title?: string | null
  artist?: string | null
  duration?: number | null
  imgUrl?: string | null
  youtubeUrl?: string | null
  localUrl?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Song {
  private _id?: string | null
  private _title?: string | null
  private _artist?: string | null
  private _duration?: number | null
  private _imgUrl?: string | null
  private _youtubeUrl?: string | null
  private _localUrl?: string | null
  private _createdAt?: Date | null
  private _updatedAt?: Date | null

  constructor() {}

  get id(): string | undefined | null {
    return this._id
  }

  set id(value: string | undefined | null) {
    this._id = value
  }

  get title(): string | undefined | null {
    return this._title
  }

  set title(value: string | undefined | null) {
    this._title = value
  }

  get artist(): string | undefined | null {
    return this._artist
  }

  set artist(value: string | undefined | null) {
    this._artist = value
  }

  get duration(): number | undefined | null {
    return this._duration
  }

  set duration(value: number | undefined | null) {
    this._duration = value
  }

  get imgUrl(): string | undefined | null {
    return this._imgUrl
  }

  set imgUrl(value: string | undefined | null) {
    this._imgUrl = value
  }

  get youtubeUrl(): string | undefined | null {
    return this._youtubeUrl
  }

  set youtubeUrl(value: string | undefined | null) {
    this._youtubeUrl = value
  }

  get localUrl(): string | undefined | null {
    return this._localUrl
  }

  set localUrl(value: string | undefined | null) {
    this._localUrl = value
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

  create(props: Props): Song {
    const songs = new Song()

    songs.id = props.id
    songs.title = props.title ?? undefined
    songs.artist = props.artist ?? undefined
    songs.duration = props.duration ?? undefined
    songs.youtubeUrl = props.youtubeUrl ?? undefined
    songs.localUrl = props.localUrl ?? undefined
    songs.imgUrl = props.imgUrl ?? undefined
    songs.createdAt = props.createdAt ? new Date(props.createdAt) : undefined
    songs.updatedAt = props.updatedAt ? new Date(props.updatedAt) : undefined

    return songs
  }
}
