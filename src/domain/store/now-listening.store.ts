import { Injectable } from '@nestjs/common';
import { Song } from '../entities/songs';

@Injectable()
export class NowListeningStore {
  private currentSong: {
    song: Song
    currentTime: number;
    updatedAt: Date;
  } | null = null;

  setCurrentSong(song: Song, currentTime = 0) {
    this.currentSong = {
      song,
      currentTime,
      updatedAt: new Date(),
    };
  }

  getCurrentSong() {
    return this.currentSong;
  }

  clearCurrentSong() {
    this.currentSong = null;
  }
}
