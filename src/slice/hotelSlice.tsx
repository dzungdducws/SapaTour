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
  isLoadedHotel: boolean;
  hotels: Hotel[];
}

const initialState: HotelState = {
  isLoadedHotel: false,
  hotels: [],
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotel: (state, action: PayloadAction<Hotel[]>) => {
      state.isLoadedHotel = true;
      state.hotels = action.payload;
    },
    clearHotel: state => {
      state.isLoadedHotel = false;
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
  hotelSlice.actions;

export default hotelSlice.reducer;
