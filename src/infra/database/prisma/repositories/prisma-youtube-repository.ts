import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { IYoutubeRepository } from 'src/domain/repositories/i-youtube-repository'
import { Youtube } from 'src/domain/entities/youtube'
import { PrismaYoutubeMapper } from '../mappers/prisma-youtube-mapper'

@Injectable()
export class PrismaYoutubeRepository implements IYoutubeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(youtube: Youtube): Promise<Youtube> {
    const data = PrismaYoutubeMapper.toPrisma(youtube)

    const res = await this.prismaService.youtube.create({
      data,
    })

    return PrismaYoutubeMapper.toDomain(res)
  }

  async get(): Promise<Youtube | null> {
    const res = await this.prismaService.youtube.findFirst()

    if (!res) return null

    return PrismaYoutubeMapper.toDomain(res)
  }

  async update(youtube: Youtube): Promise<Youtube> {
    const data = PrismaYoutubeMapper.toPrisma(youtube)

    const res = await this.prismaService.youtube.update({
      where: {
        id: data.id ?? '',
      },
      data,
    })

    return PrismaYoutubeMapper.toDomain(res)
  }
}
