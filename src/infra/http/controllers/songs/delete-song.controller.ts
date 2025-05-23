import { Body, Controller, Delete } from '@nestjs/common'
import { HardDelete } from 'src/core/hardDelete';
import { DeleteSong } from 'src/domain/usecases/songs/delete-song'

@Controller('/song')
export class DeleteSongController {
  constructor(private readonly deleteSong: DeleteSong) {}

  @Delete()
  async handle(@Body() body: { song_id: string; hard_delete?: HardDelete }): Promise<void> {
    const { song_id, hard_delete } = body
    try {
      await this.deleteSong.execute({
        songId: song_id,
        hardDelete: hard_delete === HardDelete.TRUE ? true : false,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
