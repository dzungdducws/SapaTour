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
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../types';

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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
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
        <View style={{ gap: 10 }}>
          <Image source={imageSource_2} style={{ width: 75, height: 75 }} />
          <Text style={styles.nameApp}>SapaTour</Text>
        </View>
        <View style={{ padding: 16, width: '100%', gap: 16 }}>
          <View style={{ gap: 8 }}>
            <Text>Email/ Số điện thoại</Text>
            <TextInput
              placeholder="Nhập email hoặc số điện thoại"
              placeholderTextColor={'#919EAB'}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={{ gap: 8 }}>
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
                style={{ flex: 1, height: 40 }}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={showPassword ? iconEyeOff : iconEye}
                  style={{ width: 24, height: 24, marginLeft: 8 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            padding: 16,
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

        <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
          <LinearGradient
            colors={['#80B941', '#65A438', '#4A9341']} // tùy chỉnh màu gradient
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
          <Text style={styles.label} onPress={() => {navigation.navigate('Home')}}>Bỏ qua</Text>
        </View>
      </View>
      <Image
        source={imageSource_3}
        style={{ position: 'absolute', bottom: 0, left: 0 }}
        resizeMode="cover"
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
