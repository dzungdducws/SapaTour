import { takeEvery } from 'redux-saga/effects';
import { getLocationListSaga } from './LocationService';
import { getHotelListSaga, getHotelBookingSaga } from './HotelService';
import {
  getRestaurantListSaga,
  getRestaurantBookingSaga,
} from './RestaurantService';

export function* rootSaga() {
  yield takeEvery('FETCH_LOCATION_LIST', getLocationListSaga);
  yield takeEvery('FETCH_HOTEL_LIST', getHotelListSaga);
  yield takeEvery('FETCH_RESTAURANT_LIST', getRestaurantListSaga);

  yield takeEvery('FETCH_HOTEL_BOOKING_LIST', getHotelBookingSaga);
  yield takeEvery('FETCH_RESTAURANT_BOOKING_LIST', getRestaurantBookingSaga);
}
