import { Body, Controller, Delete } from '@nestjs/common'
import { DeleteSong } from 'src/domain/usecases/songs/delete-song'

@Controller('/download')
export class DeleteSongController {
  constructor(private readonly deleteSong: DeleteSong) {}

  @Delete()
  async handle(@Body() body: { songId: string; hardDelete?: boolean }): Promise<void> {
    const { songId, hardDelete } = body
    try {
      await this.deleteSong.execute({
        songId,
        hardDelete,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
