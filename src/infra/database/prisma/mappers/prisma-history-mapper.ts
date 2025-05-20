import { Prisma, History as PrismaHistory, Songs as PrismaSong } from "generated/prisma";
import { History } from "src/domain/entities/history";
import { PrismaSongMapper } from "./prisma-song-mapper";


export class PrismaHistoryMapper {
    static toPrisma(history: History): Prisma.HistoryUncheckedCreateInput {
        return {
            id: history.id,
            songId: history.songId,
            createAt: history.createdAt,
            updatedAt: history.updatedAt
        }
    }

    static toDomain(raw: PrismaHistory & {
        song?: PrismaSong
    }): History {
        const history = new History().create({
            id: raw.id,
            songId: raw.songId,
            createdAt: raw.createAt ? new Date(raw.createAt) : undefined,
            updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : undefined,
            song: raw.song ? PrismaSongMapper.toDomain(raw.song) : undefined
        })

        return history
    }
}