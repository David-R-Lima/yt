import { Body, Controller, Post } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation.pipe";
import { UpdateCurrentSong } from "src/domain/usecases/now-listening/update-current-song";
import { NowListeningGateway } from "src/infra/events/webSocket/now-listening.gateway";

const requestSchema = z.object({
    song_id: z.string(),
    current_time: z.number().optional(),
});

type RequestSchema = z.infer<typeof requestSchema>

const validationPipe = new ZodValidationPipe(requestSchema);

@Controller("/now-listening")
export class UpdateCurrentSongsController {
    constructor(
        private readonly updateCurrentSong: UpdateCurrentSong,
        private readonly nowListeningGateway: NowListeningGateway
    ) {}
    
    @Post()
    async handle(@Body(validationPipe) body: RequestSchema) {
        const { song_id, current_time } = body;

        await this.updateCurrentSong.execute({
            songId: song_id,
            currentTime: current_time
        })

        this.nowListeningGateway.emitUpdate()
    }
}