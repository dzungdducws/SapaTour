import { ImageSourcePropType } from 'react-native';

export interface BookingRestaurantModel {
  type: string;
  idBooking: string;
  status: string;
  userInfo: UserInfoRestaurantModel;

  placeInfo: PlaceInfoRestaurantModel;
  timeUpdateStt1: string;
  timeUpdateStt2: string;
  timeUpdateStt3: string;
}

export interface PlaceInfoRestaurantModel {
  name: string;
  dayStart: string;
  timeStart: string;
  address: string;
  numberOfPeople: number;
  bill: BillRestaurantModel[];
  totalBill: number;
  totalDiscount: number;
  totalPrice: number;

  image: ImageSourcePropType;
}

export interface BillRestaurantModel {
  name: string;
  price: number;
  quantity: number;
}

export interface UserInfoRestaurantModel {
  name: string;
  phone: string;
  note: string;
}
