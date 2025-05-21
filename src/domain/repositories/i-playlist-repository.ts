import { IPagination, IPaginationResponse } from "src/core/pagination";
import { Playlist } from "../entities/playlist";
import { OrderBy } from "src/core/order-by";
import { Pinned } from "src/core/pinned";

export interface GetAllPlaylistsFilters {
    text?: string;
    orderBy?: OrderBy
    pinned?: Pinned
}

export abstract class IPlaylistRepository {
    abstract create(playlist: Playlist): Promise<Playlist>;
    abstract update(id: string, playlist: Playlist): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract get(id: string): Promise<Playlist>;
    abstract getAll(paganiation: IPagination, filters?: GetAllPlaylistsFilters): Promise<{
        playlists: Playlist[],
        paginationsReponse: IPaginationResponse
    }>;
}