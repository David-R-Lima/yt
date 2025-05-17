import { Module } from '@nestjs/common'
import { DownloadSongController } from './controllers/download-song.controller'
import { DownloadSongUseCase } from 'src/domain/usecases/songs/download-song'
import { PrismaModule } from '../database/prisma/prisma.module'
import { SongService } from 'src/domain/services/song-service'
import { GetSongsUseCase } from 'src/domain/usecases/songs/get-songs'
import { GetSongsController } from './controllers/get-songs.controller'
import { AddSongToPlaylist } from 'src/domain/usecases/playlist/add-song-to-playlist'
import { FetchPlaylists } from 'src/domain/usecases/playlist/fetch-playlist'
import { RemoveSongToPlaylist } from 'src/domain/usecases/playlist/remove-song-from-playlist'
import { DeleteSong } from 'src/domain/usecases/songs/delete-song'

@Module({
  imports: [PrismaModule],
  providers: [
    SongService, 
    DownloadSongUseCase, 
    GetSongsUseCase, 
    AddSongToPlaylist, 
    FetchPlaylists, 
    RemoveSongToPlaylist,
    DeleteSong
  ],
  controllers: [DownloadSongController, GetSongsController],
})
export class HttpModule {}
