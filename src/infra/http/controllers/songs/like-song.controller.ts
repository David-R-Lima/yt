import { Body, Controller, NotFoundException, Post } from '@nestjs/common'
import { SongPresenter } from '../../presenters/song.presenter'
import { LikeSongUseCase } from 'src/domain/usecases/songs/add-song-to-liked'

@Controller('/song/like')
export class LikeSongController {
  constructor(private readonly likeSongUseCase: LikeSongUseCase) {}

  @Post()
  async handle(@Body() body: { song_id: string }) {
    const { song_id } = body

    const res = await this.likeSongUseCase.execute({
      songId: song_id,
    })

    if(!res) {
      throw new NotFoundException("song not found")
    }

    return SongPresenter.toHttp(res)
  }
}
