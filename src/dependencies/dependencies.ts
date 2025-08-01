import { Container } from 'inversify';
import { HotelService } from '../services/HotelService';
import { RestaurantService } from '../services/RestaurantService';
import { LocationService } from '../services/LocationService';
import { ImageLocal } from '../dataraw';
import { AuthService } from '../services/AuthService';

const container = new Container();

container
  .bind<HotelService>('HotelService')
  .toConstantValue(new HotelService());

container
  .bind<RestaurantService>('RestaurantService')
  .toConstantValue(new RestaurantService());

container
  .bind<LocationService>('LocationService')
  .toConstantValue(new LocationService());

container.bind<AuthService>('AuthService').toConstantValue(new AuthService());

container.bind<ImageLocal>('ImageLocal').toConstantValue(new ImageLocal());

export default container;
