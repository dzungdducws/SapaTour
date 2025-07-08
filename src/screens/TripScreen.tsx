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

type TripScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Trip'>;
};

const TripScreen = ({ navigation }: TripScreenProps) => {
  const [selected, setSelected] = useState<string>('Tất cả');
  const [showModal, setShowModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: string;
    end: string;
  } | null>(null);

  const discovery_location = {
    0: {
      title: 'Tất cả',
      icon: null,
    },
    1: {
      title: 'Địa điểm lưu trú',
      icon: require('../../assets/img/icon/buildings-2.png'),
    },
    2: {
      title: 'Địa điểm ẩm thực',
      icon: require('../../assets/img/icon/buildings-3.png'),
    },
  };

  const formatVNDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <View style={{ padding: 16, gap: 16 }}>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 12,
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
                  }}
                >
                  Khoảng ngày
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>

        <RangePickerModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={(start, end) => {
            setSelectedRange({ start, end });
            setShowModal(false);
          }}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {Object.entries(discovery_location).map(([key, value], index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelected(value.title)}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 50,
                backgroundColor:
                  selected === value.title ? '#81BA41' : '#919EAB29',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {value.icon && (
                <Image
                  source={value.icon}
                  style={{
                    width: 16,
                    height: 16,
                    tintColor: selected === value.title ? '#ffffff' : '#000000',
                  }}
                ></Image>
              )}
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 22,
                  fontWeight: 400,
                  color: selected === value.title ? '#ffffff' : '#000000',
                }}
              >
                {value.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FooterMenu navigation={navigation} selected={'trip'} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  horizontalScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
});
export default TripScreen;
