import { Controller, Get } from '@nestjs/common'
import { GetRecommended } from 'src/domain/usecases/history/get-recommended'
import { SongPresenter } from '../../presenters/song.presenter'

@Controller('/songs/recommended')
export class GetRecommendedSongsController {
  constructor(private readonly getRecommended: GetRecommended) {}

  @Get()
  async handle() {
    const data = await this.getRecommended.execute()

    return data.map(SongPresenter.toHttp)
  }
}
