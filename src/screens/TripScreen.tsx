import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FooterMenu } from '../components/FooterMenu';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Header } from '../components/Header';

import { RangePickerModal } from '../components/RangePickerModal';
import { useUser } from '../hooks/useUser';
import LinearGradient from 'react-native-linear-gradient';

import { list } from '../dataraw';
import { BookingHotelInList } from '../components/BookingHotel';
import { BookingRestaurantInList } from '../components/BookingRestaurant';
import { BookingHotelModel } from '../models/BookingHotelModel';
import { BookingRestaurantModel } from '../models/BookingRestaurantModel';
import { ThongTinThanhToanModal } from '../components/ThongTinThanhToanModal';

type TripScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Trip'>;
};

const TripScreen = ({ navigation }: TripScreenProps) => {
  const { user, logout } = useUser();

  const [selectedStatus, setSelectedStatus] = useState<number>(0);
  const [selectedDiscovery, setSelectedDiscovery] = useState<number>(0);

  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: string;
    end: string;
  } | null>(null);

  const status: { [key: string]: { title: string } } = {
    0: {
      title: 'Sắp tới',
    },
    1: { title: 'Hoàn tất' },
    2: { title: 'Đã hủy ' },
  };

  const chooseStatus: { [key: string]: string[] } = {
    '0': ['1', '2', '3', '4', '4.1'],
    '1': ['5'],
    '2': ['6'],
  };

  const chooseDiscovery: { [key: string]: string[] } = {
    '0': ['1', '2'],
    '1': ['1'],
    '2': ['2'],
  };

  const widthPercent: number =
    Object.keys(status).length === 0 ? 1 : 1 / Object.keys(status).length;

  const discovery_location = {
    0: {
      title: 'Tất cả',
      icon: null,
    },
    1: {
      title: 'Địa điểm lưu trú',
      icon: require('../../assets/img/icon/bulk0.png'),
    },
    2: {
      title: 'Địa điểm ẩm thực',
      icon: require('../../assets/img/icon/bulk.png'),
    },
  };

  const question_recommend = {
    0: {
      text: 'Bạn cần tìm địa điểm du lịch?',
      icon: require('../../assets/img/icon/Map-Point.png'),
      colorBg: '#EEF4FA',
    },
    1: {
      text: 'Bạn cần tìm địa điểm lưu trú?',
      icon: require('../../assets/img/icon/buildings-2.png'),
      colorBg: '#EBF6EA',
    },
    2: {
      text: 'Bạn cần tìm địa điểm ẩm thực?',
      icon: require('../../assets/img/icon/Building.png'),
      colorBg: '#FBEEEE',
    },
  };

  const formatVNDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 16,
          backgroundColor: '#fff',
        }}
      >
        <TouchableOpacity onPress={() => setShowModal1(!showModal1)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderRadius: 8,
              borderWidth: 0.25,
              backgroundColor: '#f3f3f3',
              borderColor: '#E8E8E8',
              shadowColor: '#919EAB1F',
              shadowOffset: {
                width: 0,
                height: 8,
              },

              elevation: 2,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../assets/img/icon/calendar-blank.png')}
                style={{ width: 24, height: 24, marginRight: 10 }}
                resizeMode="contain"
              />
              {selectedRange && (
                <Text
                  style={{
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 24,
                    textAlign: 'left',
                  }}
                >
                  {formatVNDate(selectedRange.start)} -{' '}
                  {formatVNDate(selectedRange.end)}
                </Text>
              )}
              {!selectedRange && (
                <Text
                  style={{
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: 24,
                    textAlign: 'left',
                    color: '#919EAB',
                  }}
                >
                  Khoảng ngày
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: -16,
            marginVertical: 8,
          }}
        >
          {Object.entries(status).map(([key, value], index) => (
            <TouchableOpacity
              key={index}
              style={{
                paddingHorizontal: 8,
                paddingBottom: 5,
                borderBottomWidth: selectedStatus === Number(key) ? 1 : 0,
                borderBottomColor: '#81BA41',
                flex: widthPercent,
              }}
              onPress={() => setSelectedStatus(Number(key))}
            >
              <Text
                style={{
                  fontWeight: selectedStatus === Number(key) ? 600 : 400,
                  fontSize: 12,
                  lineHeight: 18,
                  color: selectedStatus === Number(key) ? '#81BA41' : '#000000',
                  textAlign: 'center',
                }}
              >
                {value.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView
          style={{
            paddingVertical: 2,
            marginHorizontal: -16,
            paddingLeft: 16,
            backgroundColor: '#f3f3f3',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {Object.entries(discovery_location).map(([key, value], index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedDiscovery(Number(key))}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 50,
                backgroundColor:
                  selectedDiscovery === Number(key) ? '#81BA41' : '#919EAB29',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {value.icon && (
                <Image
                  source={value.icon}
                  resizeMode="contain"
                  style={{
                    width: 16,
                    height: 16,
                    tintColor:
                      selectedDiscovery === Number(key) ? '#ffffff' : '#000000',
                  }}
                ></Image>
              )}
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 22,
                  fontWeight: 400,
                  color:
                    selectedDiscovery === Number(key) ? '#ffffff' : '#000000',
                }}
              >
                {value.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}
      >
        {!user || user.password === '0' ? (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../assets/img/img-trip.png')}
              style={{
                width: 137.730224609375,
                height: 133.13356018066406,
                marginVertical: 28,
              }}
            />
            <Text
              style={{
                fontWeight: 600,
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              Quý khách không có đặt chỗ nào{' '}
              {status[String(selectedStatus)].title.toLowerCase()}
            </Text>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 12,
                lineHeight: 18,
                color: '#637381',
              }}
            >
              {!user
                ? `Đăng nhập hoặc tạo tài khoản để bắt đầu.`
                : 'Lên kế hoạch cho chuyến đi tiếp theo!'}
            </Text>
            {!user ? (
              <TouchableOpacity
                style={{
                  borderTopWidth: 1,
                  borderColor: '#E0E0E0',
                  marginTop: 16,
                }}
                onPress={() => {
                  if (logout) {
                    logout();
                  }
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
            ) : (
              <View
                style={{
                  marginTop: 32,
                  flexDirection: 'row',
                  gap: 16,
                  justifyContent: 'space-between',
                }}
              >
                {Object.values(question_recommend).map((value, index) => (
                  <View
                    key={index}
                    style={{
                      width: '30%',
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: '#919EAB3D',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: value.colorBg,
                        paddingHorizontal: 32,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        source={value.icon}
                        style={{ width: 32, height: 32 }}
                      ></Image>
                    </View>
                    <View
                      style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: 400,
                          fontSize: 12,
                          lineHeight: 18,
                          textAlign: 'center',
                        }}
                        numberOfLines={2}
                      >
                        {value.text}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View>
            {Object.entries(list).map(([key, value], index) => (
              <View key={index}>
                {value.map(
                  (item, _index) =>
                    chooseDiscovery[String(selectedDiscovery)].includes(
                      item.type,
                    ) &&
                    chooseStatus[String(selectedStatus)].includes(
                      item.status,
                    ) &&
                    (item.type === '1' ? (
                      <BookingHotelInList
                        navigation={navigation}
                        onPressThongTinThanhToan={() => {
                          setShowModal2(true), console.log(showModal2);
                        }}
                        key={_index}
                        item={item as BookingHotelModel}
                      />
                    ) : (
                      <BookingRestaurantInList
                        navigation={navigation}
                        key={_index}
                        item={item as BookingRestaurantModel}
                      />
                    )),
                )}
              </View>
            ))}
          </View>
        )}
        <View style={{ height: 120 }}></View>
      </ScrollView>

      <FooterMenu navigation={navigation} selected={'trip'} />
      <RangePickerModal
        visible={showModal1}
        onClose={() => setShowModal1(false)}
        onConfirm={(start, end) => {
          setSelectedRange({ start, end });
          setShowModal1(false);
        }}
      />
      <ThongTinThanhToanModal
        visible={showModal2}
        onClose={() => {
          setShowModal2(false);
        }}
      ></ThongTinThanhToanModal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  horizontalScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
});
export default TripScreen;
