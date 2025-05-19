import { Controller, Get, NotFoundException, Query } from '@nestjs/common'
import { FetchPlaylists } from 'src/domain/usecases/playlist/fetch-playlists'
import { PlaylistPresenter } from '../../presenters/playlist.presenter'
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

const requestSchema =  z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});
  
type RequestSchema = z.infer<typeof requestSchema>;

const validationPipe = new ZodValidationPipe(requestSchema);

@Controller('/playlist')
export class FetchPlaylistsController {
  constructor(private readonly fetchPlaylists: FetchPlaylists) {}

  @Get()
  async handle(@Query(validationPipe) query: RequestSchema) {
    const { page, limit } = query

    const data = await this.fetchPlaylists.execute({
      pagination: {
        limit,
        page,
      },
    })

    if (!data) {
      return new NotFoundException()
    }

    return {
      playlists: data.playlists.map(PlaylistPresenter.toHttp),
      meta: data.paginationsReponse
    }
  }
}
