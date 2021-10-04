import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayerState {
  playerInfo?: PlayerInfo | undefined
}

const initialState: PlayerState = {
  playerInfo: undefined
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    loadPlayer: (state, action: PayloadAction<CurrentyPlayingResponse>) => {
      if (state.playerInfo) {
        state.playerInfo.trackName = action.payload.item.album.name;
        state.playerInfo.artist = action.payload.item.artists[0].name;
        state.playerInfo.albumImage = action.payload.item.album.images[0];
        state.playerInfo.trackName = action.payload.item.name;
      }
  
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
