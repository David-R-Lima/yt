import { Injectable } from "@nestjs/common";
import { Playlist } from "src/domain/entities/playlist";
import { IPlaylistRepository } from "src/domain/repositories/i-playlist-repository";

interface request {
    name: string
    description?: string
}

@Injectable()
export class CreatePlayListUseCase {
  constructor(private readonly iPlaylistRepository: IPlaylistRepository) {}

  async execute(data: request): Promise<Playlist> {
    const playlist = new Playlist().create({
        name: data.name,
        description: data.description,
        createdAt: new Date(),
    })
    const playList = await this.iPlaylistRepository.create(playlist);
    
    return playList;
  }
}