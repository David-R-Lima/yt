import { Controller, Get, Query } from '@nestjs/common'
import { YoutubeService } from 'src/domain/services/youtube-service'

@Controller('/youtube/songs')
export class FetchYoutubeSongsController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get()
  search(@Query('q') query: string) {
    return this.youtubeService.execute({
      query,
    })
  }
}
