import { Body, Controller, Post } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation.pipe";
import { UpdateCurrentSong } from "src/domain/usecases/now-listening/update-current-song";

const requestSchema = z.object({
    song_id: z.string(),
    current_time: z.number().optional(), // optional because we don't know the current time of the user when they are listening to a song, so we can't set it to the current time of the user
});

type RequestSchema = z.infer<typeof requestSchema>

const validationPipe = new ZodValidationPipe(requestSchema);

@Controller("/now-listening")
export class UpdateCurrentSongsController {
    constructor(
        private readonly updateCurrentSong: UpdateCurrentSong
    ) {}
    
    @Post()
    async handle(@Body(validationPipe) body: RequestSchema) {
        const { song_id, current_time } = body;

        await this.updateCurrentSong.execute({
            songId: song_id,
            currentTime: current_time
        })
    }
}