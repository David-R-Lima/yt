import { Injectable } from "@nestjs/common";
import { GetAllSongsFilters, ISongRepository } from "../../repositories/i-song-repository";
import { Song } from "../../entities/songs";
import { IPaginationResponse } from "src/core/pagination";
import { OrderBy } from "src/core/order-by";
import { Liked } from "src/core/liked";

interface request {
    page?: number;
    limit?: number;
    filters?: GetAllSongsFilters
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
        const { page, limit, filters } = req;

        const songs = await this.songRepository.getAll({
            limit,
            page
        }, filters);

        return songs;
    }
}