import { Injectable } from "@nestjs/common";
import { DownloadService } from "../services/download";
import { ISongRepository } from "../repositories/i-song-repository";
import { Song } from "../entities/songs";

interface request {
    url: string;
    name: string;
}


@Injectable()
export class DownloadSongUseCase {
    constructor(
        private readonly downloadService: DownloadService,
        private readonly songRepository: ISongRepository,
    ) {}

    async execute(req: request): Promise<void> {
        const { url, name } = req;

        const res = await this.downloadService.download(url, name);

        const song = new Song().create({
            name: name,
            youtubeUrl: url,
            localUrl: res.url,
        })

        await this.songRepository.create(song);
    }
}