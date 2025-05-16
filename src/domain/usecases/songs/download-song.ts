import { Injectable } from '@nestjs/common'
import { DownloadService } from '../../services/download'
import { ISongRepository } from '../../repositories/i-song-repository'
import { Song } from '../../entities/songs'

interface request {
  url: string
}

@Injectable()
export class DownloadSongUseCase {
  constructor(
    private readonly downloadService: DownloadService,
    private readonly songRepository: ISongRepository
  ) {}

  async execute(req: request): Promise<void> {
    const { url } = req

    const res = await this.downloadService.download(url)

    const song = new Song().create({
      title: res.fileName,
      youtubeUrl: url,
      localUrl: res.fileUrl,
      artist: res.artist,
      duration: res.duration,
      imgUrl: res.thumbnail,
      createdAt: new Date(),
    })

    await this.songRepository.create(song)
  }
}
