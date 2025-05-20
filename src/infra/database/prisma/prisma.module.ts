import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { IPlaylistRepository } from "src/domain/repositories/i-playlist-repository";
import { PrismaPlaylistRepository } from "./repositories/prisma-playlist-repository";
import { ISongRepository } from "src/domain/repositories/i-song-repository";
import { PrismaSongRepository } from "./repositories/prisma-song-repository";
import { PrismaPlaylistSongRepository } from "./repositories/prisma-playlist-song-repository";
import { IPlaylistSongRepository } from "src/domain/repositories/i-playlist-song-repository";
import { IHistoryRepository } from "src/domain/repositories/i-history-repository";
import { PrismaHistoryRepository } from "./repositories/prisma-history-repository";

@Module({   
    providers: [
        PrismaService,    
        {
            provide: IPlaylistRepository,
            useClass: PrismaPlaylistRepository
        },
        {
            provide: ISongRepository,
            useClass: PrismaSongRepository
        },
        {
            provide: IPlaylistSongRepository,
            useClass: PrismaPlaylistSongRepository
        },
        {
            provide: IHistoryRepository,
            useClass: PrismaHistoryRepository
        }
    ],
    exports: [
        PrismaService,   
        {
            provide: IPlaylistRepository,
            useClass: PrismaPlaylistRepository
        },       
        {
            provide: ISongRepository,
            useClass: PrismaSongRepository
        },
        {
            provide: IPlaylistSongRepository,
            useClass: PrismaPlaylistSongRepository
        },
        {
            provide: IHistoryRepository,
            useClass: PrismaHistoryRepository
        }
    ] 
})
export class PrismaModule {}
