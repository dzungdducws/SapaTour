import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { HotelBooking } from './hotelBookingSlice';

export interface DetailInfoHotelBookingState {
  hotel_booking: HotelBooking | null;
}

const initialState: DetailInfoHotelBookingState = {
  hotel_booking: null,
};

const detailInfoHotelBookingSlice = createSlice({
  name: 'detailInfoHotelBooking',
  initialState,
  reducers: {
    setHotelBooking: (state, action: PayloadAction<HotelBooking>) => {
      state.hotel_booking = action.payload;
    },
    clearHotelBooking: state => {
      state.hotel_booking = null;
    },
  },
});

export const { setHotelBooking, clearHotelBooking } =
  detailInfoHotelBookingSlice.actions;

export default detailInfoHotelBookingSlice.reducer;
