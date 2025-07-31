import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { FooterMenu } from '../components/FooterMenu';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Header } from '../components/Header';
import { ItemMenu } from '../components/ItemMenu';
import LinearGradient from 'react-native-linear-gradient';

import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk, UserState } from '../slice/userSlice';
import { clearHotelBookings } from '../slice/hotelBookingSlice';
import { clearRestaurantBookings } from '../slice/restaurantBookingSlice';
import { AppDispatch } from '../store';

type MenuScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Menu'>;
};

const MenuScreen = ({ navigation }: MenuScreenProps) => {
  useEffect(() => {
    const start = performance.now();
    return () => {
      console.log(
        `[MenuScreen] mount -> ${(performance.now() - start).toFixed(2)}ms`,
      );
    };
  }, []);

  const dispatch = useDispatch<AppDispatch>();;
  const { isLogin, userInfo } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const type: { [key: string]: string } = {
    '1': 'Tiện ích',
    '2': 'Hỗ trợ',
    '3': 'Cài đặt',
  };

  const menu: { [key: string]: any[] } = {
    '1': [
      {
        icon: require('../../assets/img/icon/Main-menu.png'),
        text: 'Lộ trình của bạn',
        mustLogin: true,
        detail: 'RouteInMenu',
      },
      {
        icon: require('../../assets/img/icon/heart.png'),
        text: 'Điểm đến yêu thích',
        mustLogin: true,
        detail: 'HeartInMenu',
      },
      {
        icon: require('../../assets/img/icon/clipboard-text.png'),
        text: 'Đơn hàng',
        mustLogin: true,
        detail: 'OrderInMenu',
      },
      {
        icon: require('../../assets/img/icon/seal-percent.png'),
        text: 'Khuyến mãi',
        mustLogin: false,
        detail: 'PromotionInMenu',
      },
      {
        icon: require('../../assets/img/icon/cloud-sun.png'),
        text: 'Thời tiết',
        mustLogin: false,
        detail: 'WeatherInMenu',
      },
    ],
    '2': [
      {
        icon: require('../../assets/img/icon/phone.png'),
        text: 'Đội ngũ hỗ trợ',
        mustLogin: false,
        detail: 'SupportInMenu',
      },
      {
        icon: require('../../assets/img/icon/user-gear.png'),
        text: 'Liên hệ',
        mustLogin: false,
        detail: 'ContactInMenu',
      },
      {
        icon: require('../../assets/img/icon/chats-circle.png'),
        text: 'Gợi ý',
        mustLogin: false,
        detail: 'SuggestInMenu',
      },
    ],
    '3': [
      {
        icon: require('../../assets/img/icon/translate.png'),
        text: 'Ngôn ngữ',
        mustLogin: false,
        detail: 'LanguageInMenu',
      },
      {
        icon: require('../../assets/img/icon/share-network.png'),
        text: 'Chia sẻ ứng dụng',
        mustLogin: false,
        detail: 'ShareInMenu',
      },
      {
        icon: require('../../assets/img/icon/user-circle-minus.png'),
        text: 'Xoá tài khoản',
        mustLogin: true,
        detail: 'DeleteAccountInMenu',
      },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <ScrollView style={styles.container}>
        {/* Thông tin người dùng */}
        {isLogin && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                borderWidth: 0.25,
                borderColor: '#E8E8E8',
                shadowColor: '#919EAB1F',
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
              }}
            >
              <Image
                source={{ uri: userInfo.avt }}
                style={{
                  borderRadius: 1000,
                  height: 46,
                  width: 46,
                  marginRight: 16,
                }}
                resizeMode="cover"
              />
              <View style={{ alignItems: 'flex-start' }}>
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 24,
                  }}
                >
                  {userInfo.name}
                </Text>
                <Text
                  style={{
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: 18,
                    color: '#637381',
                  }}
                >
                  Xem thông tin người dùng
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {!isLogin && (
          <TouchableOpacity>
            <View
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                borderWidth: 0.25,
                borderColor: '#E8E8E8',
                shadowColor: '#919EAB1F',
                shadowOffset: {
                  width: 0,
                  height: 8,
                },

                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#81BA41',
                    marginRight: 16,
                    borderRadius: 1000,
                  }}
                >
                  <Image
                    source={require('../../assets/img/icon/user.png')}
                    style={{
                      height: 32,
                      width: 32,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={{
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 24,
                    flex: 1,
                    flexShrink: 1,
                  }}
                >
                  Dễ dàng quản lý chuyến đi, đơn hàng và nhận ưu đãi khi đăng
                  nhập.
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  borderTopWidth: 1,
                  borderColor: '#E0E0E0',
                  marginTop: 16,
                }}
                onPress={() => {
                  dispatch(logoutThunk());;
                  dispatch(clearRestaurantBookings());
                  dispatch(clearHotelBookings());
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
                }}
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
                    Đăng nhập ngay
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        {/* Danh mục */}
        {Object.entries(menu).map(([sectionKey, items]) => (
          <View style={{ paddingHorizontal: 16 }} key={sectionKey}>
            <Text style={styles.title}>{type[sectionKey]}</Text>
            <View style={{ gap: 16 }}>
              {items.map((item, index) => {
                if ((item.mustLogin && isLogin) || !item.mustLogin) {
                  return (
                    <ItemMenu
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      detail={item.detail}
                      mustLogin={item.mustLogin}
                      navigation={navigation}
                      isLogin={false}
                    />
                  );
                }
                return null;
              })}
            </View>
          </View>
        ))}
        {/* Nút đăng xuất */}
        {isLogin && (
          <TouchableOpacity
            style={{
              margin: 16,
            }}
            onPress={() => {
              dispatch(logoutThunk());;
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }}
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
                Đăng xuất
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        <View style={{ height: 125 }} />
      </ScrollView>
      <FooterMenu navigation={navigation} selected="menu" />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#fdfdfdff',
    paddingTop: 16,
    gap: 20,
  },
});
export default MenuScreen;
