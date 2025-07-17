import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  rate: number;
  star: number;
  price: number;
}

export interface HotelState {
  hotels: Hotel[];
}

const initialState: HotelState = {
  hotels: [],
};

const locationSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotel: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload;
    },
    clearHotel: state => {
      state.hotels = [];
    },
    addHotel: (state, action: PayloadAction<Hotel>) => {
      state.hotels.push(action.payload);
    },
    removeHotel: (state, action: PayloadAction<string>) => {
      state.hotels = state.hotels.filter(hotel => hotel.id !== action.payload);
    },
  },
});

export const { setHotel, clearHotel, addHotel, removeHotel } =
  locationSlice.actions;

export default locationSlice.reducer;
