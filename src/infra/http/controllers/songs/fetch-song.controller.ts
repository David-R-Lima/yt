// src/infra/http/controllers/downloaded-songs.controller.ts

import { Controller, Get, Param, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { join } from 'path'
import { existsSync } from 'fs'
import { Public } from 'src/infra/auth/public'

const exeDir = process.cwd()

@Controller('/downloaded-songs')
export class DownloadedSongsController {
  @Public()
  @Get(':filename')
  getSong(
    @Param('filename') filename: string,
    @Res() res: Response,
    @Query('token') token: string
  ) {
    if (token !== process.env.API_KEY) {
      return res.status(403).send('Forbidden: Invalid API key')
    }

    const filePath = join(exeDir, 'downloaded-songs', filename)

    console.log(`Fetching song from: ${filePath}`)

    if (!existsSync(filePath)) {
      return res.status(404).send('File not found')
    }

    res.setHeader('Cache-Control', 'public, max-age=86400, immutable')
    return res.sendFile(filePath)
  }
}
