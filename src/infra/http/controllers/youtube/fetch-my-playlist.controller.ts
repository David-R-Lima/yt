import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import { Controller, Get, Inject, Query } from '@nestjs/common'
import { MyYoutubeService } from 'src/domain/services/my-playlist-service'

@Controller('/youtube/playlist')
export class FetchMyYoutubeSongsController {
  constructor(
    private readonly myYoutubeService: MyYoutubeService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  async search(@Query('page') page: string) {
    let key = 'my-playlist'

    if (page) {
      key = key + `-${page}`
    }

    const value = await this.cacheManager.get(key)

    if (value) {
      console.log('return cache')
      return value
    }

    const res = await this.myYoutubeService.execute({
      pageToken: page,
    })

    await this.cacheManager.set(key, res)

    return res
  }
}
