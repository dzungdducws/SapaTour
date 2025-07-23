import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import { FooterMenu } from '../components/FooterMenu';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Header } from '../components/Header';
import { RangePickerModal } from '../components/RangePickerModal';
import LinearGradient from 'react-native-linear-gradient';
import { ThongTinThanhToanModal } from '../components/ThongTinThanhToanModal';
import { useDispatch, useSelector } from 'react-redux';
import { BookingHotelInList } from '../components/BookingHotel';
import { UserState, logout } from '../slice/userSlice';
import {
  clearHotelBooking,
  HotelBooking,
  HotelBookingState,
  setHotelBooking,
} from '../slice/hotelBookingSlice';
import { API_URL } from '../const/const';
import {
  clearRestaurantBooking,
  RestaurantBooking,
  RestaurantBookingState,
  setRestaurantBooking,
} from '../slice/restaurantBookingSlice';
import { BookingRestaurantInList } from '../components/BookingRestaurant';
import { formatVNDate } from '../utils/utils';
import { setIndex, setStatusToIndex, StatusState } from '../slice/statusSlice';
import { Loading } from '../components/Loading';

type TripScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Trip'>;
};

const TripScreen = ({ navigation }: TripScreenProps) => {
  useEffect(() => {
    const start = performance.now();
    return () => {
      console.log(
        `[TripScreen] mount -> ${(performance.now() - start).toFixed(2)}ms`,
      );
    };
  }, []);

  const dispatch = useDispatch();
  const { isLogin, userInfo } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const { statusInfo } = useSelector(
    (state: { status: StatusState }) => state.status,
  );

  const { isNeedFetchHotel, hotel_bookings } = useSelector(
    (state: { hotelBooking: HotelBookingState }) => state.hotelBooking,
  );

  const { isNeedFetchRestaurant, restaurant_bookings } = useSelector(
    (state: { restaurantBooking: RestaurantBookingState }) =>
      state.restaurantBooking,
  );

  const [refreshing, setRefreshing] = React.useState(false);

  const [selectedStatus, setSelectedStatus] = useState<number>(0);
  const [selectedDiscovery, setSelectedDiscovery] = useState<number>(0);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [loadingHotel, setLoadingHotel] = useState(true);

  const [loadingRestaurant, setLoadingRestaurant] = useState(true);

  // Status configuration
  const statusConfig = [
    { id: 0, title: 'Sắp tới', statuses: [1, 2, 3, 4] },
    { id: 1, title: 'Hoàn tất', statuses: [5] },
    { id: 2, title: 'Đã hủy', statuses: [6] },
  ];

  // Discovery location configuration
  const discoveryConfig = [
    { id: 0, title: 'Tất cả', icon: null, types: [1, 2] },
    {
      id: 1,
      title: 'Địa điểm lưu trú',
      icon: require('../../assets/img/icon/bulk0.png'),
      types: [1],
    },
    {
      id: 2,
      title: 'Địa điểm ẩm thực',
      icon: require('../../assets/img/icon/bulk.png'),
      types: [2],
    },
  ];

  // Recommendation questions
  const recommendations = [
    {
      text: 'Bạn cần tìm địa điểm du lịch?',
      icon: require('../../assets/img/icon/Map-Point.png'),
      colorBg: '#EEF4FA',
    },
    {
      text: 'Bạn cần tìm địa điểm lưu trú?',
      icon: require('../../assets/img/icon/buildings-2.png'),
      colorBg: '#EBF6EA',
    },
    {
      text: 'Bạn cần tìm địa điểm ẩm thực?',
      icon: require('../../assets/img/icon/Building.png'),
      colorBg: '#FBEEEE',
    },
  ];

  const fetchHotelBooking = async () => {
    await fetch(`${API_URL}/booking/getBookingHotel/${userInfo.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        dispatch(setHotelBooking(res.data));
        setLoadingHotel(false);
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
      });
  };

  const fetchRestaurantBooking = async () => {
    await fetch(`${API_URL}/booking/getBookingRestaurant/${userInfo.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        dispatch(setRestaurantBooking(res.data));
        setLoadingRestaurant(false);
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
      });
  };

  const fetchStatus = async (type: number) => {
    await fetch(`${API_URL}/booking/getStatus/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        dispatch(setIndex(type));
        dispatch(setStatusToIndex(res.data));
      });
  };

  useEffect(() => {
    if (
      isNeedFetchHotel &&
      isLogin &&
      discoveryConfig[selectedDiscovery].types.includes(1)
    ) {
      setLoadingHotel(true);
      fetchHotelBooking();
      fetchStatus(1);
    }
    if (
      isNeedFetchRestaurant &&
      isLogin &&
      discoveryConfig[selectedDiscovery].types.includes(2)
    ) {
      setLoadingRestaurant(true);
      fetchRestaurantBooking();
      fetchStatus(2);
    }
  }, [
    isNeedFetchHotel,
    isNeedFetchRestaurant,
    selectedStatus,
    selectedDiscovery,
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(clearHotelBooking());
    dispatch(clearRestaurantBooking());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const filteredBookings = [...hotel_bookings, ...restaurant_bookings]
    .sort((a, b) => {
      return (
        new Date(b.check_in_date).getTime() -
        new Date(a.check_in_date).getTime()
      );
    })
    .filter(booking => {
      const statusMatch = statusConfig[selectedStatus].statuses.includes(
        booking.status,
      );
      const typeMatch = discoveryConfig[selectedDiscovery].types.includes(
        booking.type,
      );
      return statusMatch && typeMatch;
    });

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        {/* Date Range Picker */}
        <TouchableOpacity
          onPress={() => setShowModal1(true)}
          style={styles.datePicker}
        >
          <View style={styles.datePickerContent}>
            <Image
              source={require('../../assets/img/icon/calendar-blank.png')}
              style={styles.calendarIcon}
            />
            {selectedRange ? (
              <Text style={styles.dateRangeText}>
                {formatVNDate(selectedRange.start)} -{' '}
                {formatVNDate(selectedRange.end)}
              </Text>
            ) : (
              <Text style={styles.placeholderText}>Khoảng ngày</Text>
            )}
          </View>
        </TouchableOpacity>

        {/* Status Tabs */}
        <View style={styles.statusTabs}>
          {statusConfig.map(status => (
            <TouchableOpacity
              key={status.id}
              style={[
                styles.statusTab,
                selectedStatus === status.id && styles.activeStatusTab,
              ]}
              onPress={() => {
                setSelectedStatus(status.id);
                dispatch(clearHotelBooking());
                dispatch(clearRestaurantBooking());
              }}
            >
              <Text
                style={[
                  styles.statusText,
                  selectedStatus === status.id && styles.activeStatusText,
                ]}
              >
                {status.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Discovery Type Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.discoveryScroll}
        >
          {discoveryConfig.map(discovery => (
            <TouchableOpacity
              key={discovery.id}
              onPress={() => {
                setSelectedDiscovery(discovery.id);
                dispatch(clearHotelBooking());
                dispatch(clearRestaurantBooking());
              }}
              style={[
                styles.discoveryItem,
                selectedDiscovery === discovery.id &&
                  styles.activeDiscoveryItem,
              ]}
            >
              {discovery.icon && (
                <Image
                  source={discovery.icon}
                  style={[
                    styles.discoveryIcon,
                    selectedDiscovery === discovery.id &&
                      styles.activeDiscoveryIcon,
                  ]}
                />
              )}
              <Text
                style={[
                  styles.discoveryText,
                  selectedDiscovery === discovery.id &&
                    styles.activeDiscoveryText,
                ]}
              >
                {discovery.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loadingHotel || loadingRestaurant ? (
          <Loading />
        ) : !isLogin || filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Image
              source={require('../../assets/img/img-trip.png')}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>
              Quý khách không có đặt chỗ nào{' '}
              {statusConfig[selectedStatus].title.toLowerCase()}
            </Text>
            <Text style={styles.emptySubtitle}>
              {!isLogin
                ? 'Đăng nhập hoặc tạo tài khoản để bắt đầu.'
                : 'Lên kế hoạch cho chuyến đi tiếp theo!'}
            </Text>

            {!isLogin ? (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogout}
              >
                <LinearGradient
                  colors={['#80B941', '#65A438', '#4A9341']}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.loginButtonText}>Đăng nhập ngay</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View style={styles.recommendations}>
                {recommendations.map((rec, index) => (
                  <View key={index} style={styles.recommendationCard}>
                    <View
                      style={[
                        styles.recommendationIconContainer,
                        { backgroundColor: rec.colorBg },
                      ]}
                    >
                      <Image
                        source={rec.icon}
                        style={styles.recommendationIcon}
                      />
                    </View>
                    <View style={styles.recommendationTextContainer}>
                      <Text style={styles.recommendationText} numberOfLines={2}>
                        {rec.text}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View>
            {filteredBookings?.map(booking =>
              booking.type === 1 ? (
                <BookingHotelInList
                  key={booking.id}
                  navigation={navigation}
                  onPressThongTinThanhToan={() => setShowModal2(true)}
                  item={booking as HotelBooking}
                />
              ) : (
                <BookingRestaurantInList
                  key={booking.id}
                  navigation={navigation}
                  item={booking as RestaurantBooking}
                />
              ),
            )}
          </View>
        )}
        <View style={styles.spacer} />
      </ScrollView>

      <FooterMenu navigation={navigation} selected={'trip'} />

      {/* Modals */}
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
        onClose={() => setShowModal2(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  datePicker: {
    borderRadius: 8,
    borderWidth: 0.25,
    backgroundColor: '#f3f3f3',
    borderColor: '#E8E8E8',
    shadowColor: '#919EAB1F',
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  datePickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  dateRangeText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
  placeholderText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#919EAB',
  },
  statusTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -16,
    marginVertical: 8,
  },
  statusTab: {
    paddingHorizontal: 8,
    paddingBottom: 5,
    borderBottomWidth: 0,
    flex: 1,
  },
  activeStatusTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#81BA41',
  },
  statusText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#000000',
    textAlign: 'center',
  },
  activeStatusText: {
    fontWeight: '600',
    color: '#81BA41',
  },
  discoveryScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  discoveryItem: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 50,
    backgroundColor: '#919EAB29',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeDiscoveryItem: {
    backgroundColor: '#81BA41',
  },
  discoveryIcon: {
    width: 16,
    height: 16,
    tintColor: '#000000',
  },
  activeDiscoveryIcon: {
    tintColor: '#ffffff',
  },
  discoveryText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    color: '#000000',
  },
  activeDiscoveryText: {
    color: '#ffffff',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyImage: {
    width: 137.73,
    height: 133.13,
    marginVertical: 28,
  },
  emptyTitle: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  emptySubtitle: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#637381',
  },
  loginButton: {
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 16,
  },
  gradientButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 26,
  },
  recommendations: {
    marginTop: 32,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
  recommendationCard: {
    width: '30%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#919EAB3D',
  },
  recommendationIconContainer: {
    paddingHorizontal: 32,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationIcon: {
    width: 32,
    height: 32,
  },
  recommendationTextContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  spacer: {
    height: 120,
  },
});

export default TripScreen;
