import { IPagination, IPaginationResponse } from "src/core/pagination";
import { Playlist } from "../entities/playlist";

export abstract class IPlaylistRepository {
    abstract create(playlist: Playlist): Promise<Playlist>;
    abstract update(id: string, playlist: Playlist): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract get(id: string): Promise<Playlist>;
    abstract getAll(paganiation: IPagination): Promise<{
        playlists: Playlist[],
        paginationsReponse: IPaginationResponse
    }>;
}