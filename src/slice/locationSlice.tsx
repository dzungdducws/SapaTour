import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface Location {
  id: string;
  name: string;
  location: string;
  image: string;
  rate: number;
}

export interface LocationState {
  isLoadedLocation: boolean;
  locations: Location[];
}

const initialState: LocationState = {
  isLoadedLocation: false,
  locations: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location[]>) => {

      state.isLoadedLocation = true;
      state.locations = action.payload;
    },
    clearLocation: state => {
      state.isLoadedLocation = false;
      state.locations = [];
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations.push(action.payload);
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        loc => loc.id !== action.payload,
      );
    },
  },
});

export const { setLocation, clearLocation, addLocation, removeLocation } =
  locationSlice.actions;

export default locationSlice.reducer;
