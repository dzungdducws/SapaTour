import { call, put } from 'redux-saga/effects';
import { LocationService } from '../services/LocationService';
import container from '../dependencies/dependencies';
import { setLocation } from '../slice/locationSlice';

const locationService = container.get<LocationService>('LocationService');

function* getLocationListSaga(): Generator<any, void, any> {
  try {
    const res = yield call([locationService, locationService.getLocationList]);
    if (res.status == 200) {
      yield put(setLocation(res.data));
    }
  } catch (err) {
    console.error(err);
  }
}

export { getLocationListSaga };
