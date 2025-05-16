interface Props {
    playlistId: string;
    songId: string;
}

export class PlaylistSong {
    private _playlistId: string;
    private _songId: string;

    constructor() {}

    get playlistId(): string {
        return this._playlistId;
    }

    set playlistId(value: string) {
        this._playlistId = value;
    }

    get songId(): string {
        return this._songId;
    }

    set songId(value: string) {
        this._songId = value;
    }

    create(props: Props): PlaylistSong {
        const playlistSongs = new PlaylistSong()
        ;
        playlistSongs.playlistId = props.playlistId ?? undefined;
        playlistSongs.songId = props.songId ?? undefined;
        
        return playlistSongs;
    }
}