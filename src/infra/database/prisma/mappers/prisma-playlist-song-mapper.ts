import { Prisma, PlaylistSongs as PrismaPlaylistSong } from "generated/prisma";
import { PlaylistSong } from "src/domain/entities/playlist-song";


export class PrismaPlaylistSongMapper {
    static toPrisma(playlistSong: PlaylistSong): Prisma.PlaylistSongsUncheckedCreateInput {
        return {
            playlistId: playlistSong.playlistId,
            songId: playlistSong.songId,
        }
    }

    static toDomain(raw: PrismaPlaylistSong): PlaylistSong {
        return new PlaylistSong().create({
            playlistId: raw.playlistId,
            songId: raw.songId,
        })
    }
}