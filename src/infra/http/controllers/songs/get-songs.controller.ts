import { Controller, Get, NotFoundException, Query } from '@nestjs/common'
import { Song } from 'src/domain/entities/songs'

import { GetSongsUseCase } from 'src/domain/usecases/songs/get-songs'
import { SongPresenter } from '../../presenters/song.presenter'
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

const requestSchema =  z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});
  
type RequestSchema = z.infer<typeof requestSchema>;

const validationPipe = new ZodValidationPipe(requestSchema);


@Controller('/song')
export class GetSongsController {
  constructor(private readonly getSongUseCase: GetSongsUseCase) {}

  @Get()
  async execute(@Query(validationPipe) query: RequestSchema) {
    const { page, limit } = query

    const songs = await this.getSongUseCase.execute({
      page: page ?? 1,
      limit: limit ?? 10,
    })

    if (!songs) {
      return new NotFoundException()
    }

    return {
      songs: songs.songs.map(SongPresenter.toHttp),
      meta: songs.paginationsReponse
    }
  }
}
