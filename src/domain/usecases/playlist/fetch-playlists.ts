import { Injectable } from '@nestjs/common'
import { IPagination } from 'src/core/pagination'
import { Playlist } from 'src/domain/entities/playlist'
import { IPlaylistRepository } from 'src/domain/repositories/i-playlist-repository'

interface request {
  pagination: IPagination
}

@Injectable()
export class FetchPlaylists {
  constructor(private readonly iPlaylistRespository: IPlaylistRepository) {}

  async execute(req: request): Promise<Playlist[]> {
    const res = await this.iPlaylistRespository.getAll(req.pagination)

    return res
  }
}
