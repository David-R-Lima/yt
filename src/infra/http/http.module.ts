import { Module } from "@nestjs/common";
import { DownloadSongController } from "./controllers/download-song.controller";
import { DownloadSongUseCase } from "src/domain/usecases/download-song";
import { PrismaModule } from "../database/prisma/prisma.module";
import { DownloadService } from "src/domain/services/download";
import { GetSongsUseCase } from "src/domain/usecases/get-songs";
import { GetSongsController } from "./controllers/get-songs.controller";


@Module({
    imports: [PrismaModule],
    providers: [
        DownloadService,
        DownloadSongUseCase,
        GetSongsUseCase
    ],
    controllers: [
        DownloadSongController,
        GetSongsController
    ],
})

export class HttpModule {}