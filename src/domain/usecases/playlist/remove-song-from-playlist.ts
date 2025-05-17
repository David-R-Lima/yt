import { Injectable } from '@nestjs/common'
import { IPlaylistRepository } from 'src/domain/repositories/i-playlist-repository'
import { IPlaylistSongRepository } from 'src/domain/repositories/i-playlist-song-repository'
import { ISongRepository } from 'src/domain/repositories/i-song-repository'

interface request {
  songId: string
  playlistId: string
}

@Injectable()
export class RemoveSongToPlaylist {
  constructor(
    private readonly iSongRepository: ISongRepository,
    private readonly iPlaylistRespository: IPlaylistRepository,
    private readonly iPlaylistSongRepository: IPlaylistSongRepository,
  ) {}

  async execute(req: request): Promise<boolean | null> {
    const songExists = await this.iSongRepository.get(req.songId)

    if (!songExists) {
      return null
    }

    const playlistExists = await this.iPlaylistRespository.get(req.playlistId)

    if (!playlistExists) {
      return null
    }

    await this.iPlaylistSongRepository.delete(req.playlistId, req.songId)

    return true
  }
}
