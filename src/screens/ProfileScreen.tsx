// src/screens/ProfileScreen.tsx
import React from 'react';
import {
  Text,
  View,
  Button,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
  route: RouteProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const caret_left = require('../../assets/img/icon/caret-left.png');
  const pencil_simple_line = require('../../assets/img/icon/pencil-simple-line.png');
  const bg_header = require('../../assets/img/bg/bg_header.png');

  const info = {
    name: {
      title: 'Họ tên',
      value: 'Nguyễn Văn A',
    },
    nationality: {
      title: 'Quốc tịch',
      value: 'Việt Nam',
    },
    phone: {
      title: 'Số điện thoại',
      value: '0123456789',
    },
    email: {
      title: 'Email',
      value: 'nguyenvana@gmail.com',
    },
    address: {
      title: 'Địa chỉ',
      value: 'Hà Nội',
    },
    birth: {
      title: 'Ngày sinh',
      value: '01/01/2000',
    },
  };

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
          }}
        >
          Thông tin người dùng
        </Text>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={pencil_simple_line}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </ImageBackground>
      <ScrollView style={{ padding: 16 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/img/avt.jpg')}
            style={{
              borderRadius: 1000,
              height: 150,
              width: 150,
              marginBottom: 32,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={{ gap: 16 }}>
          {Object.entries(info).map(([sectionKey, items]) => {
            return (
              <View
                key={sectionKey}
                style={{
                  gap: 16,
                  flexDirection: 'row',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 16,
                  overflow: 'hidden',
                  backgroundColor: '#F4F6F8',
                }}
              >
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 24,
                    width: '40%',
                  }}
                >
                  {items.title}
                </Text>
                <Text
                  style={{
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 24,
                    width: '60%',
                  }}
                >
                  {items.value}
                </Text>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          style={{
            borderTopWidth: 1,
            borderColor: '#E0E0E0',
            marginTop: 16,
          }}
          onPress={() => {}}
        >
          <LinearGradient
            colors={['#80B941', '#65A438', '#4A9341']} // tùy chỉnh màu gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 6,
              paddingVertical: 6,
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '700',
                lineHeight: 26,
                letterSpacing: 0,
                textAlign: 'center',
              }}
            >
              Đổi mật khẩu
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{ height: 120 }}></View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
