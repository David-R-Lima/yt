import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { GetSmartDownload } from 'src/domain/usecases/history/get-for-smart-download'

@Controller('/history/smart')
export class GetSmartDownloadController {
  constructor(private readonly getSmartDownload: GetSmartDownload) {}

  @Get()
  async handle(@Query('limit') limit: string) {
    console.log("jdhas")
    if (!limit || isNaN(parseInt(limit))) {
        throw new BadRequestException('Limit query parameter is required')
    }
    const data = await this.getSmartDownload.execute(parseInt(limit))

    return data
  }
}
