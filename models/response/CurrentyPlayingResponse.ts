interface CurrentyPlayingResponse {
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  currently_playing_type: Type;
  item: CurrentlyPlayingItem;
}

interface CurrentlyPlayingItem {
  album: Album;
  artists: [Artist];
  available_markets: [string];
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  name: string;
  popularity: 0;
  track_number: number;
  type: Type;
  uri: string;
}
