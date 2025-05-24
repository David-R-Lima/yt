import { Controller, Get } from '@nestjs/common'
import { GetQuickSelect } from 'src/domain/usecases/history/quick-select'
import { HistoryPresenter } from '../../presenters/history.presenter'

@Controller('/history/quick')
export class GetQuickSelectController {
  constructor(private readonly getQuickSelect: GetQuickSelect) {}

  @Get()
  async handle() {
    const data = await this.getQuickSelect.execute()

    return data.map(HistoryPresenter.toHttp)
  }
}
