import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { IYoutubeRepository } from '../repositories/i-youtube-repository'
import { Youtube } from '../entities/youtube'
import { SongService } from './song-service'

interface Request {
  pageToken?: string
}

export interface YouTubeLikedPlaylistResponse {
  kind: string
  etag: string
  nextPageToken?: string
  prevPageToken?: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: YouTubeLikedPlayistItem[]
}

export interface YouTubeLikedPlayistItem {
  kind: string
  etag: string
  id: string
  downloaded: boolean
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      default?: YouTubeThumbnail
      medium?: YouTubeThumbnail
      high?: YouTubeThumbnail
    }
    channelTitle: string
    liveBroadcastContent: 'none' | 'live' | 'upcoming'
    publishTime: string
    playlistId: string
    position: number
    resourceId: {
      kind: string
      videoId: string
    }
  }
}

export interface YouTubeThumbnail {
  url: string
  width: number
  height: number
}

@Injectable()
export class MyYoutubeService {
  constructor(
    private readonly youtubeRepository: IYoutubeRepository,
    private readonly songService: SongService
  ) {}

  async execute({ pageToken }: Request): Promise<YouTubeLikedPlaylistResponse> {
    const res = await this.ensureValidToken()
    if (!res) throw new InternalServerErrorException(`no youtube entity`)

    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('maxResults', '50')
    url.searchParams.set('playlistId', 'LL')

    if (pageToken) {
      url.searchParams.set('pageToken', pageToken)
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${res.accessToken}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new InternalServerErrorException(`YouTube API error: ${response.status} ${errorText}`)
    }

    const data: YouTubeLikedPlaylistResponse = await response.json()

    let filteredItems: YouTubeLikedPlayistItem[] = []

    data.items.filter((item) => {
      const downloaded = this.songService.isDownloaded(item.snippet.title)

      if (downloaded) {
        item.downloaded = true
      } else {
        item.downloaded = false
        filteredItems.push(item)
      }

      return !item.downloaded
    })

    return {
      ...data,
      items: filteredItems,
      pageInfo: {
        ...data.pageInfo,
        totalResults: filteredItems.length,
        resultsPerPage: filteredItems.length,
      },
    }
  }

  private async ensureValidToken(): Promise<Youtube> {
    const youtube = await this.youtubeRepository.get()

    if (!youtube || !youtube.refreshToken) {
      throw new InternalServerErrorException('YouTube token not found')
    }

    if (!youtube.accessToken || this.isTokenExpired(youtube.expiryDate)) {
      return await this.fetchNewAccessToken(youtube)
    }

    return youtube
  }

  private isTokenExpired(expiryDate?: Date | null): boolean {
    if (!expiryDate) return true
    return Date.now() >= expiryDate.getTime()
  }

  private async fetchNewAccessToken(youtube: Youtube): Promise<Youtube> {
    const url = 'https://oauth2.googleapis.com/token'

    const params = new URLSearchParams()
    params.append('client_id', process.env.GOOGLE_CLIENT_ID!)
    params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET!)
    params.append('refresh_token', youtube.refreshToken!)
    params.append('grant_type', 'refresh_token')

    const response = await fetch(url, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new InternalServerErrorException(
        `Failed to refresh access token: ${response.status} ${errorText}`
      )
    }

    const data = await response.json()
    const newAccessToken = data.access_token
    const newExpiryDate = Date.now() + data.expires_in * 1000 - 60_000 // refresh 1 minute early

    youtube.accessToken = newAccessToken
    youtube.expiryDate = new Date(newExpiryDate)

    await this.youtubeRepository.update(youtube)

    return youtube
  }
}
