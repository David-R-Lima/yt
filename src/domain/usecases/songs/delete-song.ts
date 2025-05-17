import { Injectable } from '@nestjs/common'
import { IPlaylistSongRepository } from 'src/domain/repositories/i-playlist-song-repository'
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
    private readonly iPlaylistSongRepository: IPlaylistSongRepository
  ) {}

  async execute(req: request) {
    const songExists = await this.iSongRepository.get(req.songId)

    if (!songExists) {
      return null
    }

    if (songExists.localUrl) {
      const filename = songExists.localUrl.split('/').pop()

      if (!filename) {
        return null
      }

      await this.songService.delete(filename)
    }

    if (req.hardDelete) {
      await this.iPlaylistSongRepository.deleteManyBySong(req.songId)

      await this.songService.delete(req.songId)
    } else {
      songExists.localUrl = null
      await this.iSongRepository.update(req.songId, songExists)
    }
  }
}
