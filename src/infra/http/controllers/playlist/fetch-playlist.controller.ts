import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common'
import { PlaylistPresenter } from '../../presenters/playlist.presenter'
import { FetchPlaylist } from 'src/domain/usecases/playlist/fetch-playlist'
import { PlaylistSongPresenter } from '../../presenters/playlist-song.presenter'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { z } from 'zod';
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

@Controller('/playlist/:id')
export class FetchPlaylistController {
  constructor(private readonly fetchPlaylist: FetchPlaylist) {}

  @Get()
  async handle(@Param() param: { id: string }, @Query(validationPipe) query: RequestSchema) {
    const { id } = param
    const { page, limit, order_by, liked, text } = query

    const data = await this.fetchPlaylist.execute({
        id,
        pagination: {
          page: page ?? 1,
          limit: limit ?? 10,
        },
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

    if (!data) {
      return new NotFoundException()
    }

    return {
      playlist: PlaylistPresenter.toHttp(data.playlist),
      playlist_songs: {
        data: data.songs.playlistSongs.map(PlaylistSongPresenter.toHttp),
        meta: data.songs.paginationResponse,
      }
    }
  }
}
