import { IPagination, IPaginationResponse } from "src/core/pagination";
import { Song } from "../entities/songs";

export abstract class ISongRepository {
    abstract create(song: Song): Promise<Song>;
    abstract update(id: string, song: Song): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract get(id: string): Promise<Song>;
    abstract getAll(paganiation: IPagination): Promise<{
        songs: Song[],
        paginationsReponse: IPaginationResponse
    }>;
}