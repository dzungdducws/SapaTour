import { API_URL } from '../const/const';
import { Hotel } from '../slice/hotelSlice';

export class HotelService {
  getHotelList = async (): Promise<{ status: number; data: Hotel[] }> => {
    try {
      const response = await fetch(`${API_URL}/hotel/getHotel`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resJson = await response.json();
      return {
        status: resJson.status,
        data: resJson.data as Hotel[],
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
