import { Injectable } from '@nestjs/common'
import { ISongRepository } from 'src/domain/repositories/i-song-repository'
import { SongService } from 'src/domain/services/song-service'

interface request {
  songId: string
  hardDelete?: boolean
}

@Injectable()
export class DeleteSong {
  constructor(
    private readonly songService: SongService,
    private readonly iSongRepository: ISongRepository,
  ) {}

  async execute(req: request) {
    const songExists = await this.iSongRepository.get(req.songId)

    if (!songExists) {
      return null
    }

    if (req.hardDelete) {
      if (songExists.localUrl) {
        const filename = songExists.localUrl.split('/').pop()
  
        if (!filename) {
          return null
        }
  
        await this.songService.delete(filename)
      }

      await this.iSongRepository.delete(req.songId)
    } else {
      if (songExists.localUrl) {
        const filename = songExists.localUrl.split('/').pop()
  
        if (!filename) {
          return null
        }
  
        await this.songService.delete(filename)
  
        songExists.localUrl = null

        await this.iSongRepository.update(req.songId, songExists)
      }
    }
  }
}
