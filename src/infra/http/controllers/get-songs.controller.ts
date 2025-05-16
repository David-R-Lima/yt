import { Controller, Get, Query } from "@nestjs/common";
import { Song } from "src/domain/entities/songs";

import { GetSongsUseCase } from "src/domain/usecases/get-songs";


@Controller("/song")
export class GetSongsController {
    constructor(
        private readonly getSongUseCase: GetSongsUseCase,
    ) {}
    
    @Get()
    async execute(@Query() query: {
            page?: number;
            limit?: number
        }): Promise<Song[]> {

        const {page, limit} = query;

        const songs = await this.getSongUseCase.execute({
            page,
            limit
        });

        return songs;
    }
}
