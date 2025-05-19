import { Injectable } from "@nestjs/common";
import { ISongRepository } from "../../repositories/i-song-repository";
import { Song } from "../../entities/songs";
import { IPaginationResponse } from "src/core/pagination";

interface request {
    page?: number;
    limit?: number;
}

@Injectable()
export class GetSongsUseCase {
    constructor(
        private readonly songRepository: ISongRepository,
    ) {}

    async execute(req: request): Promise<{
        songs: Song[],
        paginationsReponse: IPaginationResponse
    }> {
        const { page, limit } = req;

        const songs = await this.songRepository.getAll({
            limit,
            page
        });

        return songs;
    }
}