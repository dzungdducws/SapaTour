import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RestaurantBooking } from './restaurantBookingSlice';

export interface DetailInfoRestaurantBookingState {
  restaurant_booking: RestaurantBooking | null;
}

const initialState: DetailInfoRestaurantBookingState = {
  restaurant_booking: null,
};

const detailInfoRestaurantBookingSlice = createSlice({
  name: 'detailInfoRestaurantBooking',
  initialState,
  reducers: {
    setRestaurantBooking: (state, action: PayloadAction<RestaurantBooking>) => {
      state.restaurant_booking = action.payload;
    },
    clearRestaurantBooking: state => {
      state.restaurant_booking = null;
    },
  },
});

export const { setRestaurantBooking, clearRestaurantBooking } =
  detailInfoRestaurantBookingSlice.actions;

export default detailInfoRestaurantBookingSlice.reducer;
