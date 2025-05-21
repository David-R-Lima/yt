import { Controller, Get, NotFoundException, Query } from '@nestjs/common'
import { SongPresenter } from '../../presenters/song.presenter'
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { GetNextSongs, Source } from 'src/domain/usecases/songs/get-next-songs';
import { Random } from 'src/core/random';

const requestSchema =  z.object({
    random: z.nativeEnum(Random).optional(),
    source: z.nativeEnum(Source).optional().default(Source.all),
    source_id: z.string().optional(),
    start_id: z.string().optional()
});

type RequestSchema = z.infer<typeof requestSchema>;

const validationPipe = new ZodValidationPipe(requestSchema);

@Controller('/song/next')
export class GetNextSongsController {
  constructor(private readonly getNextSongs: GetNextSongs) {}

  @Get()
  async execute(@Query(validationPipe) query: RequestSchema) {
    const { source, source_id, random, start_id } = query

    const songs = await this.getNextSongs.execute({
        excludedIds: [],
        random: random,
        source,
        sourceId: source_id,
        startId: start_id
    })

    if (!songs) {
      return new NotFoundException()
    }

    return songs.map(SongPresenter.toHttp)
  }
}
