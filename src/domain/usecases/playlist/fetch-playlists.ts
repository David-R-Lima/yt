import { Injectable } from '@nestjs/common'
import { IPagination, IPaginationResponse } from 'src/core/pagination'
import { Playlist } from 'src/domain/entities/playlist'
import { GetAllPlaylistsFilters, IPlaylistRepository } from 'src/domain/repositories/i-playlist-repository'

interface request {
  pagination: IPagination
  filters?: GetAllPlaylistsFilters
}

@Injectable()
export class FetchPlaylists {
  constructor(private readonly iPlaylistRespository: IPlaylistRepository) {}

  async execute(req: request): Promise<{
    playlists: Playlist[],
    paginationsReponse: IPaginationResponse
  }> {
    const res = await this.iPlaylistRespository.getAll(req.pagination, req.filters)

    return res
  }
}
