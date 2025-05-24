import { Controller, Get, Query } from '@nestjs/common'
import { GoogleAuthService } from 'src/domain/services/google-auth-service'

@Controller('/youtube')
export class YoutubeCallback {
  constructor(private readonly googleAuthService: GoogleAuthService) {}
  // In your controller
  @Get('/auth/google/callback')
  async handleCallback(@Query('code') code: string) {
    const tokens = await this.googleAuthService.getTokens(code)
    return tokens
  }

  @Get('/auth-url')
  getAuthUrl(): { url: string } {
    const url = this.googleAuthService.generateAuthUrl()
    return { url }
  }

  @Get('/token')
  async getAccessToken() {
    const token = await this.googleAuthService.getAccessToken()
    return { accessToken: token }
  }
}
