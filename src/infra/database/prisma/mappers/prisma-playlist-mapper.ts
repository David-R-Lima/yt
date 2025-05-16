import { Prisma, Playlist as PrismaPlaylist, Songs as PrismaSong } from "generated/prisma";
import { Playlist } from "src/domain/entities/playlist";
import { PrismaSongMapper } from "./prisma-song-mapper";

export class PrismaPlaylistMapper {
    static toPrisma(playlist: Playlist): Prisma.PlaylistUncheckedCreateInput {
        return {
            name: playlist.name,
        };
    }

    static toDomain(raw: PrismaPlaylist & {
        PlaylistSongs?: PrismaSong[]
    }): Playlist {
        return new Playlist().create({
            id: raw.id,
            songs: raw.PlaylistSongs ? raw.PlaylistSongs.map(PrismaSongMapper.toDomain) : [],
            name: raw.name ?? undefined,
        });
    }
}