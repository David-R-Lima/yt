import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs'
import * as path from 'path'
import { Injectable } from '@nestjs/common'

const execAsync = promisify(exec)

interface DownloadResponse {
  fileUrl: string
  fileName: string
  artist?: string
  duration?: number
  thumbnail?: string
}

@Injectable()
export class DownloadService {
  downloadFolder = path.resolve(__dirname, '../../../downloaded-songs')

  constructor() {
    if (!fs.existsSync(this.downloadFolder)) {
      fs.mkdirSync(this.downloadFolder, { recursive: true })
    }
  }

  sanitizeFileName(name: string): string {
    return name.replace(/[^a-z0-9_\-()\[\] ]/gi, '').replace(/\s+/g, '_')
  }

  async download(url: string): Promise<DownloadResponse> {
    const metadataCmd = `yt-dlp -j "${url}"`

    let metadata: any = {}

    try {
      const { stdout } = await execAsync(metadataCmd)
      metadata = JSON.parse(stdout)
    } catch (error) {
      console.error('Metadata fetch failed:', error)
      throw new Error('Could not fetch video metadata.')
    }

    const rawTitle = metadata.title || 'downloaded_audio'
    const sanitizedTitle = this.sanitizeFileName(rawTitle)
    const outputTemplate = path.join(this.downloadFolder, `${sanitizedTitle}.%(ext)s`)
    const finalFileName = `${sanitizedTitle}.mp3`

    const command = `yt-dlp -x --audio-format mp3 -o "${outputTemplate}" "${url}"`

    try {
      const { stdout, stderr } = await execAsync(command)
      console.log('Download complete:', stdout)
      if (stderr) console.error('Download stderr:', stderr)
    } catch (error) {
      console.error('Download failed:', error)
      throw new Error('Download failed.')
    }

    return {
      fileUrl: `/downloaded-songs/${finalFileName}`,
      fileName: finalFileName,
      artist: metadata.artist || metadata.uploader || null,
      duration: metadata.duration || null,
      thumbnail: metadata.thumbnail || null,
    }
  }

  isDownloaded(name: string): boolean {
    const filePath = path.join(this.downloadFolder, `${name}.mp3`)
    return fs.existsSync(filePath)
  }
}
