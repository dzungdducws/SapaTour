import React, { useState, useRef, useEffect } from 'react';
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
import { CardImage } from '../components/CardImage';
import { FooterMenu } from '../components/FooterMenu';
import { Header } from '../components/Header';

import { API_URL } from '../const/const';
import { useDispatch, useSelector } from 'react-redux';
import { LocationState, setLocation } from '../slice/locationSlice';
import { HomeState, setisLoaded } from '../slice/homeSlice';
import {
  Restaurant,
  RestaurantState,
  setRestaurant,
} from '../slice/restaurantSlice';
import { Hotel, HotelState, setHotel } from '../slice/hotelSlice';

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

  const dispatch = useDispatch();

  const { isLoaded } = useSelector((state: { home: HomeState }) => state.home);

  const location = useSelector(
    (state: { location: LocationState }) => state.location.locations,
  );

  const hotel = useSelector(
    (state: { hotel: HotelState }) => state.hotel.hotels,
  );

  const restaurant = useSelector(
    (state: { restaurant: RestaurantState }) => state.restaurant.restaurants,
  );

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(`${API_URL}/location/getLocation`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        dispatch(setLocation(data.data));
      } catch (err) {
        console.log(err);
      }
    };

    const fetchHotel = async () => {
      try {
        const res = await fetch(`${API_URL}/hotel/getHotel`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        dispatch(setHotel(data.data));
      } catch (err) {
        console.log(err);
      }
    };

    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`${API_URL}/restaurant/getRestaurant`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        dispatch(setRestaurant(data.data));
      } catch (err) {
        console.log(err);
      }
    };

    if (!isLoaded) {
      fetchLocation();
      fetchHotel();
      fetchRestaurant();
      dispatch(setisLoaded(true));
    }
  }, []);

  const discovery_location = [
    'Tất cả',
    'Danh lam thắng cảnh',
    'Di tích lịch sử',
    'Khu vui chơi giải trí',
  ];

  const discovery_location_after = ['Tất cả', 'Khách sạn', 'Nhà hàng'];

  const [selected1, setSelected1] = useState(0);
  const [selected2, setSelected2] = useState(0);
  const _selected2: {
    [key: number]: (Hotel | Restaurant)[];
  } = {
    0: [...hotel, ...restaurant],
    1: [...hotel],
    2: [...restaurant],
  };
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
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      const threshold = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
      setShowSearch(value >= threshold);
    });

    return () => scrollY.removeListener(listenerId);
  }, []);

  return (
    <View style={styles.container}>
      {/* header */}
      <Animated.View
        style={[
          !showSearch && styles.header,
          {
            height: headerHeight,
            zIndex: 5,
          },
        ]}
      >
        {!showSearch && (
          <ImageBackground
            source={require('../../assets/img/bg/bg_home.png')}
            style={styles.headerBackground}
            resizeMode="cover"
          />
        )}
        {showSearch && <Header navigation={navigation}></Header>}
      </Animated.View>

      <Animated.ScrollView
        style={{ zIndex: showSearch ? 4 : 6 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {/* Thời tiết */}
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
        {/* Tìm kiếm */}
        {!showSearch && (
          <View
            style={[
              styles.section,
              {
                paddingVertical: 8,
              },
            ]}
          >
            <View style={styles.input}>
              <Image source={icon_search} style={{ width: 24, height: 24 }} />
              <TextInput
                placeholder="Tìm kiếm trên SaPa Tour"
                placeholderTextColor="#919EAB"
                style={{ flex: 1, height: 40 }}
              />
            </View>
          </View>
        )}
        {/* banner1 */}
        <View style={styles.section}>
          <Image
            source={banner1}
            style={{
              width: screenWidth - 32,
              height: (screenWidth / 3) * 2,
              borderRadius: 8,
            }}
            resizeMode="contain"
          />
        </View>
        {/* Item */}
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
        {/* Điểm đến được ưa chuộng nhất */}
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
                    rate={item.rate}
                    name={item.name}
                    location={item.location}
                    image={item.image}
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
        {/* banner2 */}
        <View style={styles.section}>
          <Image
            source={banner2}
            style={{
              width: screenWidth - 32,
              height: screenWidth / 2,
              borderRadius: 8,
            }}
            resizeMode="contain"
          />
        </View>
        {/* Khám phá địa điểm độc đáo tại SaPa */}
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
                rate={item.rate}
                name={item.name}
                location={item.location}
                image={item.image}
              />
            ))}
          </ScrollView>
        </View>
        {/* Tiện ích */}
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
        {/* Địa điểm nghỉ dưỡng  */}
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
            {discovery_location_after.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelected2(index)}
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 50,
                  backgroundColor:
                    selected2 === index ? '#81BA41' : '#919EAB29',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 22,
                    fontWeight: 400,
                    color: selected2 === index ? '#ffffff' : '#000000',
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
            {_selected2[selected2]
              .sort((a, b) => b.rate - a.rate)
              .map((item, index) => {
                const isHotel = 'price' in item;

                return (
                  <CardImage
                    key={index}
                    star={isHotel ? item.star : -1}
                    rate={item.rate}
                    name={item.name}
                    location={item.location}
                    image={item.image}
                    price={isHotel ? item.price : -1}
                    time_open={!isHotel ? item.time_open : undefined}
                    time_close={!isHotel ? item.time_close : undefined}
                  />
                );
              })}
          </ScrollView>
        </View>
        <View style={{ height: 144 }} />
      </Animated.ScrollView>

      <FooterMenu navigation={navigation} selected={'home'} />
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
