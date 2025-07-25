import { FlatList, View } from 'react-native';
import { Hotel } from '../slice/hotelSlice';
import { Restaurant } from '../slice/restaurantSlice';
import CardImage from './CardImage';
import { memo } from 'react';

type CardImageListProps = {
  list: (Hotel | Restaurant)[];
};

const CardImageList = ({ list }: CardImageListProps) => {
  const sortedList = list.sort((a, b) => b.rate - a.rate);
  return (
    <FlatList
      data={sortedList}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => `${item.id}_${index}`}
      renderItem={({ item }) => (
        <CardImage
          star={'price' in item ? item.star : -1}
          rate={item.rate}
          name={item.name}
          location={item.location}
          image={item.image}
          price={'price' in item ? item.price : -1}
          time_open={!('price' in item) ? item.time_open : undefined}
          time_close={!('price' in item) ? item.time_close : undefined}
        />
      )}
      contentContainerStyle={{
        gap: 12,
        paddingRight: 16,
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

export default memo(CardImageList);
