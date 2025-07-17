import { HotelBooking } from './slice/hotelBookingSlice';
import { RestaurantBooking } from './slice/restaurantBookingSlice';

export type RootStackParamList = {
  Login: any;
  ForgotPassword: any;
  Register: any;
  Home: any;

  Profile: any;
  Map: any;
  Trip: any;
  Menu: any;
  Four: any;

  DetailInfoHotelBooking: { navigation: any; item: HotelBooking };
  DetailInfoRestaurantBooking: {
    navigation: any;
    item: RestaurantBooking;
  };

  RouteInMenu: any;
  HeartInMenu: any;
  OrderInMenu: any;
  PromotionInMenu: any;
  WeatherInMenu: any;
  SupportInMenu: any;
  ContactInMenu: any;
  SuggestInMenu: any;
  LanguageInMenu: any;
  ShareInMenu: any;
  DeleteAccountInMenu: any;
};
