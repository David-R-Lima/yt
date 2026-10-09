import { Injectable } from '@nestjs/common'
import { ISongRepository } from 'src/domain/repositories/i-song-repository'
import { SongService } from 'src/domain/services/song-service'

// ALL | LIKED | or artist name or smth
interface request {
    from: string
}

@Injectable()
export class GetRandomSongUseCase {
  constructor(
    private readonly iSongRepository: ISongRepository,
  ) {}

  async execute(req: request) {
    const songExists = await this.iSongRepository.getRandom(req.from)

    if (!songExists) {
      return null
    }

    return songExists
  }
}
