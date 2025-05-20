import { Injectable } from "@nestjs/common";
import { History } from "src/domain/entities/history";
import { IHistoryRepository } from "src/domain/repositories/i-history-repository";
import { ISongRepository } from "src/domain/repositories/i-song-repository";


@Injectable()
export class AddSongToHistory {
    constructor(
        private readonly iHistoryRepository: IHistoryRepository,
        private readonly iSongRepository: ISongRepository
    ) {}

    async execute(songId: string) {
        const songExists = await this.iSongRepository.get(songId);

        if(!songExists) {
            return false;
        }

        const recentHistory = await this.iHistoryRepository.getFirst()

        if(recentHistory && recentHistory.songId === songId) {
            recentHistory.updatedAt = new Date();

            const result = await this.iHistoryRepository.update(recentHistory)

            return result;
        }

        const history = new History().create({
            songId: songId,
            createdAt: new Date(),
        })

        const result = await this.iHistoryRepository.create(history)

        return result;
    }
}