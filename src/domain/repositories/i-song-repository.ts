import { IPagination, IPaginationResponse } from "src/core/pagination";
import { Song } from "../entities/songs";
import { OrderBy } from "src/core/order-by";
import { Liked } from "src/core/liked";

export interface GetAllSongsFilters {
    text?: string
    orderBy?: OrderBy
    liked?: Liked
}

export abstract class ISongRepository {
    abstract create(song: Song): Promise<Song>;
    abstract update(id: string, song: Song): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract get(id: string): Promise<Song>;
    abstract getAll(paganiation: IPagination, filters?: GetAllSongsFilters): Promise<{
        songs: Song[],
        paginationsReponse: IPaginationResponse
    }>;
}