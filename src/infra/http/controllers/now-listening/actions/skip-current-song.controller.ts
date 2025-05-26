import { Controller, Post } from "@nestjs/common";
import { NowListeningGateway } from "src/infra/events/webSocket/now-listening.gateway";

@Controller('/now-listening/skip')
export class SkipCurrentSongController {
    constructor(
        private readonly gateway: NowListeningGateway,
    ) {}

    @Post()
    async handle() {
        this.gateway.emitSkip();
    }
}