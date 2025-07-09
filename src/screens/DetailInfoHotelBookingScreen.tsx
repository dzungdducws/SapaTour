import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FooterMenu } from '../components/FooterMenu';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Header } from '../components/Header';
import { BookingHotelModel } from '../models/BookingHotelModel';

type MapScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'DetailInfoHotelBooking'
  >;
  item: BookingHotelModel;
};

const DetailInfoHotelBookingScreen = ({ navigation, item }: MapScreenProps) => {
  const bg_header = require('../../assets/img/bg/bg_header.png');
  const caret_left = require('../../assets/img/icon/caret-left.png');

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={bg_header}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingBottom: 16,
          paddingTop: 32,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={caret_left} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 24,
            color: '#ffffff',
            textAlign: 'center'
          }}
        >
          Thông tin đặt phòng   
        </Text>
        
      </ImageBackground>
    </View>
  );
};
export default DetailInfoHotelBookingScreen;
