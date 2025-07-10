import { BookingHotelModel } from './models/BookingHotelModel';
import { BookingRestaurantModel } from './models/BookingRestaurantModel';

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

  DetailInfoHotelBooking: { navigation: any; item: BookingHotelModel };
  DetailInfoRestaurantBooking: { navigation: any; item: BookingRestaurantModel };

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
