import { memo } from 'react';
import { Location } from '../slice/locationSlice';
import CardImageLocation from './CardImageLocation';
import { FlatList } from 'react-native';

type CardImageLocationListProps = {
  locations: Location[];
};

const CardImageLocationList = ({ locations }: CardImageLocationListProps) => {
  console.log('re render list');

  return (
    <FlatList
      data={locations}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => `${item.id}_${index}`}
      renderItem={({ item }) => (
        <CardImageLocation
          rate={item.rate}
          name={item.name}
          location={item.location}
          image={item.image}
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

export default memo(CardImageLocationList);
