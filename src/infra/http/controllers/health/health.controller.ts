import { Controller, Get } from '@nestjs/common'
import { Public } from 'src/infra/auth/public'

@Controller('/health')
export class HealthController {
  constructor() {}

  @Public()
  @Get()
  handle() {
    return 'Running!'
  }
}
