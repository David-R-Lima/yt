import { IPagination, IPaginationResponse } from "src/core/pagination";
import { Song } from "../entities/songs";
import { OrderBy } from "src/core/order-by";
import { Liked } from "src/core/liked";
import { Random } from "src/core/random";

export interface GetAllSongsFilters {
    text?: string
    orderBy?: OrderBy
    liked?: Liked
    duration?: {
        gte?: number
        lte?: number
    }
}

export interface GetSongsOptions {
    excludedIds?: string[];
    random?: Random;
    startId?: string
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
    abstract getFromPlaylist({
        playlistId,
        getSongOptions
    }: {
        playlistId: string, getSongOptions: GetSongsOptions
    }): Promise<Song[]>
    abstract getFromLiked({ getSongOptions }: {getSongOptions: GetSongsOptions}): Promise<Song[]>
    abstract getFromAll({ getSongOptions }: {getSongOptions: GetSongsOptions}): Promise<Song[]>
}