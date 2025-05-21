import { Controller, Get, NotFoundException, Query } from '@nestjs/common'
import { Song } from 'src/domain/entities/songs'

import { GetSongsUseCase } from 'src/domain/usecases/songs/get-songs'
import { SongPresenter } from '../../presenters/song.presenter'
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { OrderBy } from 'src/core/order-by';
import { Liked } from 'src/core/liked';

const requestSchema =  z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  liked: z.nativeEnum(Liked).optional(),
  order_by: z.nativeEnum(OrderBy).optional().default(OrderBy.ASC),
  text: z.string().optional(),
  duration_gte: z.coerce.number().optional(),
  duration_lte: z.coerce.number().optional(),
});
  
type RequestSchema = z.infer<typeof requestSchema>;

const validationPipe = new ZodValidationPipe(requestSchema);


@Controller('/song')
export class GetSongsController {
  constructor(private readonly getSongUseCase: GetSongsUseCase) {}

  @Get()
  async execute(@Query(validationPipe) query: RequestSchema) {
    const { page, limit, order_by, liked, text } = query

    const songs = await this.getSongUseCase.execute({
      page: page ?? 1,
      limit: limit ?? 10,
      filters: {
        text, 
        orderBy: order_by ?? OrderBy.ASC,
        liked,
        duration: {
          gte: query.duration_gte ?? undefined,
          lte: query.duration_lte ?? undefined,
        }
      }
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
