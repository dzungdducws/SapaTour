import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import LinearGradient from 'react-native-linear-gradient';
import { InformationPayModal } from '../components/InformationPayModal';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../slice/userSlice';
import { formatVNDate } from '../utils/utils';
import { StatusState } from '../slice/statusSlice';
import { clearHotelBooking, DetailInfoHotelBookingState } from '../slice/detailInfoHotelBooking';

type DetailInfoHotelBookingProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'DetailInfoHotelBooking'
  >;
};

const DetailInfoHotelBookingScreen: React.FC<DetailInfoHotelBookingProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();

  const hotel_booking = useSelector(
    (state: { detailInfoHotelBooking: DetailInfoHotelBookingState }) =>
      state.detailInfoHotelBooking.hotel_booking,
  );
  const { rooms, services } = hotel_booking
    ? hotel_booking
    : {
        rooms: [],
        services: [],
      };
  const { isLogin, userInfo } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const { statusInfo } = useSelector(
    (state: { status: StatusState }) => state.status,
  );
  const sI = statusInfo[1].list;

  const [visible, setVisible] = useState(false);

  const servicesTable = services?.map(value => {
    return {
      label: value.name,
      quantity: value.quantity,
      price: value.price,
    };
  });

  const diffDate = (): number => {
    const s = new Date(hotel_booking?.check_in_date || '');
    const e = new Date(hotel_booking?.check_out_date || '');

    const diffTime = Math.abs(e.getTime() - s.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
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
            dispatch(clearHotelBooking());
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
          Thông tin đặt phòng
        </Text>
        <View style={{ width: 40, height: 1 }}></View>
      </ImageBackground>

      <ScrollView>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: sI[(hotel_booking?.status || 0) - 1].bgcolor,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 22,
              color: sI[(hotel_booking?.status || 0) - 1].color,
            }}
          >
            {sI[(hotel_booking?.status || 0) - 1].name}
          </Text>
          <Text
            style={{
              fontWeight: 400,
              fontSize: 12,
              lineHeight: 18,
            }}
          >
            {sI[(hotel_booking?.status || 0) - 1].description}
            {hotel_booking?.status === 6 && (
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  lineHeight: 18,
                }}
              >
                {' '}
                {hotel_booking?.updated_at
                  ? new Date(hotel_booking?.updated_at).toLocaleString(
                      'vi-VN',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      },
                    )
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
            Thông tin nhận phòng
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
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Mã booking: {hotel_booking?.id}
              </Text>
            </TouchableOpacity>

            {[
              { label: 'Số điện thoại: ', value: userInfo.phone },
              { label: 'Họ và tên: ', value: userInfo.name },
              { label: 'Ghi chú: ', value: hotel_booking?.note },
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
              Phòng của bạn
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
                  {hotel_booking?.name}
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
                {hotel_booking?.location}
              </Text>
            </View>

            <View
              style={{
                gap: 12,
                borderBottomWidth: 1,
                borderStyle: 'dashed',
                paddingBottom: 12,
                borderColor: '#919EAB3D',
              }}
            >
              {rooms.map((value, index) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                  <Image
                    source={{ uri: value.image }}
                    style={{ width: 70, height: 70, marginRight: 8 }}
                  ></Image>
                  <View
                    style={{
                      flex: 1,
                      flexShrink: 1,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 14,
                        lineHeight: 22,
                      }}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {value.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 14,
                            lineHeight: 22,
                            color: '#212B36',
                          }}
                        >
                          Số phòng:{' '}
                        </Text>
                        <Text
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            lineHeight: 22,
                          }}
                        >
                          {value.numberOfRoom}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          lineHeight: 22,
                          color: '#212B36',
                        }}
                      >
                        {value.price.toLocaleString('de-DE')} VND
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: 18,
                  }}
                >
                  Nhận phòng
                </Text>
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: 22,
                  }}
                >
                  {formatVNDate(hotel_booking?.check_in_date || '')}
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor: '#81BA41',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 12,
                    lineHeight: 18,
                    color: '#FFFFFF',
                  }}
                >
                  {diffDate() - 1} đêm
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: 18,
                  }}
                >
                  Trả phòng
                </Text>
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: 22,
                  }}
                >
                  {formatVNDate(hotel_booking?.check_out_date || '')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {hotel_booking?.status !== 6 &&
          hotel_booking?.services !== undefined &&
          hotel_booking?.services?.length !== 0 && (
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
                Dịch vụ đã sử dụng
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
                  { label: 'Tên dịnh vụ', quantity: 'Slg', price: 'Tổng tiền' },
                  ...(servicesTable ?? []),
                ].map(({ label, quantity, price }, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 6,
                      borderBottomWidth:
                        index === (servicesTable?.length ?? 0) ? 0 : 1,
                      borderStyle: 'dashed',
                      borderColor: '#919EAB3D',
                    }}
                  >
                    <View style={{ width: '40%' }}>
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
                    <View style={{ width: '20%' }}>
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
                    <View style={{ width: '40%' }}>
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
        {hotel_booking?.status !== 6 && (
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
                  label: 'Tiền phòng: ',
                  value: hotel_booking?.totalPriceRoom,
                  isFinal: false,
                },
                {
                  label: 'Tiền dịch vụ: ',
                  value: hotel_booking?.totalPriceService,
                  isFinal: false,
                },
                {
                  label: 'Chiết khấu: ',
                  value: 0,
                  isFinal: false,
                },
                {
                  label: 'Tổng tiền: ',
                  value: hotel_booking?.totalPrice,
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
                      {typeof value === 'number'
                        ? `${value.toLocaleString('de-DE')} VND`
                        : value}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        {hotel_booking?.status !== 6 && (
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
                {['1', '2', '3', '4'].includes(
                  hotel_booking?.status?.toString() || '',
                )
                  ? 'Thông tin thanh toán'
                  : 'Đánh giá ngay'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {['1', '2', '3'].includes(hotel_booking?.status?.toString() || '') && (
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
              Huỷ đặt phòng
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <InformationPayModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      ></InformationPayModal>
    </View>
  );
};
export default DetailInfoHotelBookingScreen;
