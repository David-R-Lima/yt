import { Playlist } from './playlist'
import { Song } from './songs'

interface Props {
  playlistId: string
  songId: string
  song?: Song
  playlist?: Playlist
}

export class PlaylistSong {
  private _playlistId: string
  private _songId: string
  private _song?: Song
  private _playlist?: Playlist

  constructor() {}

  get playlistId(): string {
    return this._playlistId
  }

  set playlistId(value: string) {
    this._playlistId = value
  }

  get songId(): string {
    return this._songId
  }

  set songId(value: string) {
    this._songId = value
  }

  get song() {
    return this._song
  }

  set song(value: Song | undefined) {
    this._song = value
  }

  get playlist() {
    return this._playlist
  }

  set playlist(value: Playlist | undefined) {
    this._playlist = value
  }

  create(props: Props): PlaylistSong {
    const playlistSongs = new PlaylistSong()

    playlistSongs.playlistId = props.playlistId ?? undefined
    playlistSongs.songId = props.songId ?? undefined
    playlistSongs.song = props.song
    playlistSongs.playlist = props.playlist

    return playlistSongs
  }
}
