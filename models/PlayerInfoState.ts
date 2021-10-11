interface PlayerInfoState {
  isPlaying: boolean;
  isFavorite: boolean;
  artist: string;
  album: string;
  albumImage?: SpotifyImage;
  trackName: string;
  trackDuration: number;
  trackProgress: number;
  miniPlayerIsVisible: boolean;
}
