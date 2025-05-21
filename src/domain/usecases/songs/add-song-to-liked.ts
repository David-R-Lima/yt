import { Injectable } from "@nestjs/common";
import { ISongRepository } from "../../repositories/i-song-repository";
import { Song } from "../../entities/songs";

interface request {
    songId: string
}

@Injectable()
export class LikeSongUseCase {
    constructor(
        private readonly songRepository: ISongRepository,
    ) {}

    async execute(req: request): Promise<Song | null> {
        const { songId } = req;

        const songExists = await this.songRepository.get(songId);

        if(!songExists) return null

        songExists.liked = true

        const songs = await this.songRepository.update(songId, songExists)

        return songExists;
    }
}