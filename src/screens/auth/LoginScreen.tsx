import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  useAnimatedValue,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useDispatch } from 'react-redux';
import { login } from '../../slice/userSlice';

import { RootStackParamList } from '../../types';
import { API_URL } from '../../const/const';
import { clearHotelBooking } from '../../slice/hotelBookingSlice';
import { clearRestaurantBooking } from '../../slice/restaurantBookingSlice';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};
const { width: screenWidth } = Dimensions.get('window');

const imageSource_1 = require('../../../assets/img/bg/bg_dangnhap_1.png');
const flagSource = require('../../../assets/img/icon/icon-vietnam-flag.png');
const imageSource_2 = require('../../../assets/img/bg/bg_dangnhap_2.png');
const imageSource_3 = require('../../../assets/img/bg/bg_dangnhap_3.png');
const iconEye = require('../../../assets/img/icon/icon-eye.png');
const iconEyeOff = require('../../../assets/img/icon/icon-eye-off.png');

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [imageHeight, setImageHeight] = useState(200);
  const [showPassword, setShowPassword] = useState(true);
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] =
    useState('user@gmail.com');
  const [password, setPassword] = useState('12345678');
  const dispatch = useDispatch();

  const fadeAnim = useAnimatedValue(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const loginUser = async () => {
    await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailOrPhoneNumber,
        password,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === 200) {
          dispatch(
            login({
              isLogin: true,
              userInfo: {
                id: res.data.user.id,
                name: res.data.user.name,
                email: res.data.user.email,
                avt: res.data.user.avt,
                country: res.data.user.country,
                address: res.data.user.address,
                phone: res.data.user.phone,
                role: res.data.user.role,
                birthday: res.data.user.birthday,
                token: res.data.token,
              },
            }),
          );
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(clearRestaurantBooking());
    dispatch(clearHotelBooking());   

    let { uri: uri_1 } = Image.resolveAssetSource(imageSource_1);
    Image.getSize(uri_1, (imgWidth, imgHeight) => {
      const ratio = imgHeight / imgWidth;
      setImageHeight(screenWidth * ratio);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageSource_1}
        style={{
          position: 'absolute',
          width: screenWidth,
          height: imageHeight,
        }}
        resizeMode="cover"
      >
        <Image source={flagSource} style={styles.flag} />
      </ImageBackground>
      <View style={{ flex: 1, marginTop: 60, alignItems: 'center' }}>
        <Animated.View
          style={{
            gap: 10,
            opacity: fadeAnim,
            transform: [
              {
                translateX: fadeAnim.interpolate({
                  inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  outputRange: [-20, 20, 0, 0, 0, 0],
                }),
              },
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  outputRange: [0, 0, 0, -20, 20, 0],
                }),
              },
            ],
          }}
        >
          <Animated.Image
            source={imageSource_2}
            style={{
              width: 75,
              height: 75,
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            }}
          />
          <Text style={styles.nameApp}>Sapa Tour</Text>
        </Animated.View>
        <Animated.View
          style={{
            padding: 16,
            width: '100%',
            gap: 16,
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          }}
        >
          {/* email/sdt */}
          <View
            style={{
              gap: 8,
            }}
          >
            <Text>Email/ Số điện thoại</Text>
            <TextInput
              placeholder="Nhập email hoặc số điện thoại"
              placeholderTextColor={'#919EAB'}
              style={styles.input}
              value={emailOrPhoneNumber}
              onChangeText={text => setEmailOrPhoneNumber(text)}
            ></TextInput>
          </View>
          {/* mật khẩu  */}
          <View
            style={{
              gap: 8,
            }}
          >
            <Text>Mật khẩu</Text>
            <View
              style={{
                ...styles.input,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TextInput
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#919EAB"
                secureTextEntry={showPassword}
                style={{ flex: 1, height: 40, color: 'black' }}
                value={password}
                onChangeText={text => setPassword(text)}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={!showPassword ? iconEyeOff : iconEye}
                  style={{ width: 24, height: 24, marginLeft: 8 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={{
            padding: 16,
            opacity: fadeAnim,
            transform: [
              {
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={styles.textForgetPass}
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
            >
              Quên mật khẩu?
            </Text>
          </View>

          <TouchableOpacity
            onPress={async () => {
              loginUser();
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#80B941', '#65A438', '#4A9341']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginBtn}
            >
              <Text style={styles.textBtn}>Đăng nhập</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={{ gap: 8, alignItems: 'center' }}>
            <Text style={styles.label}>
              Bạn chưa có tài khoản?{' '}
              <Text
                style={styles.textForgetPass}
                onPress={() => {
                  navigation.navigate('Register');
                }}
              >
                {' '}
                Đăng ký
              </Text>
            </Text>
            <Text
              style={styles.label}
              onPress={() => {
                navigation.navigate('Home');
              }}
            >
              Bỏ qua
            </Text>
          </View>
        </Animated.View>
      </View>
      <Image
        source={imageSource_3}
        style={{
          width: screenWidth,
          aspectRatio: 3,
          position: 'absolute',
          bottom: -screenWidth / 3,
          left: 0,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Plus Jakarta Sans',
  },

  nameApp: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
  },

  flag: {
    width: 48,
    height: 24,
    position: 'absolute',
    top: 20,
    right: 20,
  },

  label: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0,
  },
  input: {
    height: 40,
    borderRadius: 8,
    color: 'black',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F4F6F8',
  },

  textForgetPass: {
    color: '#81BA41',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0,
    paddingRight: 16,
  },

  loginBtn: {
    width: screenWidth - 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 22,
  },
  textBtn: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: 0,
    textAlign: 'center',
  },
});
export default LoginScreen;
