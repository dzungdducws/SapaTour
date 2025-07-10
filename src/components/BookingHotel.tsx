import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { BookingHotelModel } from '../models/BookingHotelModel';
import { sttBooking } from '../dataraw';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  item: BookingHotelModel;
  onPressThongTinThanhToan: () => void;
};

export const BookingHotelInList: React.FC<Props> = ({
  navigation,
  item,
  onPressThongTinThanhToan,
}) => {
  const { userInfo, placeInfo } = item;

  const diffDate = (): number => {
    const s = new Date(placeInfo.dayStart);
    const e = new Date(placeInfo.dayEnd);

    const diffTime = Math.abs(e.getTime() - s.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const formatVNDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 14,
            lineHeight: 22,
          }}
        >
          Mã booking: {item.idBooking}
        </Text>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 12,
            lineHeight: 18,
            color: sttBooking[item.status.toString()].color,
          }}
        >
          {sttBooking[item.status.toString()].text}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
            style={{ width: 20, height: 20 }}
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailInfoHotelBooking', {
              navigation,
              item,
            })
          }
        >
          <Image
            source={require('../../assets/img/icon/info.png')}
            style={{ width: 24, height: 24, marginLeft: 10 }}
          ></Image>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderStyle: 'dashed',
          paddingBottom: 12,
          borderColor: '#919EAB3D',
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
            {formatVNDate(placeInfo.dayStart)}
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 4,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: '#919EAB29',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontWeight: 400,
              fontSize: 12,
              lineHeight: 18,
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
            {formatVNDate(placeInfo.dayEnd)}
          </Text>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        {placeInfo.rooms.map((value, index) => (
          <View key={index} style={{ flexDirection: 'row' }}>
            <Image
              source={value.image}
              style={{ width: 48, height: 48, marginRight: 8 }}
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
                numberOfLines={1}
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
                    {value.theNumOfRoom}
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: 400,
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

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 22,
          }}
        >
          Tổng thanh toán:
        </Text>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 14,
            lineHeight: 22,
            color: '#81BA41',
          }}
        >
          {(2300000).toLocaleString('de-DE')}VNDD
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          borderBottomWidth: 1,
          borderStyle: 'dashed',
          paddingBottom: 12,
          borderColor: '#919EAB3D',
        }}
      >
        <Text
          style={{
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 22,
            color: '#FF4842',
          }}
        >
          *{' '}
        </Text>
        <Text
          style={{
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 22,
          }}
        >
          Ghi chú: {userInfo.note}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          onPress={() => onPressThongTinThanhToan()}
        >
          <Image
            source={require('../../assets/img/icon/money.png')}
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
            Thông tin thanh toán
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
