import { Injectable } from "@nestjs/common";
import { ISongRepository } from "src/domain/repositories/i-song-repository";
import { NowListeningStore } from "src/domain/store/now-listening.store";

interface request {
    songId: string;
    currentTime?: number;
}

@Injectable()
export class UpdateCurrentSong {
    constructor(
        private readonly iSongRepository: ISongRepository,
        private readonly nowListeningStore: NowListeningStore,
    ) {}

    async execute({ songId, currentTime} : request) {
        const nowPlaying = this.nowListeningStore.getCurrentSong();

        if (nowPlaying && nowPlaying.song.id === songId) {
            this.nowListeningStore.setCurrentSong(nowPlaying.song, currentTime ?? 0)
        } else {
            const songExists = await this.iSongRepository.get(songId)

            if (!songExists) {
                throw new Error("Song not found");
            }

            this.nowListeningStore.setCurrentSong(songExists, currentTime ?? 0);
        }
    }
}