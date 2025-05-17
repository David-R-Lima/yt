import { PlaylistSong } from 'src/domain/entities/playlist-song'
import { SongPresenter } from './song.presenter'
import { PlaylistPresenter } from './playlist.presenter'

export class PlaylistSongPresenter {
  static toHttp(playlistSong: PlaylistSong) {
    return {
      song_id: playlistSong.songId,
      playlist_id: playlistSong.playlistId,
      song: playlistSong.song ? SongPresenter.toHttp(playlistSong.song) : undefined,
      playlist: playlistSong.playlist ? PlaylistPresenter.toHttp(playlistSong.playlist) : undefined,
    }
  }
}
