import { View } from 'react-native';
import ImageLocation from './ImageLocation';
import { Location } from '../slice/locationSlice';
import { memo } from 'react';

type ImageLocationListProps = {
  locations: Location[];
};

const ImageLocationList = ({ locations }: ImageLocationListProps) => {
  return locations?.map((item, index) => (
    <View
      key={index}
      style={{ width: index === 0 ? '100%' : '48%', marginBottom: 8 }}
    >
      <ImageLocation
        rate={item.rate}
        name={item.name}
        location={item.location}
        image={item.image}
      />
    </View>
  ));
};

export default memo(ImageLocationList);
