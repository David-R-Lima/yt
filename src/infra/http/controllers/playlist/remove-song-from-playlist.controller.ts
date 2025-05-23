import { Body, Controller, Delete } from '@nestjs/common'
import { RemoveSongFromPlaylist } from 'src/domain/usecases/playlist/remove-song-from-playlist';

@Controller('/playlist/remove')
export class RemoveSongToPlaylistController {
  constructor(private readonly removeSongFromPlaylist: RemoveSongFromPlaylist) {}

  @Delete()
  async handle(@Body() body: { playlistId: string; songId: string }): Promise<void> {
    const { playlistId, songId } = body
    try {
      await this.removeSongFromPlaylist.execute({
        playlistId,
        songId,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
