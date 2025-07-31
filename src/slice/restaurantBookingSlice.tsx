import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface RestaurantBookingBill {
  id_bill: string;
  name: string;
  quantity: number;
  price: number;
}

export interface RestaurantBooking {
  id: string;
  name: string;
  note: string;
  location: string;
  check_in_date: string;
  check_in_time: string;
  status: number;
  type: number;
  totalPriceBill: number;
  bill: RestaurantBookingBill[];
  created_at: string;
  updated_at: string;
  image: string;
  number_people: number;
}

export interface RestaurantBookingState {
  isNeedFetchRestaurant: boolean;
  restaurant_bookings: RestaurantBooking[];
}

const initialState: RestaurantBookingState = {
  isNeedFetchRestaurant: true,
  restaurant_bookings: [],
};

const restaurantBookingSlice = createSlice({
  name: 'restaurantBooking',
  initialState,
  reducers: {
    setRestaurantBookings: (
      state,
      action: PayloadAction<RestaurantBooking[]>,
    ) => {
      state.isNeedFetchRestaurant = false;
      state.restaurant_bookings = action.payload;
    },
    clearRestaurantBookings: state => {
      state.isNeedFetchRestaurant = true;
      state.restaurant_bookings = [];
    },
    addRestaurantBookings: (state, action: PayloadAction<RestaurantBooking>) => {
      state.restaurant_bookings.push(action.payload);
    },
    removeRestaurantBookings: (state, action: PayloadAction<string>) => {
      state.restaurant_bookings = state.restaurant_bookings.filter(
        restaurant_booking => restaurant_booking.id !== action.payload,
      );
    },
  },
});

export const {
  setRestaurantBookings,
  clearRestaurantBookings,
  addRestaurantBookings,
  removeRestaurantBookings,
} = restaurantBookingSlice.actions;

export default restaurantBookingSlice.reducer;
