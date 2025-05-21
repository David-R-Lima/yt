import { Injectable } from '@nestjs/common'
import { GetAllPlaylistsFilters, IPlaylistRepository } from 'src/domain/repositories/i-playlist-repository'
import { PrismaService } from '../prisma.service'
import { Playlist } from 'src/domain/entities/playlist'
import { IPagination, IPaginationResponse } from 'src/core/pagination'
import { PrismaPlaylistMapper } from '../mappers/prisma-playlist-mapper'
import { Pinned } from 'src/core/pinned'
import { Prisma } from 'generated/prisma'

@Injectable()
export class PrismaPlaylistRepository implements IPlaylistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(playlist: Playlist): Promise<Playlist> {
    const data = PrismaPlaylistMapper.toPrisma(playlist)

    const result = await this.prisma.playlist.create({
      data,
    })

    return playlist
  }

  async delete(id: string): Promise<void> {
    await this.prisma.playlist.delete({
      where: { id },
    })
  }

  async get(id: string): Promise<Playlist> {
    const result = await this.prisma.playlist.findUnique({
      where: { id },
      include: {
        PlaylistSongs: {
          include: {
            song: true,
          },
        },
      },
    })

    if (!result) throw new Error('playlist not found')

    return PrismaPlaylistMapper.toDomain(result)
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
}
