import { Prisma, Youtube as PrismaYoutube } from 'generated/prisma'
import { Youtube } from 'src/domain/entities/youtube'

export class PrismaYoutubeMapper {
  static toPrisma(youtube: Youtube): Prisma.YoutubeUncheckedCreateInput {
    return {
      id: youtube.id ?? undefined,
      accessToken: youtube.accessToken ?? '',
      refreshToken: youtube.refreshToken ?? '',
      expirationDate: youtube.expiryDate ? new Date(youtube.expiryDate) : undefined,
    }
  }

  static toDomain(raw: PrismaYoutube): Youtube {
    return new Youtube().create({
      id: raw.id,
      accessToken: raw.accessToken ?? undefined,
      refreshToken: raw.refreshToken ?? undefined,
      expiryDate: raw.expirationDate ?? undefined,
    })
  }
}
