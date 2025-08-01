import { API_URL } from '../const/const';
import { RestaurantBooking } from '../slice/restaurantBookingSlice';
import { Restaurant } from '../slice/restaurantSlice';

export class RestaurantService {
  getRestaurantList = async (): Promise<{
    status: number;
    data: Restaurant[];
  }> => {
    try {
      const response = await fetch(`${API_URL}/restaurant/getRestaurant`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resJson = await response.json();
      return {
        status: resJson.status,
        data: resJson.data as Restaurant[],
      };
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        data: [],
      };
    }
  };

  getRestaurantBooking = async (
    userInfoId: string,
  ): Promise<{
    status: number;
    data: RestaurantBooking[];
  }> => {
    try {
      const response = await fetch(
        `${API_URL}/booking/getBookingRestaurant/${userInfoId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const resJson = await response.json();
      return {
        status: resJson.status,
        data: resJson.data as RestaurantBooking[],
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
