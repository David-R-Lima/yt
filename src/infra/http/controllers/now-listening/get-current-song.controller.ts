import { Controller, Get } from "@nestjs/common";
import { GetCurrentSong } from "src/domain/usecases/now-listening/get-current-song";
import { Public } from "src/infra/auth/public";
import { SongPresenter } from "../../presenters/song.presenter";

@Controller("/now-listening")
export class GetCurrentSongController {
    constructor(
        private readonly GetCurrentSong: GetCurrentSong,
    ) {}

    @Public()
    @Get()
    async handle() {
        const nowPlaying = await this.GetCurrentSong.handle();
        return {
            song: nowPlaying?.song ? SongPresenter.toHttp(nowPlaying?.song) : null,
            current_time: nowPlaying?.currentTime,
            updated_at: nowPlaying?.updatedAt,
        };
    }
}