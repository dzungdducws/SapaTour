import React from 'react';
import { View, StyleSheet, ImageBackground, Text, Image } from 'react-native';

type ImageLocationProps = {
  rating: number;
  name: string;
  location: string;
  sourceImg: string;
};

export const ImageLocation: React.FC<ImageLocationProps> = ({
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={_sourceImg}
        style={styles.image}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.ratingBox}>
          <Image
            source={require('../../assets/img/icon/star.png')}
            style={[styles.icon, { tintColor: '#FFBF00', marginRight: 2 }]}
          />
          <Text style={styles.ratingText}>{rating}/5</Text>
        </View>
        <View style={styles.overlay}>
          <Text style={styles.nameText} numberOfLines={1} >
            {name}
          </Text>
          <View style={styles.row}>
            <Image
              source={require('../../assets/img/icon/map-pin-nocolor.png')}
              style={styles.icon}
            />
            <Text style={styles.locationText} numberOfLines={1}>
              {location}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 2,
    overflow: 'hidden',
  },
  ratingBox: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#00000066',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    color:"white",
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 4,
    tintColor: '#fff',
  },
  locationText: {
    fontSize: 10,
    color: '#fff',
    flexShrink: 1,
  },
  nameText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
});
