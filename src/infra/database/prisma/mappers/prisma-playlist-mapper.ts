import {
  Prisma,
  Playlist as PrismaPlaylist,
  PlaylistSongs as PrismaPlaylistSong,
} from 'generated/prisma'
import { Playlist } from 'src/domain/entities/playlist'
import { PrismaPlaylistSongMapper } from './prisma-playlist-song-mapper'

export class PrismaPlaylistMapper {
  static toPrisma(playlist: Playlist): Prisma.PlaylistUncheckedCreateInput {
    return {
      name: playlist.name,
      description: playlist.description,
      imgUrl: playlist.imgUrl,
      updatedAt: playlist.updatedAt,
    }
  }

  static toDomain(
    raw: PrismaPlaylist & {
      PlaylistSongs?: PrismaPlaylistSong[]
    }
  ): Playlist {
    return new Playlist().create({
      id: raw.id,
      playlistSongs: raw.PlaylistSongs ? raw.PlaylistSongs.map(PrismaPlaylistSongMapper.toDomain) : [],
      name: raw.name ?? null,
      description: raw.description ?? null,
      imgUrl: raw.imgUrl ?? null,
      createdAt: raw.createdAt ?? null,
      updatedAt: raw.updatedAt ?? null,
    })
  }
}
