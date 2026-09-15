import { Injectable } from '@nestjs/common'
import { ISongRepository } from 'src/domain/repositories/i-song-repository'

@Injectable()
export class GetRecommended {
  constructor(private readonly iSongRepository: ISongRepository) {}

  async execute() {
    const data = await this.iSongRepository.getRecommended()

    return data
  }
}
