import { Module } from '@nestjs/common'
import { DownloadSongController } from './controllers/songs/download-song.controller'
import { DownloadSongUseCase } from 'src/domain/usecases/songs/download-song'
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
import { FetchPlaylistController } from './controllers/playlist/fetch-playlist.controller'
import { FetchPlaylist } from 'src/domain/usecases/playlist/fetch-playlist'
import { DatabaseModule } from '../database/database.module'
import { AddSongToHistoryController } from './controllers/history/add-song-to-history.controller'
import { ClearHistoryController } from './controllers/history/clear-history.controller'
import { GetHistoryController } from './controllers/history/get-history.controller'
import { AddSongToHistory } from 'src/domain/usecases/history/add-song'
import { ClearHistory } from 'src/domain/usecases/history/clear-history'
import { GetHistory } from 'src/domain/usecases/history/get-history'
import { GetNextSongs } from 'src/domain/usecases/songs/get-next-songs'
import { GetNextSongsController } from './controllers/songs/get-next-songs.controller'
import { LikeSongUseCase } from 'src/domain/usecases/songs/add-song-to-liked'
import { LikeSongController } from './controllers/songs/like-song.controller'
import { FetchBuildController } from './controllers/build/fetch-build.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    SongService,
    DownloadSongUseCase,
    GetSongsUseCase,
    AddSongToPlaylist,
    FetchPlaylists,
    RemoveSongToPlaylist,
    DeleteSong,
    CreatePlayListUseCase,
    FetchPlaylist,
    AddSongToHistory,
    ClearHistory,
    GetHistory,
    GetNextSongs,
    LikeSongUseCase
  ],
  controllers: [
    DownloadSongController,
    GetSongsController,
    CreatePlaylistController,
    FetchPlaylistsController,
    AddSongToPlaylistController,
    FetchPlaylistController,
    AddSongToHistoryController,
    ClearHistoryController,
    GetHistoryController,
    GetNextSongsController,
    LikeSongController,

    // build
    FetchBuildController
  ],
})
export class HttpModule {}
