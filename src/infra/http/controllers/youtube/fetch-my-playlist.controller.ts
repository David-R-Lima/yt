import { Controller, Get, Query } from '@nestjs/common'
import { MyYoutubeService } from 'src/domain/services/my-playlist-service'

@Controller('/youtube/playlist')
export class FetchMyYoutubeSongsController {
  constructor(private readonly myYoutubeService: MyYoutubeService) {}

  @Get()
  search(@Query('q') query: string) {
    return this.myYoutubeService.execute({
      query,
    })
  }
}
