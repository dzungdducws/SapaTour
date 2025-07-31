import { Hotel } from '../slice/hotelSlice';
import { Restaurant } from '../slice/restaurantSlice';
import CardImage from './CardImage';
import { memo } from 'react';

type CardImageListProps = {
  list: (Hotel | Restaurant)[];
};

const CardImageList = ({ list }: CardImageListProps) => {
  return list
    .sort((a, b) => b.rate - a.rate)
    .map((item, index) => {
      const isHotel = 'price' in item;
      return (
        <CardImage
          key={index}
          star={isHotel ? item.star : -1}
          rate={item.rate}
          name={item.name}
          location={item.location}
          image={item.image}
          price={isHotel ? item.price : -1}
          time_open={!isHotel ? item.time_open : undefined}
          time_close={!isHotel ? item.time_close : undefined}
        />
      );
    });
};

export default memo(CardImageList);
