import { Prisma, Songs as PrismaSong } from "generated/prisma";
import { Song } from "src/domain/entities/songs";

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
            updatedAt: song.updatedAt
        };
    }

    static toDomain(prismaSong: PrismaSong): Song {
        return new Song().create({
            id: prismaSong.id,
            title: prismaSong.title ?? undefined,
            artist: prismaSong.artist ?? undefined,
            duration: prismaSong.duration ?? undefined,
            imgUrl: prismaSong.imgUrl ?? undefined,
            youtubeUrl: prismaSong.youtubeUrl ?? undefined,
            localUrl: prismaSong.localUrl ?? undefined,
            createdAt: prismaSong.createdAt ? new Date(prismaSong.createdAt) : undefined,
            updatedAt: prismaSong.updatedAt ? new Date(prismaSong.updatedAt): undefined
        })
    }
}