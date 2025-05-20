import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs'
import * as path from 'path'
import { Injectable } from '@nestjs/common'

const execAsync = promisify(exec)

interface DownloadResponse {
  fileUrl: string
  fileName: string
  title: string
  artist?: string
  duration?: number
  thumbnail?: string
}

@Injectable()
export class SongService {
  downloadFolder = path.resolve(__dirname, '../../../downloaded-songs')

  constructor() {
    if (!fs.existsSync(this.downloadFolder)) {
      fs.mkdirSync(this.downloadFolder, { recursive: true })
    }
  }

  sanitizeFileName(name: string): string {
    return name
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, '') // remove illegal characters
      .trim() // keep spaces, just trim ends
  }

  async download(url: string): Promise<DownloadResponse | Error> {
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
    const finalFileName = `${sanitizedTitle}.mp3`
    const outputPath = path.join(this.downloadFolder, finalFileName)
    const outputTemplate = path.join(this.downloadFolder, `${sanitizedTitle}.%(ext)s`)

    if (this.isDownloaded(outputPath)) {
      return new Error(`File already exists at ${outputPath}`)
    }

    const command = `yt-dlp -x --audio-format mp3 --audio-quality 0 -o "${outputTemplate}" "${url}"`

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
      title: sanitizedTitle,
      artist: metadata.artist || metadata.uploader || null,
      duration: metadata.duration || null,
      thumbnail: metadata.thumbnail || null,
    }
  }

  async delete(title: string) {
    const filePath = path.join(this.downloadFolder, title)
    const fileExists = this.isDownloaded(filePath)

    if (!fileExists) {
      console.log('File not found!')
    }

    fs.rm(filePath, () => {
      console.log('Deleted!')
    })
  }

  isDownloaded(url: string): boolean {
    return fs.existsSync(url)
  }
}
