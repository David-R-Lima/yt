import { createId } from '@paralleldrive/cuid2'
import { Song } from './songs'
interface Props {
  id: string
  accessToken?: string
  refreshToken?: string
  expiryDate?: Date
}

export class Youtube {
  private _id: string
  private _accessToken?: string
  private _refreshToken?: string | null
  private _expiryDate?: Date | null

  constructor() {}

  get id(): string {
    return this._id
  }

  set id(value: string) {
    this._id = value
  }

  get accessToken(): string | undefined {
    return this._accessToken
  }

  set accessToken(value: string | undefined) {
    this._accessToken = value
  }

  get refreshToken(): string | undefined | null {
    return this._refreshToken
  }

  set refreshToken(value: string | undefined | null) {
    this._refreshToken = value
  }

  get expiryDate(): Date | undefined | null {
    return this._expiryDate
  }

  set expiryDate(value: Date | undefined | null) {
    this._expiryDate = value
  }

  create(props: Partial<Props>): Youtube {
    const youtube = new Youtube()

    youtube.id = props.id ?? createId()
    youtube.accessToken = props.accessToken ?? ''
    youtube.refreshToken = props.refreshToken ?? ''
    youtube.expiryDate = props.expiryDate

    return youtube
  }
}
