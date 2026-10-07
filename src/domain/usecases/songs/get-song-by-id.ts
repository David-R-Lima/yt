import { Injectable } from '@nestjs/common'
import { ISongRepository } from 'src/domain/repositories/i-song-repository'
import { SongService } from 'src/domain/services/song-service'

interface request {
    id: string
}

@Injectable()
export class GetSongByIdUseCase {
  constructor(
    private readonly iSongRepository: ISongRepository,
  ) {}

  async execute(req: request) {
    const songExists = await this.iSongRepository.get(req.id)

    if (!songExists) {
      return null
    }

    return songExists
  }
}
