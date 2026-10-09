import { Controller, Get, Param, Query } from '@nestjs/common'
import { SongPresenter } from '../../presenters/song.presenter';
import { GetRandomSongUseCase } from 'src/domain/usecases/songs/get-random-song';

@Controller('/songs/random')
export class GetRandomSongController {
  constructor(private readonly getRandomSong: GetRandomSongUseCase) {}

  @Get()
  async handle(@Query() req: {
    from: string
  }) {

    const { from } = req
    try {
      const song = await this.getRandomSong.execute({
        from
      })

      if(song) {
          return {
            song: SongPresenter.toHttp(song)
          }
      }

    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
