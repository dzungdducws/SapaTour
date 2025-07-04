// src/screens/HomeScreen.tsx
import React from 'react';
import { Text, Image, View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { CusItemMenu } from '../components/CusItemMenu';
import { ImageLocation } from '../components/ImageLocation';
import { CardImageLocation } from '../components/CardImageLocation';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const Menu = [
    {
      sourceIcon: 'Map-Point',
      Title: 'Địa điểm\ndu lịch',
      colorBg: '#EEF4FA',
    },
    {
      sourceIcon: 'Building',
      Title: 'Địa điểm\nẩm thực',
      colorBg: '#FBEEEE',
    },
    {
      sourceIcon: 'buildings-2',
      Title: 'Địa điểm\nnghỉ dưỡng',
      colorBg: '#EBF6EA',
    },
    {
      sourceIcon: 'shopping-cart',
      Title: 'Gian hàng\ntrực tuyến',
      colorBg: '#FDF2EA',
    },
    {
      sourceIcon: 'fi_18472616',
      Title: 'Tất cả\ndanh mục',
      colorBg: '#F0F7E8',
    },
  ];

  const location = [
    {
      rating: 5,
      name: 'Phan Si Păng',
      location: 'SaPa, Lào Cai',
      sourceImg: '1',
    },
    {
      rating: 4.7,
      name: 'Đồi chè trái tim',
      location: 'Bản Ôn, thị trấn Nông Trường Mộc Châu, H. Mộc Châu, Sơn La',
      sourceImg: '2',
    },
    {
      rating: 4.5,
      name: 'Rừng thông bản Áng',
      location: 'Bản Áng, xã Đông Sang, H. Mộc Châu, Sơn La',
      sourceImg: '3',
    },
    {
      rating: 4.2,
      name: 'Thác Tạt Nàng',
      location: '6 Cũ, Chiềng Iêng, Mộc Châu, Sơn La',
      sourceImg: '4',
    },
    {
      rating: 3,
      name: 'Cầu kính tình yêu',
      location: 'Mường Sang, Mộc Châu, Sơn La',
      sourceImg: '5',
    },
  ];
  const hotel = [
    {
      rating: 5,
      name: 'Silk Path Grand Sapa Resort & Spa',
      location: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
      sourceImg: '1',
      price: '1000000'
    },
    
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            {Menu.map((item, index) => (
              <CusItemMenu
                key={index}
                index={index}
                sourceIcon={item.sourceIcon}
                Title={item.Title}
                colorBg={item.colorBg}
              />
            ))}
          </View>
        </View>

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              gap: 8,
            }}
          >
            {location.map((item, index) => (
              <View key={index} style={{ width: index === 0 ? '100%' : '48%' }}>
                <ImageLocation
                  rating={item.rating}
                  name={item.name}
                  location={item.location}
                  sourceImg={item.sourceImg}
                />
              </View>
            ))}
          </View>
        </View>

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ScrollView
            horizontal={true}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: 16,
              gap: 8,
            }}
          >
            {location.map((item, index) => (
              <View key={index}>
                <CardImageLocation
                  rating={item.rating}
                  name={item.name}
                  location={item.location}
                  sourceImg={item.sourceImg}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: '60%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default HomeScreen;
