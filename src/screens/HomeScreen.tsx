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
  useAnimatedValue,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { CusItemMenu } from '../components/CusItemMenu';
import { FooterMenu } from '../components/FooterMenu';
import { Header } from '../components/Header';

import { Menu, discovery_location, discovery_location_after } from '../dataraw';

import { useDispatch, useSelector } from 'react-redux';
import { LocationState, setLocation } from '../slice/locationSlice';
import {
  Restaurant,
  RestaurantState,
  setRestaurant,
} from '../slice/restaurantSlice';
import { Hotel, HotelState, setHotel } from '../slice/hotelSlice';
import { Loading } from '../components/Loading';

import container from '../dependencies/dependencies';
import { HotelService } from '../services/HotelService';
import { LocationService } from '../services/LocationService';
import { RestaurantService } from '../services/RestaurantService';

import { ImageLocal } from '../dataraw';
import ImageLocationList from '../components/ImageLocationList';
import CardImageList from '../components/CardImageList';
import CardImageLocationList from '../components/CardImageLocationList';
import ScrollViewHorizontalHome from '../components/ScrollViewHorizontalHome';
import CardImageLocation from '../components/CardImageLocation';
import CardImage from '../components/CardImage';
import CardImageListV2 from '../components/CardImageListV2';
import CardImageLocationListV2 from '../components/CardImageLocationListV2';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const start = performance.now();
    return () => {
      console.log(
        `[HomeScreen] mount -> ${(performance.now() - start).toFixed(2)}ms`,
      );
    };
  }, []);
  // const countRerender = useRef(0);
  // countRerender.current++;
  // console.log(`Rerender ${countRerender.current}`);

  const dispatch = useDispatch();

  const { isLoadedLocation, locations } = useSelector(
    (state: { location: LocationState }) => state.location,
  );

  const { isLoadedHotel, hotels } = useSelector(
    (state: { hotel: HotelState }) => state.hotel,
  );

  const { isLoadedRestaurant, restaurants } = useSelector(
    (state: { restaurant: RestaurantState }) => state.restaurant,
  );

  const hotelService = container.get<HotelService>('HotelService');
  const restaurantService =
    container.get<RestaurantService>('RestaurantService');
  const locationService = container.get<LocationService>('LocationService');

  const imageLocal = container.get<ImageLocal>('ImageLocal');

  const fetchLocation = async () => {
    const data = await locationService.getLocationList();

    dispatch(setLocation(data.data));
  };

  const fetchHotel = async () => {
    const data = await hotelService.getHotelList();

    dispatch(setHotel(data.data));
  };

  const fetchRestaurant = async () => {
    const data = await restaurantService.getRestaurantList();

    dispatch(setRestaurant(data.data));
  };

  const [selectedLocationDiscovery, setSelectedLocationDiscovery] = useState(0);
  const [selectedLocationDiscoveryAfter, setSelectedLocationDiscoveryAfter] =
    useState(0);

  const [listLocationDiscoveryAfter, setListLocationDiscoveryAfter] = useState<
    (Hotel | Restaurant)[]
  >([]);

  useEffect(() => {
    console.log(selectedLocationDiscoveryAfter);
  }, [selectedLocationDiscoveryAfter]);

  const onSelectedLocationDiscoveryAfter = (index: number) => {
    setSelectedLocationDiscoveryAfter(index);
    switch (index) {
      case 0:
        setListLocationDiscoveryAfter([...hotels, ...restaurants]);
        break;
      case 1:
        setListLocationDiscoveryAfter([...hotels]);
        break;
      case 2:
        setListLocationDiscoveryAfter([...restaurants]);
        break;
    }
  };

  useEffect(() => {
    if (!(isLoadedRestaurant && isLoadedLocation && isLoadedHotel)) {
      console.log('call api');

      fetchLocation();
      fetchHotel();
      fetchRestaurant();
    }
  }, [isLoadedRestaurant && isLoadedLocation && isLoadedHotel]);

  useEffect(() => {
    onSelectedLocationDiscoveryAfter(selectedLocationDiscoveryAfter);
  }, [hotels, restaurants, selectedLocationDiscoveryAfter]);

  const fadeAnim = useAnimatedValue(0.3);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* header */}
      <Animated.View
        style={[
          !showSearch && {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            overflow: 'hidden',
            zIndex: 1,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          },
          {
            height: headerHeight,
            zIndex: 5,
          },
        ]}
      >
        {!showSearch && (
          <ImageBackground
            source={require('../../assets/img/bg/bg_home.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
          />
        )}
        {showSearch && <Header navigation={navigation}></Header>}
      </Animated.View>

      <Animated.ScrollView
        style={{ zIndex: showSearch ? 4 : 6 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
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
            <View
              style={{
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
              }}
            >
              <Image
                source={imageLocal.icon_search}
                style={{ width: 24, height: 24 }}
              />

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
            source={{ uri: imageLocal.banner1 }}
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
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              overflow: 'hidden',
              gap: 12,
            }}
          >
            {Menu.map((item, index) => (
              <Animated.View
                key={index}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [item.s, 1],
                        outputRange: [-50, 0],
                      }),
                    },
                  ],
                }}
              >
                <CusItemMenu
                  index={index}
                  sourceIcon={item.sourceIcon}
                  Title={item.Title}
                  colorBg={item.colorBg}
                />
              </Animated.View>
            ))}
          </View>
        </View>
        {/* Điểm đến được ưa chuộng nhất */}
        <ImageBackground
          source={imageLocal.bg1}
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
            {!(isLoadedRestaurant && isLoadedLocation && isLoadedHotel) ? (
              <Loading />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  gap: 8,
                }}
              >
                <ImageLocationList locations={locations} />
              </View>
            )}

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
                source={imageLocal.right_chevron}
                style={{ width: 18, height: 18 }}
              ></Image>
            </View>
          </View>
        </ImageBackground>
        {/* banner2 */}
        <View style={styles.section}>
          <Image
            source={{ uri: imageLocal.banner2 }}
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

          <ScrollViewHorizontalHome
            list={discovery_location}
            indexOfChoose={selectedLocationDiscovery}
            func={setSelectedLocationDiscovery}
          />

          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            <CardImageLocationList locations={locations} />
          </ScrollView> */}
          <CardImageLocationListV2 locations={locations} />
        </View>
        {/* Tiện ích */}
        <View style={[styles.section, { paddingHorizontal: 0 }]}>
          <ImageBackground
            source={imageLocal.bg2}
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
                    source={imageLocal.bg2_1}
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
                      source={imageLocal.courthouse}
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
                  source={imageLocal.hospital}
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

          <ScrollViewHorizontalHome
            list={discovery_location_after}
            indexOfChoose={selectedLocationDiscoveryAfter}
            func={setSelectedLocationDiscoveryAfter}
          />

          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            <CardImageList list={listLocationDiscoveryAfter} />
          </ScrollView> */}
          <CardImageListV2 list={listLocationDiscoveryAfter} />
        </View>
        <View style={{ height: 75 }} />
      </Animated.ScrollView>

      <FooterMenu navigation={navigation} selected={'home'} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
    gap: 16,
  },
  horizontalScroll: {
    gap: 12,
    paddingRight: 16,
  },
});

export default HomeScreen;
