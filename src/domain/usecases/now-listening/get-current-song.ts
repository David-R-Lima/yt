import { Injectable } from "@nestjs/common";
import { NowListeningStore } from "src/domain/store/now-listening.store";

@Injectable()
export class GetCurrentSong {
    constructor(
        private readonly nowListeningStore: NowListeningStore,
    ) {}

    async handle() {
        const nowPlaying = this.nowListeningStore.getCurrentSong();

        return nowPlaying
    }
}