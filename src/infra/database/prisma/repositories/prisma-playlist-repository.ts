import { Injectable } from '@nestjs/common'
import { GetAllPlaylistsFilters, IPlaylistRepository } from 'src/domain/repositories/i-playlist-repository'
import { PrismaService } from '../prisma.service'
import { Playlist } from 'src/domain/entities/playlist'
import { IPagination, IPaginationResponse } from 'src/core/pagination'
import { PrismaPlaylistMapper } from '../mappers/prisma-playlist-mapper'
import { Pinned } from 'src/core/pinned'
import { Prisma } from 'generated/prisma'
import { GetAllSongsFilters } from 'src/domain/repositories/i-song-repository'
import { Liked } from 'src/core/liked'
import { PrismaSongMapper } from '../mappers/prisma-song-mapper'
import { PrismaPlaylistSongMapper } from '../mappers/prisma-playlist-song-mapper'
import { PlaylistSong } from 'src/domain/entities/playlist-song'

@Injectable()
export class PrismaPlaylistRepository implements IPlaylistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(playlist: Playlist): Promise<Playlist> {
    const data = PrismaPlaylistMapper.toPrisma(playlist)

    await this.prisma.playlist.create({
      data,
    })

    return playlist
  }

  async delete(id: string): Promise<void> {
    await this.prisma.playlist.delete({
      where: { id },
    })
  }

  async getByIdWithSongs(id: string, pagination: IPagination, filters?: GetAllSongsFilters): Promise<{
    playlist: Playlist,
    songs: {
      playlistSongs: PlaylistSong[],
      paginationsReponse: IPaginationResponse
    }
  }> {

    const { limit, page } = pagination;

    let p = 1
    let l = 10

    if(limit){
        l = limit
    }

    if(page){
        p = page
    }

    const playlistSongsWhere: Prisma.PlaylistSongsWhereInput = {
      playlistId: id,
      song: {
        ...(filters?.text && {
            OR: [
                {
                    title: {
                        contains: filters.text,
                        mode: "insensitive"
                    }
                },
                {
                    artist: {
                        contains: filters.text,
                        mode: "insensitive"
                    }
                },
            ]
        }),
        ...(filters?.duration && (
            {
                duration: {
                    ...(filters.duration?.gte !== undefined && { gte: filters.duration.gte }),
                    ...(filters.duration?.lte !== undefined && { lte: filters.duration.lte }),
                }
            }
        )),
        ...(filters?.liked && (
            {
                liked: filters.liked === Liked.TRUE ? true : false
            }
        )),
      }
    }

    const playlistSongsOrderBy: Prisma.PlaylistSongsOrderByWithRelationInput = {
      song: {
        createdAt: filters?.orderBy ?? "asc"
      }
    }

    const [playlist, songs, songsCount] = await Promise.all([
      this.prisma.playlist.findUnique({
        where: { id }
      }),
      this.prisma.playlistSongs.findMany({
        where: playlistSongsWhere,
        include: {
          song: true
        },
        take: limit,
        skip: (p - 1) * l,
        orderBy: playlistSongsOrderBy
      }),
      this.prisma.playlistSongs.count({
        where: playlistSongsWhere,
        orderBy: playlistSongsOrderBy
      })
    ])

    if (!playlist) throw new Error('playlist not found')

    return {
      playlist: PrismaPlaylistMapper.toDomain(playlist),
      songs: {
        playlistSongs: songs.map(PrismaPlaylistSongMapper.toDomain),
        paginationsReponse: {
          page: p,
          items: songs.length,
          totalItems: songsCount
        }
      }
    }
  }

  async getAll(paganiation: IPagination, filters?: GetAllPlaylistsFilters): Promise<{
    playlists: Playlist[],
    paginationsReponse: IPaginationResponse
  }> {
    const { limit, page } = paganiation

    let p = 1
    let l = 10

    if (limit) {
      l = limit
    }

    if (page) {
      p = page
    }

        const where: Prisma.PlaylistWhereInput = {
          ...(filters?.text && {
            OR: [
                {
                    name: {
                        contains: filters.text,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: filters.text,
                        mode: "insensitive"
                    }
                },
            ]
          }),
          ...(filters?.pinned && (
              {
                  pinned: filters.pinned === Pinned.TRUE ? true : false
              }
          ))
        }

        const orderBy: Prisma.PlaylistOrderByWithAggregationInput = {
            createdAt: filters?.orderBy ?? "asc"
        }

    const result = await this.prisma.playlist.findMany({
      take: l,
      skip: (p - 1) * l,
      where,
      orderBy
    })

    const count = await this.prisma.playlist.count({
      where,
      orderBy
    })

    return {
      playlists: result.map(PrismaPlaylistMapper.toDomain),
      paginationsReponse: {
        page: p,
        items: result.length,
        totalItems: count,
      }
    }
  }

  async update(id: string, playlist: Playlist): Promise<void> {
    const data = PrismaPlaylistMapper.toPrisma(playlist)
    await this.prisma.playlist.update({
      where: { id },
      data: data,
    })
  }

  async getById(id: string): Promise<Playlist | null> {
    const playlist = await this.prisma.playlist.findUnique({ where: { id } })

    if (!playlist) {
      return null
    }

    return PrismaPlaylistMapper.toDomain(playlist)
  }
}
