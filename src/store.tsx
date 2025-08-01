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
// import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './services_saga/rootSaga';

let enhancers: any[] = [];
const createSagaMiddleware = require('redux-saga').default;
let sagaMiddleware: any;
let middleware: any[] = [];

if (__DEV__) {
  const reactotron = require('./devtools/ReactotronConfig').default;
  enhancers.push(reactotron.createEnhancer());
  const sagaMonitor = reactotron.createSagaMonitor();

  sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);
} else {
  sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);
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
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
  enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(enhancers),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
