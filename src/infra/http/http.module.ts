import { Module } from '@nestjs/common'
import { DownloadSongController } from './controllers/songs/download-song.controller'
import { DownloadSongUseCase } from 'src/domain/usecases/songs/download-song'
import { PrismaModule } from '../database/prisma/prisma.module'
import { SongService } from 'src/domain/services/song-service'
import { GetSongsUseCase } from 'src/domain/usecases/songs/get-songs'
import { GetSongsController } from './controllers/songs/get-songs.controller'
import { AddSongToPlaylist } from 'src/domain/usecases/playlist/add-song-to-playlist'
import { FetchPlaylists } from 'src/domain/usecases/playlist/fetch-playlists'
import { RemoveSongToPlaylist } from 'src/domain/usecases/playlist/remove-song-from-playlist'
import { DeleteSong } from 'src/domain/usecases/songs/delete-song'
import { CreatePlaylistController } from './controllers/playlist/create-playlist.controller'
import { FetchPlaylistsController } from './controllers/playlist/fetch-playlists.controller'
import { CreatePlayListUseCase } from 'src/domain/usecases/playlist/create-play-list'
import { AddSongToPlaylistController } from './controllers/playlist/add-song-to-playlist.controller'

@Module({
  imports: [PrismaModule],
  providers: [
    SongService,
    DownloadSongUseCase,
    GetSongsUseCase,
    AddSongToPlaylist,
    FetchPlaylists,
    RemoveSongToPlaylist,
    DeleteSong,
    CreatePlayListUseCase,
  ],
  controllers: [
    DownloadSongController,
    GetSongsController,
    CreatePlaylistController,
    FetchPlaylistsController,
    AddSongToPlaylistController,
  ],
})
export class HttpModule {}
