import { call, put } from 'redux-saga/effects';
import { API_URL } from '../const/const';
import container from '../dependencies/dependencies';
import { HotelService } from '../services/HotelService';
import { setHotel } from '../slice/hotelSlice';
import { RestaurantService } from '../services/RestaurantService';
import { setRestaurantBooking } from '../slice/detailInfoRestaurantBooking';
import { setRestaurant } from '../slice/restaurantSlice';
import { setRestaurantBookings } from '../slice/restaurantBookingSlice';

const restaurantService = container.get<RestaurantService>('RestaurantService');

function* getRestaurantListSaga(): Generator<any, void, any> {
  try {
    const res = yield call([
      restaurantService,
      restaurantService.getRestaurantList,
    ]);
    
    if (res.status == 200) {
      yield put(setRestaurant(res.data));
    }
  } catch (err) {
    console.error(err);
  }
}

function* getRestaurantBookingSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    const userInfoId = action.payload;
    const res = yield call(
      [restaurantService, restaurantService.getRestaurantBooking],
      userInfoId,
    );
    if (res.status == 200) {
      yield put(setRestaurantBookings(res.data));
    }
  } catch (err) {
    console.error(err);
  }
}

export { getRestaurantListSaga, getRestaurantBookingSaga };
