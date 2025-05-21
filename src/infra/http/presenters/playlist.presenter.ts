import { Playlist } from 'src/domain/entities/playlist'
import { PlaylistSongPresenter } from './playlist-song.presenter'

export class PlaylistPresenter {
  static toHttp(playlist: Playlist) {
    return {
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      img_url: playlist.imgUrl,
      ...(playlist.playlistSongs && playlist.playlistSongs.length > 0 && {
        playlist_songs: playlist.playlistSongs.map(PlaylistSongPresenter.toHttp)
      }),
      created_at: playlist.createdAt,
      updated_at: playlist.updatedAt,
    }
  }
}
