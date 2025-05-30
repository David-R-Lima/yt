import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  GetAllHistoryFilters,
  IHistoryRepository,
} from 'src/domain/repositories/i-history-repository'
import { History } from 'src/domain/entities/history'
import { IPagination, IPaginationResponse } from 'src/core/pagination'
import { PrismaHistoryMapper } from '../mappers/prisma-history-mapper'
import { Prisma } from 'generated/prisma'

@Injectable()
export class PrismaHistoryRepository implements IHistoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(history: History): Promise<History> {
    const data = PrismaHistoryMapper.toPrisma(history)

    const res = await this.prisma.history.create({
      data,
    })

    return PrismaHistoryMapper.toDomain(res)
  }

  async delete(): Promise<void> {
    await this.prisma.history.deleteMany({
      where: {},
    })
  }

  async deleteOne(id: string): Promise<void> {
    await this.prisma.history.delete({
      where: { id },
    })
  }

  async getAll(
    pagination: IPagination,
    filters?: GetAllHistoryFilters
  ): Promise<{ history: History[]; paginationsReponse: IPaginationResponse }> {
    const { limit, page } = pagination

    let p = 1
    let l = 10

    if (limit) {
      l = limit
    }

    if (page) {
      p = page
    }

    const where: Prisma.HistoryWhereInput = {
      ...(filters?.text && {
        OR: [
          {
            song: {
              title: {
                contains: filters.text,
                mode: 'insensitive',
              },
            },
          },
          {
            song: {
              artist: {
                contains: filters.text,
                mode: 'insensitive',
              },
            },
          },
        ],
      }),
    }

    const orderBy: Prisma.HistoryOrderByWithAggregationInput = {
      createdAt: filters?.orderBy ?? 'desc',
    }

    const result = await this.prisma.history.findMany({
      take: l,
      skip: (p - 1) * l,
      include: {
        song: true,
      },
      where,
      orderBy,
    })

    const count = await this.prisma.history.count({
      where,
      orderBy,
    })

    return {
      history: result.map(PrismaHistoryMapper.toDomain),
      paginationsReponse: {
        page: p,
        items: result.length,
        totalItems: count,
      },
    }
  }

  async getFirst(): Promise<History | undefined> {
    const result = await this.prisma.history.findFirst({
      take: 1,
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!result) {
      return undefined
    }

    return PrismaHistoryMapper.toDomain(result)
  }

  async update(history: History): Promise<History> {
    const data = PrismaHistoryMapper.toPrisma(history)

    const result = await this.prisma.history.update({
      where: { id: history.id },
      data,
    })

    return PrismaHistoryMapper.toDomain(result)
  }

  async getQuickSelect(): Promise<History[]> {
    let oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const topSongs = await this.prisma.history.groupBy({
      by: ['songId'],
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
      _count: {
        songId: true,
      },
      orderBy: {
        _count: {
          songId: 'desc',
        },
      },
      take: 10, // adjust how many top songs you want
    })

    const histories = await this.prisma.history.findMany({
      where: {
        songId: {
          in: topSongs.map((song) => song.songId),
        },
      },
      distinct: ['songId'], // optional: only one per songId
      orderBy: {
        createdAt: 'desc', // most recent listen per song
      },
      include: {
        song: true, // if you have a Song relation and want details
      },
    })

    return histories.map(PrismaHistoryMapper.toDomain)
  }
}
