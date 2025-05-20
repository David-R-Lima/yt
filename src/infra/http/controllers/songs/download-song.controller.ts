import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { DownloadSongUseCase } from 'src/domain/usecases/songs/download-song'
import { SongPresenter } from '../../presenters/song.presenter'

@Controller('/song/download')
export class DownloadSongController {
  constructor(private readonly downloadSongUseCase: DownloadSongUseCase) {}

  @Post()
  async handle(@Body() body: { url: string }) {
    const { url } = body

    const res = await this.downloadSongUseCase.execute({
      url,
    })

    if(res instanceof Error) {
      throw new BadRequestException(res.message)
    }

    return SongPresenter.toHttp(res)
  }
}
