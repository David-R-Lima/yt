import { Prisma, Songs as PrismaSong } from 'generated/prisma'
import { Song } from 'src/domain/entities/songs'

export class PrismaSongMapper {
  static toPrisma(song: Song): Prisma.SongsUncheckedCreateInput {
    return {
      title: song.title,
      artist: song.artist,
      duration: song.duration,
      imgUrl: song.imgUrl,
      youtubeUrl: song.youtubeUrl,
      localUrl: song.localUrl,
      createdAt: song.createdAt,
      updatedAt: song.updatedAt,
    }
  }

  static toDomain(prismaSong: PrismaSong): Song {
    return new Song().create({
      id: prismaSong.id,
      title: prismaSong.title ?? null,
      artist: prismaSong.artist ?? null,
      duration: prismaSong.duration ?? null,
      imgUrl: prismaSong.imgUrl ?? null,
      youtubeUrl: prismaSong.youtubeUrl ?? null,
      localUrl: prismaSong.localUrl ?? null,
      createdAt: prismaSong.createdAt ? new Date(prismaSong.createdAt) : null,
      updatedAt: prismaSong.updatedAt ? new Date(prismaSong.updatedAt) : null,
    })
  }
}
