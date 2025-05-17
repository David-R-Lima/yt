import { Controller, Get, NotFoundException, Query } from '@nestjs/common'
import { Playlist } from 'src/domain/entities/playlist'
import { FetchPlaylists } from 'src/domain/usecases/playlist/fetch-playlists'
import { PlaylistPresenter } from '../../presenters/playlist.presenter'

@Controller('/playlist')
export class FetchPlaylistsController {
  constructor(private readonly fetchPlaylists: FetchPlaylists) {}

  @Get()
  async handle(@Query() query: { page?: number; limit?: number }) {
    const { page, limit } = query

    const data = await this.fetchPlaylists.execute({
      pagination: {
        limit,
        page,
      },
    })

    if (!data) {
      return new NotFoundException()
    }

    return data.map(PlaylistPresenter.toHttp)
  }
}
