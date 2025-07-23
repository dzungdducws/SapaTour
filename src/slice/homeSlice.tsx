import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface HomeState {
  isLoadedHome: boolean;
}

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    isLoaded: false,
  },
  reducers: {
    setisLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { setisLoaded } = homeSlice.actions;
export default homeSlice.reducer;
