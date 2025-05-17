import {
  Prisma,
  PlaylistSongs as PrismaPlaylistSong,
  Songs as PrismaSong,
  Playlist as PrismaPlaylist,
} from 'generated/prisma'
import { PlaylistSong } from 'src/domain/entities/playlist-song'
import { PrismaSongMapper } from './prisma-song-mapper'

export class PrismaPlaylistSongMapper {
  static toPrisma(playlistSong: PlaylistSong): Prisma.PlaylistSongsUncheckedCreateInput {
    return {
      playlistId: playlistSong.playlistId,
      songId: playlistSong.songId,
    }
  }

  static toDomain(
    raw: PrismaPlaylistSong & {
      song?: PrismaSong
    }
  ): PlaylistSong {
    return new PlaylistSong().create({
      playlistId: raw.playlistId,
      songId: raw.songId,
      song: raw.song ? PrismaSongMapper.toDomain(raw.song) : undefined,
    })
  }
}
