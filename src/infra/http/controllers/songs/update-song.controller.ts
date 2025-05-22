import { Body, Controller, NotFoundException, Put } from '@nestjs/common'
import { SongPresenter } from '../../presenters/song.presenter'
import { UpdateSongUseCase } from 'src/domain/usecases/songs/add-song-to-liked'
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { Liked } from 'src/core/liked';

const requestSchema =  z.object({
  song_id: z.string(),
  title: z.string().optional(),
  artist: z.string().optional(),
  liked: z.nativeEnum(Liked).optional(),
  duration: z.coerce.number().optional(),
});
  
type RequestSchema = z.infer<typeof requestSchema>;

const validationPipe = new ZodValidationPipe(requestSchema);

@Controller('/song')
export class UpdateSongController {
  constructor(private readonly updateSongUseCase: UpdateSongUseCase) {}

  @Put()
  async handle(@Body(validationPipe) body: RequestSchema) {
    const { song_id, artist, title, liked, duration } = body

    const res = await this.updateSongUseCase.execute({
      songId: song_id,
      artist,
      title,
      liked,
      duration
    })

    if(!res) {
      throw new NotFoundException("song not found")
    }

    return SongPresenter.toHttp(res)
  }
}
