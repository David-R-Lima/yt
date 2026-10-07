import { Injectable } from '@nestjs/common'
import { IHistoryRepository } from 'src/domain/repositories/i-history-repository'

@Injectable()
export class GetSmartDownload {
  constructor(private readonly iHistoryRepository: IHistoryRepository) {}

  async execute(limit: number) {
    const data = await this.iHistoryRepository.getForSmartDownload(limit)

    return data
  }
}
