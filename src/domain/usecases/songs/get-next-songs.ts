import { Injectable } from "@nestjs/common";
import { IPaginationResponse } from "src/core/pagination";
import { Random } from "src/core/random";
import { Song } from "src/domain/entities/songs";
import { ISongRepository } from "src/domain/repositories/i-song-repository";

export enum Source {
    playlist = "playlist",
    liked = "liked",
    all = "all"
}

interface request {
    startId?: string
    source?: Source;
    sourceId?: string;
    random?: Random;
    excludedIds?: string[];
}

@Injectable()
export class GetNextSongs{
    constructor(private readonly iSongRepository: ISongRepository) {}

    async execute(req: request): Promise<Song[]> {

        const { source = Source.all, sourceId, random = Random.FALSE, excludedIds, startId } = req;
        
        switch (source) {
            case Source.all: {
                const res = await this.iSongRepository.getFromAll({
                    getSongOptions: {
                        random,
                        startId,
                        excludedIds
                    }
                })

                return res
            }

            case Source.playlist: {
                if (!sourceId) throw new Error('Source id is required')

                const res = await this.iSongRepository.getFromPlaylist({
                    playlistId: sourceId, 
                    getSongOptions: {
                        random,
                        startId,
                        excludedIds
                    }
                })

                return res
            }

            case Source.liked: {
                const res = await this.iSongRepository.getFromLiked({
                    getSongOptions: {
                        random,
                        startId,
                        excludedIds
                    }
                })

                return res
            }

            default: {
                const res = await this.iSongRepository.getFromAll({
                    getSongOptions: {
                        random,
                        startId,
                        excludedIds
                    }
                })

                return res
            }
        }
    }
}