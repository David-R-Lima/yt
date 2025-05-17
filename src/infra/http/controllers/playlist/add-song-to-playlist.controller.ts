import { Body, Controller, Post } from '@nestjs/common'
import { AddSongToPlaylist } from 'src/domain/usecases/playlist/add-song-to-playlist'

@Controller('/playlist/add')
export class AddSongToPlaylistController {
  constructor(private readonly addSongToPlaylist: AddSongToPlaylist) {}

  @Post()
  async handle(@Body() body: { playlistId: string; songId: string }): Promise<void> {
    const { playlistId, songId } = body
    try {
      await this.addSongToPlaylist.execute({
        playlistId,
        songId,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
