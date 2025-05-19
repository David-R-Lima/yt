import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common'
import { PlaylistPresenter } from '../../presenters/playlist.presenter'
import { FetchPlaylist } from 'src/domain/usecases/playlist/fetch-playlist'

@Controller('/playlist/:id')
export class FetchPlaylistController {
  constructor(private readonly fetchPlaylist: FetchPlaylist) {}

  @Get()
  async handle(@Param() param: { id: string }) {
    const { id } = param

    const data = await this.fetchPlaylist.execute({
        id
    })

    if (!data) {
      return new NotFoundException()
    }

    return PlaylistPresenter.toHttp(data)
  }
}
