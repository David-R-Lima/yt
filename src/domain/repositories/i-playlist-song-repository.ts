import { Injectable } from '@nestjs/common'
import { PlaylistSong } from '../entities/playlist-song'

@Injectable()
export abstract class IPlaylistSongRepository {
  abstract create(playlistSong: PlaylistSong): Promise<PlaylistSong>
  abstract delete(playlistId: string, songId: string): Promise<void>
  abstract deleteManyBySong(songId: string): Promise<void>
  abstract deleteManyByPlaylist(playlistId: string): Promise<void>
}
