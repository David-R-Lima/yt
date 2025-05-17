import { IPlaylistSongRepository } from 'src/domain/repositories/i-playlist-song-repository'
import { PrismaService } from '../prisma.service'
import { PlaylistSong } from 'src/domain/entities/playlist-song'
import { PrismaPlaylistSongMapper } from '../mappers/prisma-playlist-song-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaPlaylistSongRepository implements IPlaylistSongRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(playlistSong: PlaylistSong): Promise<PlaylistSong> {
    const data = PrismaPlaylistSongMapper.toPrisma(playlistSong)

    const res = await this.prismaService.playlistSongs.create({
      data,
    })

    return PrismaPlaylistSongMapper.toDomain(res)
  }

  async delete(playlistId: string, songId: string): Promise<void> {
    await this.prismaService.playlistSongs.deleteMany({
      where: {
        playlistId,
        songId,
      },
    })
  }

  async deleteManyByPlaylist(playlistId: string): Promise<void> {
    await this.prismaService.playlistSongs.deleteMany({
      where: {
        playlistId: playlistId,
      },
    })
  }

  async deleteManyBySong(songId: string): Promise<void> {
    await this.prismaService.playlistSongs.deleteMany({
      where: {
        songId: songId,
      },
    })
  }
}
