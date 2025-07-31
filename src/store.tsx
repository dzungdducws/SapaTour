import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import locationSlice from './slice/locationSlice';
import homeSlice from './slice/homeSlice';
import hotelSlice from './slice/hotelSlice';
import restaurantSlice from './slice/restaurantSlice';
import hotelBookingSlice from './slice/hotelBookingSlice';
import restaurantBookingSlice from './slice/restaurantBookingSlice';
import detailInfoHotelBookingSlice from './slice/detailInfoHotelBooking';
import detailInfoRestaurantBookingSlice from './slice/detailInfoRestaurantBooking';
import statusSlice from './slice/statusSlice';

let enhancers: any[] = [];

if (__DEV__) {
  const reactotron = require('./devtools/ReactotronConfig').default;
  enhancers.push(reactotron.createEnhancer());
}

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
    detailInfoHotelBooking: detailInfoHotelBookingSlice,
    detailInfoRestaurantBooking: detailInfoRestaurantBookingSlice,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware(),
  enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(enhancers),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
