import { memo } from 'react';
import { Location } from '../slice/locationSlice';
import CardImageLocation from './CardImageLocation';

type CardImageLocationListProps = {
  locations: Location[];
};

const CardImageLocationList = ({ locations }: CardImageLocationListProps) => {
  return locations?.map((item, index) => (
    <CardImageLocation
      key={index}
      rate={item.rate}
      name={item.name}
      location={item.location}
      image={item.image}
    />
  ));
};

export default memo(CardImageLocationList);
