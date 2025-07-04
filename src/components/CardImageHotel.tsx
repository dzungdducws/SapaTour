import React from 'react';
import { View, StyleSheet, ImageBackground, Text, Image } from 'react-native';

type CardImageHotelProps = {
  starNumber: number;
  rating: number;
  name: string;
  location: string;
  sourceImg: string;
  price: number;
};

export const CardImageHotel: React.FC<CardImageHotelProps> = ({
  rating,
  name,
  location,
  sourceImg,
  price,
  starNumber,
}) => {
  const AllSourceImg: any = {
    1: require('../../assets/img/hotel/1.png'),
  };

  const _sourceImg =
    AllSourceImg[sourceImg] || require('../../assets/img/hotel/1.png');
  const starIcon = require('../../assets/img/icon/star.png');
  const map_pin_nocolor = require('../../assets/img/icon/map-pin-nocolor.png');

  const renterTextRating = (rating: number) => {
    if (rating >= 4.5) {
      return 'Xuất sắc';
    } else if (rating >= 3.5) {
      return 'Tốt';
    } else if (rating >= 2.5) {
      return 'Trung bình';
    } else if (rating >= 1) {
      return 'Không tốt';
    } else if (rating > 0) {
      return 'Kém';
    }
    return 'Không có đánh giá';
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

      <Text style={{ fontSize: 12, fontWeight: '500', color: '#111' }}>
        {name}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 4,
        }}
      >
        <Text
          style={{
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 18,
          }}
        >
          Hạng sao:
        </Text>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 50,
            backgroundColor: '#FFBF00',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 600,
              fontSize: 12,
              lineHeight: 18,
            }}
          >
            {starNumber}
          </Text>
          <Image
            source={starIcon}
            style={{
              width: 12,
              height: 12,
              tintColor: 'white',
            }}
          />
        </View>
      </View>

      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
      >
        <Image
          source={map_pin_nocolor}
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

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 2,
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 8,
            backgroundColor: '#81BA41',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 600,
              fontSize: 12,
              lineHeight: 18,
            }}
          >
            {rating}
          </Text>
        </View>

        <Text
          style={{
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 18,
          }}
        >
          {renterTextRating(rating)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 4,
        }}
      >
        <Text
          style={{
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 18,
          }}
        >
          Giá chỉ từ:
        </Text>

        <Text
          style={{
            color: '#FF4842',
            fontWeight: 600,
            fontSize: 14,
            lineHeight: 22,
          }}
        >
          {price.toLocaleString('de-DE')} VND
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
    gap: 4,
  },
});
