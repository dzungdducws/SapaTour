import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
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
import { BookingHotelModel } from '../models/BookingHotelModel';
import { sttBooking } from '../dataraw';
import { RouteProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { ThongTinThanhToanModal } from '../components/ThongTinThanhToanModal';

type DetailInfoRestaurantBookingProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'DetailInfoRestaurantBooking'
  >;
  route: RouteProp<RootStackParamList, 'DetailInfoRestaurantBooking'>;
};

const DetailInfoRestaurantBookingScreen: React.FC<
  DetailInfoRestaurantBookingProps
> = ({ navigation, route }) => {
  const item = route.params?.item;
  const { userInfo, placeInfo } = item;

  const [visible, setVisible] = useState(false);

  const billTable = placeInfo.bill?.map(value => {
    return {
      label: value.name,
      quantity: value.quantity,
      price: value.price,
    };
  });

  const formatVNDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/img/bg/bg_header.png')}
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
          <Image
            source={require('../../assets/img/icon/caret-left.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 24,
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          Thông tin đặt
        </Text>
        <View style={{ width: 40, height: 1 }}></View>
      </ImageBackground>

      <ScrollView>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: sttBooking[item.status].bgcolor,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 22,
              color: sttBooking[item.status].color,
            }}
          >
            {sttBooking[item.status].text}
          </Text>
          <Text
            style={{
              fontWeight: 400,
              fontSize: 12,
              lineHeight: 18,
            }}
          >
            {sttBooking[item.status].desc[1]}
            {item.status === '6' && (
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  lineHeight: 18,
                }}
              >
                {' '}
                {item.timeUpdateStt3
                  ? new Date(item.timeUpdateStt3).toLocaleString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : ''}
              </Text>
            )}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 22,
              color: '#212B36',
              marginBottom: 12,
            }}
          >
            Thông tin nhận bàn
          </Text>
          <View
            style={{
              gap: 12,
              paddingBottom: 12,
              paddingTop: 32,
              paddingHorizontal: 12,

              flex: 1,
              padding: 12,
              borderRadius: 8,

              backgroundColor: '#fff',
              marginBottom: 16,

              borderWidth: 1,
              borderColor: 'rgba(145, 158, 171, 0.25)',
              elevation: 12,
              shadowColor: 'rgba(145, 158, 171, 0.70)',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 1,
              shadowRadius: 20,
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
                borderRadius: 4,
                borderBottomLeftRadius: 0,
                left: -4,
                top: -4,
                backgroundColor: '#81BA41',
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: -4,
                  width: 4,
                  height: 8,
                  borderBottomLeftRadius: 4,
                  backgroundColor: '#81BA41',
                }}
              ></TouchableOpacity>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#FFFFFF',
                }}
              >
                Mã booking: {item.idBooking}
              </Text>
            </TouchableOpacity>

            {[
              { label: 'Số điện thoại: ', value: userInfo.phone },
              { label: 'Họ và tên: ', value: userInfo.name },
              { label: 'Ghi chú: ', value: userInfo.note },
            ].map(({ label, value }, index) => (
              <Text
                key={index}
                style={{
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 22,
                  color: '#212B36',
                }}
              >
                {label}
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: 22,
                    color: '#212B36',
                  }}
                >
                  {' '}
                  {value}
                </Text>
              </Text>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontWeight: 600,
                fontSize: 14,
                lineHeight: 22,
                color: '#212B36',
              }}
            >
              Cơ sở ẩm thực
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/img/icon/phone-2.png')}
                style={{ height: 18, width: 18, marginRight: 8 }}
              />
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  lineHeight: 22,
                  color: '#81BA41',
                }}
              >
                Liên hệ
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              padding: 12,
              gap: 12,
              borderRadius: 8,

              backgroundColor: '#fff',
              marginBottom: 16,

              borderWidth: 1,
              borderColor: 'rgba(145, 158, 171, 0.25)',
              elevation: 12,
              shadowColor: 'rgba(145, 158, 171, 0.70)',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 1,
              shadowRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  flex: 1,
                  flexShrink: 1,
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('../../assets/img/icon/bulk0.png')}
                  style={{ width: 16, marginRight: 3, height: 16 }}
                ></Image>
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: 22,
                    flex: 1,
                    flexShrink: 1,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {placeInfo.name}
                </Text>
              </View>
              <Image
                source={require('../../assets/img/icon/right-chevron.png')}
                style={{ width: 18, height: 18 }}
              ></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderStyle: 'dashed',
                paddingBottom: 12,
                borderColor: '#919EAB3D',
              }}
            >
              <Image
                source={require('../../assets/img/icon/map-pin-nocolor.png')}
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 4,
                  tintColor: '#637381',
                }}
              />

              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  lineHeight: 18,
                  color: '#212B36',
                  flexShrink: 1,
                  flex: 1,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {placeInfo.address}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Image
                source={placeInfo.image}
                style={{ width: 74, height: 74, marginRight: 12 }}
              ></Image>
              <View style={{ justifyContent: 'space-between' }}>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
                >
                  <Text
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: 22,
                      color: '#212B36',
                    }}
                  >
                    Ngày nhận bàn:{' '}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      lineHeight: 22,
                    }}
                  >
                    {formatVNDate(placeInfo.dayStart)}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
                >
                  <Text
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: 22,
                      color: '#212B36',
                    }}
                  >
                    Giờ dùng bữa:{' '}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      lineHeight: 22,
                    }}
                  >
                    {placeInfo.timeStart}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
                >
                  <Text
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: 22,
                      color: '#212B36',
                    }}
                  >
                    Số lượng người:{' '}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      lineHeight: 22,
                    }}
                  >
                    {placeInfo.numberOfPeople}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {item.status !== '6' && (
          <View style={{ paddingHorizontal: 16 }}>
            <Text
              style={{
                fontWeight: 600,
                fontSize: 14,
                lineHeight: 22,
                color: '#212B36',
                marginBottom: 12,
              }}
            >
              Hóa đơn
            </Text>
            <View
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 8,

                backgroundColor: '#fff',
                marginBottom: 16,

                borderWidth: 1,
                borderColor: 'rgba(145, 158, 171, 0.25)',
                elevation: 12,
                shadowColor: 'rgba(145, 158, 171, 0.70)',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 1,
                shadowRadius: 20,
              }}
            >
              {[
                { label: 'Tên Món', quantity: 'Slg', price: 'Tổng tiền' },
                ...(billTable ?? []),
              ].map(({ label, quantity, price }, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 6,
                    borderBottomWidth:
                      index === (billTable?.length ?? 0) ? 0 : 1,
                    borderStyle: 'dashed',
                    borderColor: '#919EAB3D',
                  }}
                >
                  <View style={{ width: '60%' }}>
                    <Text
                      style={{
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: 22,
                        color: '#212B36',
                        textAlign: 'left',
                      }}
                    >
                      {label}
                    </Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Text
                      style={{
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: 22,
                        color: '#212B36',
                        textAlign: 'center',
                      }}
                    >
                      {quantity}
                    </Text>
                  </View>
                  <View style={{ width: '30%' }}>
                    <Text
                      style={{
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: 22,
                        color: '#212B36',
                        textAlign: 'right',
                      }}
                    >
                      {typeof price === 'number'
                        ? `${price.toLocaleString('de-DE')}`
                        : price}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 22,
              color: '#212B36',
              marginBottom: 12,
            }}
          >
            Chi tiết thanh toán
          </Text>
          <View
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,

              backgroundColor: '#fff',
              marginBottom: 16,

              borderWidth: 1,
              borderColor: 'rgba(145, 158, 171, 0.25)',
              elevation: 12,
              shadowColor: 'rgba(145, 158, 171, 0.70)',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 1,
              shadowRadius: 20,
            }}
          >
            {[
              {
                label: 'Tiền món ăn: ',
                value: placeInfo.totalBill,
                isFinal: false,
              },

              {
                label: 'Chiết khấu: ',
                value: placeInfo.totalDiscount ? placeInfo.totalDiscount : 0,
                isFinal: false,
              },
              {
                label: 'Tổng tiền: ',
                value: placeInfo.totalPrice ? placeInfo.totalPrice : 0,
                isFinal: true,
              },
            ].map(({ label, value, isFinal }, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 6,
                  borderBottomWidth: !isFinal ? 1 : 0,
                  borderStyle: 'dashed',
                  borderColor: '#919EAB3D',
                }}
              >
                <View style={{ width: '50%' }}>
                  <Text
                    style={{
                      fontWeight: isFinal ? 600 : 400,
                      fontSize: isFinal ? 16 : 14,
                      lineHeight: isFinal ? 24 : 22,
                      color: '#212B36',
                      textAlign: 'left',
                    }}
                  >
                    {label}
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text
                    style={{
                      fontWeight: isFinal ? 600 : 400,
                      fontSize: isFinal ? 16 : 14,
                      lineHeight: isFinal ? 24 : 22,
                      color: '#212B36',
                      textAlign: 'right',
                    }}
                  >
                    {value.toLocaleString('de-DE')} VND
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {item.status !== '6' && (
          <TouchableOpacity
            style={{
              borderColor: '#E0E0E0',
              marginBottom: 16,
              marginHorizontal: 16,
            }}
            onPress={() => {
              setVisible(true);
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
                {['1', '2', '3', '4.1'].includes(item.status)
                  ? 'Thông tin thanh toán'
                  : 'Đánh giá ngay'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {['1', '2', '3'].includes(item.status) && (
          <TouchableOpacity
            style={{
              borderColor: '#FF4842',
              borderRadius: 6,
              borderWidth: 1,
              borderBlockColor: '#FF4842',
              marginBottom: 16,
              marginHorizontal: 16,
              paddingVertical: 6,
              paddingHorizontal: 16,
            }}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text
              style={{
                color: '#FF4842',
                fontSize: 15,
                fontWeight: '700',
                lineHeight: 26,
                letterSpacing: 0,
                textAlign: 'center',
              }}
            >
              Huỷ đặt bàn
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <ThongTinThanhToanModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      ></ThongTinThanhToanModal>
    </View>
  );
};
export default DetailInfoRestaurantBookingScreen;
