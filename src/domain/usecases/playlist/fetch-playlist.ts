import { Injectable } from '@nestjs/common'
import { IPagination, IPaginationResponse } from 'src/core/pagination'
import { Playlist } from 'src/domain/entities/playlist'
import { PlaylistSong } from 'src/domain/entities/playlist-song'
import { IPlaylistRepository } from 'src/domain/repositories/i-playlist-repository'
import { GetAllSongsFilters } from 'src/domain/repositories/i-song-repository'

interface request {
  id: string
  pagination: IPagination,
  filters?: GetAllSongsFilters
}

@Injectable()
export class FetchPlaylist {
  constructor(private readonly iPlaylistRespository: IPlaylistRepository) {}

  async execute(req: request): Promise<{
    playlist: Playlist,
    songs: {
      playlistSongs: PlaylistSong[],
      paginationResponse: IPaginationResponse
    }
  }> {
    const res = await this.iPlaylistRespository.getByIdWithSongs(req.id, req.pagination, req.filters)

    return {
      playlist: res.playlist,
      songs: {
        playlistSongs: res.songs.playlistSongs,
        paginationResponse: res.songs.paginationsReponse
      }
    }
  }
}
