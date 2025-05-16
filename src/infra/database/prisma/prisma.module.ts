import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { IPlaylistRepository } from "src/domain/repositories/i-playlist-repository";
import { PrismaPlaylistRepository } from "./repositories/prisma-playlist-repository";
import { ISongRepository } from "src/domain/repositories/i-song-repository";
import { PrismaSongRepository } from "./repositories/prisma-song-repository";

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
        } 
    ] 
})
export class PrismaModule {}
