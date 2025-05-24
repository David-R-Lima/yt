import { Injectable } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'

interface request {
  query: string
}

export interface YouTubeSearchResponse {
  kind: string
  etag: string
  nextPageToken?: string
  prevPageToken?: string
  regionCode: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: YouTubeSearchItem[]
}

export interface YouTubeSearchItem {
  kind: string
  etag: string
  downloaded: boolean
  id: {
    kind: 'youtube#video' | 'youtube#channel' | 'youtube#playlist'
    videoId?: string
    channelId?: string
    playlistId?: string
  }
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
  }
}

export interface YouTubeThumbnail {
  url: string
  width: number
  height: number
}

@Injectable()
export class YoutubeService {
  constructor() {}

  async execute({ query }: request) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
      'topic, song, music, ' + query
    )}&key=${process.env.YOUTUBE_API_KEY}`

    const response = await fetch(url)
    const data: YouTubeSearchResponse = await response.json()

    return data
  }
}
