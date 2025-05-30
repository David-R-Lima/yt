import { Song } from 'src/domain/entities/songs'

export class SongPresenter {
  static toHttp(song: Song) {
    return {
      id: song.id,
      title: song.title,
      artist: song.artist,
      duration: song.duration,
      liked: song.liked,
      youtube_url: song.youtubeUrl,
      img_url: song.imgUrl,
      local_url: song.localUrl,
      created_at: song.createdAt,
      updated_at: song.updatedAt,
    }
  }
}
