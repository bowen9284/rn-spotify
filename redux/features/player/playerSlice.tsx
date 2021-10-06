import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayerState {
  playerInfo: PlayerInfoState;
}

const initialState: PlayerState = {
  playerInfo: {
    isPlaying: false,
    isFavorite: true,
    artist: '',
    album: '',
    albumImage: undefined,
    trackName: '',
    trackDuration: 0,
    trackProgress: 0,
  },
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    loadPlayer: (state, action: PayloadAction<CurrentyPlayingResponse>) => {
      const item = action.payload.item;
      state.playerInfo.artist = item.artists[0].name;
      state.playerInfo.albumImage = item.album.images[0];
      state.playerInfo.trackName = item.name;
    },
    incrementTrackProgress: (state) => {
      state.playerInfo!.trackProgress += 1;
    },
    toggleIsFavorite: (state) => {
      state.playerInfo!.isFavorite = !state.playerInfo!.isFavorite;
    },
    toggleIsPlaying: (state) => {
      state.playerInfo!.isPlaying = !state.playerInfo!.isPlaying;
    },
  },
});

export const {
  incrementTrackProgress,
  toggleIsFavorite,
  toggleIsPlaying,
  loadPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
