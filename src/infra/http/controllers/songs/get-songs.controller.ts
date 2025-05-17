import { Controller, Get, NotFoundException, Query } from '@nestjs/common'
import { Song } from 'src/domain/entities/songs'

import { GetSongsUseCase } from 'src/domain/usecases/songs/get-songs'
import { SongPresenter } from '../../presenters/song.presenter'

@Controller('/song')
export class GetSongsController {
  constructor(private readonly getSongUseCase: GetSongsUseCase) {}

  @Get()
  async execute(@Query() query: { page?: number; limit?: number }) {
    const { page, limit } = query

    const songs = await this.getSongUseCase.execute({
      page,
      limit,
    })

    if (!songs) {
      return new NotFoundException()
    }

    return songs.map(SongPresenter.toHttp)
  }
}
