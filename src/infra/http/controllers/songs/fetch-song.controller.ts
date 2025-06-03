// src/infra/http/controllers/downloaded-songs.controller.ts

import { Controller, Get, Param, Res } from '@nestjs/common'
import { Response } from 'express'
import { join } from 'path'
import { existsSync } from 'fs'

const exeDir = process.cwd()

@Controller('/downloaded-songs')
export class DownloadedSongsController {
  @Get(':filename')
  getSong(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(exeDir, 'downloaded-songs', filename)

    if (!existsSync(filePath)) {
      return res.status(404).send('File not found')
    }

    res.setHeader('Cache-Control', 'public, max-age=86400, immutable')
    return res.sendFile(filePath)
  }
}
