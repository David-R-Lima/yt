import { Injectable } from '@nestjs/common'
import { PlaylistSong } from 'src/domain/entities/playlist-song'
import { IPlaylistRepository } from 'src/domain/repositories/i-playlist-repository'
import { IPlaylistSongRepository } from 'src/domain/repositories/i-playlist-song-repository'
import { ISongRepository } from 'src/domain/repositories/i-song-repository'

interface request {
  songId: string
  playlistId: string
}

@Injectable()
export class AddSongToPlaylist {
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

    const playlistExists = await this.iPlaylistRespository.getById(req.playlistId)

    if (!playlistExists) {
      return null
    }

    const newPlaylistSong = new PlaylistSong().create({
      playlistId: req.playlistId,
      songId: req.songId,
    })

    await this.iPlaylistSongRepository.create(newPlaylistSong)

    return true
  }
}
