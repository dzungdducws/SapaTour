import { call, put } from 'redux-saga/effects';
import { API_URL } from '../const/const';
import container from '../dependencies/dependencies';
import { HotelService } from '../services/HotelService';
import { setHotel } from '../slice/hotelSlice';
import { setHotelBooking } from '../slice/detailInfoHotelBooking';
import { setHotelBookings } from '../slice/hotelBookingSlice';

const hotelService = container.get<HotelService>('HotelService');

function* getHotelListSaga(): Generator<any, void, any> {
  try {
    
    const res = yield call([hotelService, hotelService.getHotelList]);
    console.log(res);
    
    if (res.status == 200) {
      yield put(setHotel(res.data));
    }
  } catch (err) {
    console.error(err);
  }
}

function* getHotelBookingSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    const userInfoId = action.payload;

    const res = yield call(
      [hotelService, hotelService.getHotelBooking],
      userInfoId,
    );
    console.log(res);
    
    if (res.status == 200) {
      yield put(setHotelBookings(res.data));
    }
  } catch (err) {
    console.error(err);
  }
}

export { getHotelListSaga, getHotelBookingSaga };
