import { Controller, Get, Param } from '@nestjs/common'
import { SongPresenter } from '../../presenters/song.presenter';
import { GetSongByIdUseCase } from 'src/domain/usecases/songs/get-song-by-id';

@Controller('/song/:id')
export class GetSongByIdController {
  constructor(private readonly getSong: GetSongByIdUseCase) {}

  @Get()
  async handle(@Param() param: {id: string}) {
    const { id } = param
    try {
      const song = await this.getSong.execute({
        id,
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
