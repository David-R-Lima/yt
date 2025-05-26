import { Module } from '@nestjs/common'
import { DownloadSongController } from './controllers/songs/download-song.controller'
import { DownloadSongUseCase } from 'src/domain/usecases/songs/download-song'
import { SongService } from 'src/domain/services/song-service'
import { GetSongsUseCase } from 'src/domain/usecases/songs/get-songs'
import { GetSongsController } from './controllers/songs/get-songs.controller'
import { AddSongToPlaylist } from 'src/domain/usecases/playlist/add-song-to-playlist'
import { FetchPlaylists } from 'src/domain/usecases/playlist/fetch-playlists'
import { RemoveSongFromPlaylist } from 'src/domain/usecases/playlist/remove-song-from-playlist'
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
import { UpdateSongUseCase } from 'src/domain/usecases/songs/add-song-to-liked'
import { UpdateSongController } from './controllers/songs/update-song.controller'
import { FetchBuildController } from './controllers/build/fetch-build.controller'
import { RemoveSongToPlaylistController } from './controllers/playlist/remove-song-from-playlist.controller'
import { DeleteSongController } from './controllers/songs/delete-song.controller'
import { HealthController } from './controllers/health/health.controller'
import { FetchYoutubeSongsController } from './controllers/youtube/fetch-youtube-songs.controller'
import { YoutubeService } from 'src/domain/services/youtube-service'
import { FetchMyYoutubeSongsController } from './controllers/youtube/fetch-my-playlist.controller'
import { MyYoutubeService } from 'src/domain/services/my-playlist-service'
import { YoutubeCallback } from './controllers/youtube/youtube-oauth-callback.controller'
import { GoogleAuthService } from 'src/domain/services/google-auth-service'
import { CacheModule } from '@nestjs/cache-manager'
import { GetQuickSelect } from 'src/domain/usecases/history/quick-select'
import { GetQuickSelectController } from './controllers/history/get-quick-select.controller'
import { UpdateCurrentSongsController } from './controllers/now-listening/update-current-songs.controller'
import { GetCurrentSongController } from './controllers/now-listening/get-current-song.controller'
import { GetCurrentSong } from 'src/domain/usecases/now-listening/get-current-song'
import { UpdateCurrentSong } from 'src/domain/usecases/now-listening/update-current-song'
import { NowListeningStore } from 'src/domain/store/now-listening.store'
import { EventsModule } from '../events/events.module'
import { PlayCurrentSongController } from './controllers/now-listening/actions/play-current-song.controller'
import { SkipCurrentSongController } from './controllers/now-listening/actions/skip-current-song.controller'
import { PauseCurrentSongController } from './controllers/now-listening/actions/pause-current-song.controller'
import { PreviousCurrentSongController } from './controllers/now-listening/actions/previous-current-song.controller'

@Module({
  imports: [DatabaseModule, CacheModule.register(), EventsModule],
  providers: [
    NowListeningStore,
    SongService,
    DownloadSongUseCase,
    GetSongsUseCase,
    AddSongToPlaylist,
    FetchPlaylists,
    RemoveSongFromPlaylist,
    DeleteSong,
    CreatePlayListUseCase,
    FetchPlaylist,
    AddSongToHistory,
    ClearHistory,
    GetHistory,
    GetNextSongs,
    UpdateSongUseCase,
    GetQuickSelect,

    //now listening
    GetCurrentSong,
    UpdateCurrentSong,

    //youtube

    MyYoutubeService,
    YoutubeService,
    GoogleAuthService,
  ],
  controllers: [
    HealthController,
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
    UpdateSongController,
    RemoveSongToPlaylistController,
    DeleteSongController,
    GetQuickSelectController,

    // now listening
    GetCurrentSongController,
    UpdateCurrentSongsController,
    PlayCurrentSongController,
    SkipCurrentSongController,
    PauseCurrentSongController,
    PreviousCurrentSongController,
    // youtube
    FetchYoutubeSongsController,
    FetchMyYoutubeSongsController,
    YoutubeCallback,

    // build
    FetchBuildController,
  ],
})
export class HttpModule {}
