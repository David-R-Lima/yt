import { Body, Controller, Post } from '@nestjs/common'
import { DownloadSongUseCase } from 'src/domain/usecases/songs/download-song'

@Controller('/download')
export class DownloadSongController {
  constructor(private readonly downloadSongUseCase: DownloadSongUseCase) {}

  @Post()
  async handle(@Body() body: { url: string }): Promise<void> {
    const { url } = body
    try {
      await this.downloadSongUseCase.execute({
        url,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
