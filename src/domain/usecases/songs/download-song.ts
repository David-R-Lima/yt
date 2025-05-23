import { Injectable } from '@nestjs/common'
import { SongService } from '../../services/song-service'
import { ISongRepository } from '../../repositories/i-song-repository'
import { Song } from '../../entities/songs'

interface request {
  url: string
}

@Injectable()
export class DownloadSongUseCase {
  constructor(
    private readonly songService: SongService,
    private readonly songRepository: ISongRepository
  ) {}

  async execute(req: request): Promise<Song | Error> {
    const { url } = req

    const res = await this.songService.download(url)


    if(res instanceof Error) {
      return res
    }

    const songExists = await this.songRepository.getByYoutubeUrl(url)

    if(songExists) {
      songExists.localUrl = res.fileUrl

      await this.songRepository.update(songExists.id as string, songExists)

      return songExists
    } else {
      const song = new Song().create({
        title: res.title,
        youtubeUrl: url,
        localUrl: res.fileUrl,
        artist: res.artist,
        duration: res.duration,
        imgUrl: res.thumbnail,
        createdAt: new Date(),
      })
  
      const newSong = await this.songRepository.create(song)
  
      return newSong
    }
  }
}
