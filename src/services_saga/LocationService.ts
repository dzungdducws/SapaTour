import { API_URL } from '../const/const';
import { Location } from '../slice/locationSlice';

export class LocationService {
  getLocationList = async (): Promise<{ status: number; data: Location[] }> => {
    try {
      const response = await fetch(`${API_URL}/location/getLocation`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resJson = await response.json();

      return {
        status: resJson.status,
        data: resJson.data as Location[],
      };
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        data: [],
      };
    }
  };
}
