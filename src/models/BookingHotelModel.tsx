import { ImageSourcePropType } from 'react-native';

export interface BookingHotelModel {
  type: string;
  idBooking: string;
  status: string;
  userInfo: UserInfoHotelModel;

  placeInfo: PlaceInfoHotelModel;
  timeUpdateStt1?: string;
  timeUpdateStt2?: string;
  timeUpdateStt3?: string;
}

export interface PlaceInfoHotelModel {
  name: string;
  dayStart: string;
  dayEnd: string;
  address: string;
  rooms: RoomHotelModel[];
  services?: ServiceHotelModel[];
  totalPriceRoom: number;
  totalPriceService?: number;
  totalDiscount?: number;
  totalPrice?: number;
}

export interface RoomHotelModel {
  name: string;
  price: number;
  theNumOfRoom: number;
  image: ImageSourcePropType;
}

export interface ServiceHotelModel {
  name: string;
  price: number;
  quantity: number;
}

export interface UserInfoHotelModel {
  name: string;
  phone: string;
  note: string;
}
