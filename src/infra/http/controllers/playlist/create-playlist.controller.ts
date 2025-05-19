import { Body, Controller, Post } from '@nestjs/common'
import { CreatePlayListUseCase } from 'src/domain/usecases/playlist/create-play-list'

@Controller('/playlist')
export class CreatePlaylistController {
  constructor(private readonly createPlayListUseCase: CreatePlayListUseCase) {}

  @Post()
  async handle(@Body() body: { name: string; description: string }): Promise<void> {
    const { name, description } = body

    try {
      await this.createPlayListUseCase.execute({
        name,
        description,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
