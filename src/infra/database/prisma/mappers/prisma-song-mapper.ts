import { Prisma, Songs as PrismaSong } from "generated/prisma";
import { Song } from "src/domain/entities/songs";

export class PrismaSongMapper {
    static toPrisma(song: Song): Prisma.SongsUncheckedCreateInput {
        return {
            title: song.name,
            youtubeUrl: song.youtubeUrl,
            localUrl: song.localUrl
        };
    }

    static toDomain(prismaSong: PrismaSong): Song {
        return new Song().create({
            id: prismaSong.id,
            name: prismaSong.title ?? undefined,
            youtubeUrl: prismaSong.youtubeUrl ?? undefined,
            localUrl: prismaSong.localUrl ?? undefined
        })
    }
}