import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  Animated,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { CusItemMenu } from '../components/CusItemMenu';
import { ImageLocation } from '../components/ImageLocation';
import { CardImageLocation } from '../components/CardImageLocation';
import { CardImageHotel } from '../components/CardImageHotel';
import { FooterMenu } from '../components/FooterMenu';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const { width: screenWidth } = Dimensions.get('window');

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
      starNumber: 3,
      rating: 4.8,
      name: 'Silk Path Grand Sapa Resort & Spa',
      location: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
      sourceImg: '1',
      price: 1000000,
    },
    {
      starNumber: 3,
      rating: 4.0,
      name: 'Silk Path Grand Sapa Resort & Spa',
      location: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
      sourceImg: '1',
      price: 1000000,
    },
    {
      starNumber: 3,
      rating: 2.5,
      name: 'Silk Path Grand Sapa Resort & Spa',
      location: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
      sourceImg: '1',
      price: 1000000,
    },
    {
      starNumber: 3,
      rating: 2,
      name: 'Silk Path Grand Sapa Resort & Spa',
      location: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
      sourceImg: '1',
      price: 1000000,
    },
    {
      starNumber: 3,
      rating: 0,
      name: 'Silk Path Grand Sapa Resort & Spa',
      location: 'Doi Quan 6, Group 10, Sapa, Lao Cai, Sa Pa',
      sourceImg: '1',
      price: 1000000,
    },
  ];

  const discovery_location = [
    'Tất cả',
    'Danh lam thắng cảnh',
    'Di tích lịch sử',
    'Khu vui chơi giải trí',
  ];

  const [selected1, setSelected1] = useState(1);
  const [selected2, setSelected2] = useState(1);

  const icon_search = require('../../assets/img/icon/icon-search.png');
  const right_chevron = require('../../assets/img/icon/right-chevron.png');
  const courthouse = require('../../assets/img/icon/courthouse.png');
  const hospital = require('../../assets/img/icon/hospital.png');

  const banner1 = require('../../assets/img/banner/Banner-Home.png');
  const banner2 = require('../../assets/img/banner/Banner-Home2.png');
  const bg1 = require('../../assets/img/bg/bg_home_1.png');
  const bg2 = require('../../assets/img/bg/bg_home_2.png');
  const bg2_1 = require('../../assets/img/bg/bg_home_2-1.png');

  const scrollY = useRef(new Animated.Value(0)).current;
  const HEADER_MAX_HEIGHT = 148;
  const HEADER_MIN_HEIGHT = 80;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
          },
        ]}
      >
        <ImageBackground
          source={require('../../assets/img/bg/bg_home.png')}
          style={styles.headerBackground}
          resizeMode="cover"
        />
      </Animated.View>

      <Animated.ScrollView
        style={{ zIndex: 10 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
      >
        <View style={[styles.section, { marginTop: 28, marginBottom: 0 }]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 4,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  width: 24,
                  height: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('../../assets/img/icon/slight_touch_happyday.png')}
                  style={{ height: 16, width: 16 }}
                ></Image>
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 20,
                  lineHeight: 30,
                  color: 'white',
                  marginLeft: 8,
                }}
              >
                24 ℃
              </Text>
              <Image
                source={require('../../assets/img/icon/dot.png')}
                style={{ height: 16, width: 16, marginLeft: 12 }}
              ></Image>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 20,
                  lineHeight: 30,
                  color: 'white',
                  marginLeft: 8,
                }}
              >
                Sa Pa
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../assets/img/icon/Cart.png')}
                style={{ height: 24, width: 24, marginRight: 12 }}
              ></Image>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../assets/img/icon/Noti.png')}
                  style={{ height: 24, width: 24 }}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.input}>
            <Image source={icon_search} style={{ width: 24, height: 24 }} />
            <TextInput
              placeholder="Tìm kiếm trên SaPa Tour"
              placeholderTextColor="#919EAB"
              style={{ flex: 1, height: 40 }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Image
            source={banner1}
            style={{
              width: screenWidth - 32,
              borderRadius: 8,
            }}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.section, { marginBottom: 0 }]}>
          <View style={styles.menuContainer}>
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
        <ImageBackground
          source={bg1}
          style={{ width: '100%', paddingTop: 24 }}
          resizeMode="contain"
        >
          <View style={[styles.section, { paddingHorizontal: 16 }]}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 18,
                lineHeight: 28,
                marginBottom: 16,
              }}
            >
              Điểm đến được ưa chuộng nhất
            </Text>
            <View style={styles.locationGrid}>
              {location.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.locationItem,
                    { width: index === 0 ? '100%' : '48%' },
                  ]}
                >
                  <ImageLocation
                    rating={item.rating}
                    name={item.name}
                    location={item.location}
                    sourceImg={item.sourceImg}
                  />
                </View>
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  color: '#81BA41',
                  fontSize: 13,
                  fontWeight: 700,
                  lineHeight: 22,
                  letterSpacing: 0,
                }}
              >
                Xem thêm
              </Text>
              <Image
                source={right_chevron}
                style={{ width: 18, height: 18 }}
              ></Image>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.section}>
          <Image
            source={banner2}
            style={{ width: screenWidth - 32, borderRadius: 8 }}
            resizeMode="cover"
          />
        </View>

        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <Image
              source={require('../../assets/img/icon/map-pin.png')}
              style={{
                width: 28,
                height: 28,
                marginRight: 12,
              }}
            />

            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '600',
                flexShrink: 1,
                flex: 1,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Khám phá địa điểm độc đáo tại SaPa
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {discovery_location.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelected1(index)}
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 50,
                  backgroundColor:
                    selected1 === index ? '#81BA41' : '#919EAB29',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 22,
                    fontWeight: 400,
                    color: selected1 === index ? '#ffffff' : '#000000',
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {location.map((item, index) => (
              <CardImageLocation
                key={index}
                rating={item.rating}
                name={item.name}
                location={item.location}
                sourceImg={item.sourceImg}
              />
            ))}
          </ScrollView>
        </View>

        <View style={[styles.section, { paddingHorizontal: 0 }]}>
          <ImageBackground
            source={bg2}
            style={{ paddingTop: 24, paddingBottom: 22, paddingHorizontal: 16 }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              <TouchableOpacity
                style={{
                  height: 190,
                  width: 200,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 16,
                  backgroundColor: 'white',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <LinearGradient
                  colors={['#AAF27F', '#229A16']} // tùy chỉnh màu gradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{}}
                >
                  <ImageBackground
                    source={bg2_1}
                    style={{
                      height: 190,
                      width: 200,
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 16,
                    }}
                  >
                    <Image
                      source={courthouse}
                      style={{
                        width: 48,
                        height: 48,
                        marginBottom: 12,
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        lineHeight: 24,
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      Các địa điểm tiện ích của SaPa
                    </Text>
                  </ImageBackground>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 190,
                  width: 200,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 16,
                  backgroundColor: 'white',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={hospital}
                  style={{
                    width: 48,
                    height: 48,
                    marginBottom: 12,
                  }}
                />
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 24,
                    color: 'black',
                    textAlign: 'center',
                  }}
                >
                  Bệnh viện, trạm y tế
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </ImageBackground>
        </View>

        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <Image
              source={require('../../assets/img/icon/buildings-3.png')}
              style={{
                width: 28,
                height: 28,
                marginRight: 12,
              }}
            />

            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '600',
                flexShrink: 1,
                flex: 1,
              }}
            >
              Địa điểm nghỉ dưỡng sau ngày dài khám phá
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {discovery_location.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelected1(index)}
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 50,
                  backgroundColor:
                    selected1 === index ? '#81BA41' : '#919EAB29',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 22,
                    fontWeight: 400,
                    color: selected1 === index ? '#ffffff' : '#000000',
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {hotel.map((item, index) => (
              <CardImageHotel
                key={index}
                starNumber={item.starNumber}
                price={item.price}
                rating={item.rating}
                name={item.name}
                location={item.location}
                sourceImg={item.sourceImg}
              />
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 80 }} />
      </Animated.ScrollView>

      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 48,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerBackground: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
    gap: 16,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  locationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  locationItem: {
    marginBottom: 8,
  },
  horizontalScroll: {
    gap: 12,
    paddingRight: 16,
  },
});

export default HomeScreen;
