import React from 'react';
import { View, StyleSheet, ImageBackground, Text, Image } from 'react-native';

type CardImageLocationProps = {
  rating: number;
  name: string;
  location: string;
  sourceImg: string;
};

export const CardImageLocation: React.FC<CardImageLocationProps> = ({
  rating,
  name,
  location,
  sourceImg,
}) => {
  const AllSourceImg: any = {
    1: require('../../assets/img/location/1.png'),
    2: require('../../assets/img/location/2.png'),
    3: require('../../assets/img/location/3.png'),
    4: require('../../assets/img/location/4.png'),
    5: require('../../assets/img/location/5.png'),
  };

  const _sourceImg =
    AllSourceImg[sourceImg] || require('../../assets/img/location/1.png');

  const star = require('../../assets/img/icon/star.png');
  const half_star = require('../../assets/img/icon/half-star.png');
  const empty_star = require('../../assets/img/icon/empty-star.png');

  const renderStars = (rating: number) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(star);
      } else if (i < rating) {
        stars.push(half_star);
      } else {
        stars.push(empty_star);
      }
    }

    return stars.map((icon, index) => (
      <Image
        key={index}
        source={icon}
        style={{ width: 12, height: 12, marginRight: 4 }}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Image
        source={_sourceImg}
        style={{
          width: 200,
          height: 130,
          borderRadius: 4,
          marginBottom: 8,
        }}
        resizeMode="cover"
      />

      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
      >
        <Image
          source={require('../../assets/img/icon/map-pin-nocolor.png')}
          style={{
            width: 12,
            height: 12,
            marginRight: 4,
            tintColor: '#637381',
          }}
        />
        <Text
          style={{
            fontSize: 10,
            fontWeight: '400',
            color: '#333',
            flexShrink: 1,
            flex: 1,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {location}
        </Text>
      </View>

      <Text style={{ fontSize: 12, fontWeight: '500', color: '#111' }}>
        {name}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {renderStars(rating)}
        <Text style={{ fontSize: 10, fontWeight: '400', color: '#637381' }}>
          {rating}/5
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 202,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 12,
  },
});
