import { Injectable } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'
import { IYoutubeRepository } from '../repositories/i-youtube-repository'
import { Youtube } from '../entities/youtube'

@Injectable()
export class GoogleAuthService {
  private oauth2Client: OAuth2Client

  constructor(private readonly youtubeRepository: IYoutubeRepository) {
    this.oauth2Client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    })
  }

  generateAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ]

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
    })
  }

  async getTokens(code: string): Promise<Youtube> {
    const { tokens } = await this.oauth2Client.getToken(code)

    this.oauth2Client.setCredentials(tokens)

    const youtube = new Youtube().create({
      accessToken: tokens.access_token ?? '',
      refreshToken: tokens.refresh_token ?? '',
      expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : undefined,
    })

    await this.youtubeRepository.create(youtube)
    return youtube
  }

  async getAccessToken(): Promise<string> {
    const youtube = await this.youtubeRepository.get()

    if (!youtube || !youtube.refreshToken) {
      throw new Error('No saved YouTube credentials found. You must authorize first.')
    }

    const expirationDate = youtube.expiryDate ? youtube.expiryDate.getTime() : 0

    this.oauth2Client.setCredentials({
      access_token: youtube.accessToken,
      refresh_token: youtube.refreshToken,
      expiry_date: expirationDate,
    })

    const now = Date.now()
    if (!expirationDate || expirationDate <= now) {
      // refresh needed
      const newTokens = await this.oauth2Client.refreshAccessToken()
      const newCreds = newTokens.credentials

      youtube.accessToken = newCreds.access_token ?? ''
      youtube.expiryDate = newCreds.expiry_date ? new Date(newCreds.expiry_date) : undefined

      await this.youtubeRepository.update(youtube)
    }

    return youtube.accessToken!
  }
}
