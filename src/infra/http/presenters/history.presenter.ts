import { History } from "src/domain/entities/history";
import { SongPresenter } from "./song.presenter";

export class HistoryPresenter {
    static toHttp(history: History) {
        return {
            id: history.id,
            song_id: history.songId,
            created_at: history.createdAt,
            updated_at: history.updatedAt,
            song: history.song ? SongPresenter.toHttp(history.song) : null
        }
    }
}