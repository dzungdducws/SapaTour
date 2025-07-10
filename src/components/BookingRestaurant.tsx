import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { BookingRestaurantModel } from '../models/BookingRestaurantModel';
import { sttBooking } from '../dataraw';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  item: BookingRestaurantModel;
};
export const BookingRestaurantInList: React.FC<Props> = ({
  navigation,
  item,
}) => {
  const { placeInfo, userInfo } = item;

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderStyle: 'dashed',
          paddingBottom: 12,
          borderColor: '#919EAB3D',
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
            navigation.navigate('DetailInfoRestaurantBooking', {
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

      <View style={{ flexDirection: 'row' }}>
        <Image
          source={placeInfo.image}
          style={{ width: 100, height: 100, marginRight: 12 }}
        ></Image>
        <View style={{ justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
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
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
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
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
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
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 22,
                color: '#212B36',
              }}
            >
              Thanh toán:{' '}
            </Text>
            <Text
              style={{
                fontWeight: 600,
                fontSize: 14,
                lineHeight: 22,
                color: '#81BA41',
              }}
            >
              {placeInfo.totalPrice.toLocaleString('de-DE')} VND
            </Text>
          </View>
        </View>
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
      </View>
    </View>
  );
};
