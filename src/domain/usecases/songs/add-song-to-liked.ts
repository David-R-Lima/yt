import { Injectable } from "@nestjs/common";
import { ISongRepository } from "../../repositories/i-song-repository";
import { Song } from "../../entities/songs";
import { Liked } from "src/core/liked";

interface request {
    songId: string
    artist?: string
    title?: string
    liked?: Liked
    duration?: number
}

@Injectable()
export class UpdateSongUseCase {
    constructor(
        private readonly songRepository: ISongRepository,
    ) {}

    async execute(req: request): Promise<Song | null> {
        const { songId, artist, title, liked, duration } = req;

        const songExists = await this.songRepository.get(songId);

        if(!songExists) return null

        songExists.liked = liked === Liked.TRUE ? true : false
        songExists.artist = artist ?? songExists.artist
        songExists.title = title ?? songExists.title
        songExists.duration = duration ?? songExists.duration
        songExists.updatedAt = new Date()

        await this.songRepository.update(songId, songExists)

        return songExists;
    }
}