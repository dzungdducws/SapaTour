import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import locationSlice from './slice/locationSlice';
import homeSlice from './slice/homeSlice';
import hotelSlice from './slice/hotelSlice';
import restaurantSlice from './slice/restaurantSlice';
import hotelBookingSlice from './slice/hotelBookingSlice';
import restaurantBookingSlice from './slice/restaurantBookingSlice';
import statusSlice from './slice/statusSlice';

export const store = configureStore({
  reducer: {
    home: homeSlice,
    user: userSlice,
    location: locationSlice,
    hotel: hotelSlice,
    restaurant: restaurantSlice,
    hotelBooking: hotelBookingSlice,
    restaurantBooking: restaurantBookingSlice,
    status: statusSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
