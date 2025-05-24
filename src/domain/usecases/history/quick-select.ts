import { Injectable } from '@nestjs/common'
import { IHistoryRepository } from 'src/domain/repositories/i-history-repository'

@Injectable()
export class GetQuickSelect {
  constructor(private readonly iHistoryRepository: IHistoryRepository) {}

  async execute() {
    const data = await this.iHistoryRepository.getQuickSelect()

    return data
  }
}
