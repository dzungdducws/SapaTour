import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { CusDropdown } from '../../components/CusDropdown';

import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
const { width: screenWidth } = Dimensions.get('window');

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

const imageSource_1 = require('../../../assets/img/bg/bg_dangky.png');
const iconLeftChevron = require('../../../assets/img/icon/icon-left-chevron.png');
const iconDownChevron = require('../../../assets/img/icon/icon-down-chevron.png');
const iconEye = require('../../../assets/img/icon/icon-eye.png');
const iconEyeOff = require('../../../assets/img/icon/icon-eye-off.png');

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [imageHeight, setImageHeight] = useState(200); // placeholder
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const [businessLicense, setBusinessLicense] = useState({ id: '', name: '' });

  const [businessLicenseList, setBusinessLicenseList] = useState([
    { id: '1', name: 'Giấy phép kinh doanh 1' },
    { id: '2', name: 'Giấy phép kinh doanh 2' },
    { id: '3', name: 'Giấy phép kinh doanh 3' },
  ]);

  const [objectSelected, setObjectSelected] = useState({ id: '', name: '' });

  const [objectList, setObjectList] = useState([
    { id: '1', name: 'Cá nhân' },
    { id: '2', name: 'Doanh nghiệp' },
    { id: '3', name: 'Tổ chức' },
  ]);

  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleChecked = () => setChecked(previousState => !previousState);

  useEffect(() => {
    let { uri: uri_1 } = Image.resolveAssetSource(imageSource_1);
    Image.getSize(uri_1, (imgWidth, imgHeight) => {
      const ratio = imgHeight / imgWidth;
      setImageHeight(screenWidth * ratio);
    });
  }, []);

  const handleBackPress = () => {
    console.log(123);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          width: screenWidth,
          top: 0,
          left: 0,
          paddingHorizontal: 16,
          paddingVertical: 32,
          zIndex: 10,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={() => handleBackPress()}>
          <Image source={iconLeftChevron} style={styles.iconLeftChevron} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Đăng ký </Text>
      </View>

      <ImageBackground
        source={imageSource_1}
        style={{
          position: 'absolute',
          width: screenWidth,
          height: imageHeight,
          alignItems: 'center',
          paddingTop: 80,
          paddingBottom: 80,
        }}
        resizeMode="cover"
      ></ImageBackground>
      <ScrollView
        style={{
          marginTop: 60,
          marginBottom: 72,
          width: '100%',
          height: '100%',
        }}
      >
        <View style={{ padding: 16, width: '100%', gap: 16 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ color: 'white' }}>Họ tên *</Text>
            <TextInput
              placeholder="Nhập email hoặc số điện thoại"
              placeholderTextColor={'#919EAB'}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ color: 'white' }}>Email *</Text>
            <TextInput
              placeholder="Nhập email hoặc số điện thoại"
              placeholderTextColor={'#919EAB'}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={{ gap: 8 }}>
            <Text>Số điện thoại *</Text>
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
          <View style={{ gap: 8 }}>
            <Text>Xác nhận mật khẩu</Text>
            <View
              style={{
                ...styles.input,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TextInput
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#919EAB"
                secureTextEntry={showRePassword}
                style={{ flex: 1, height: 40 }}
              />

              <TouchableOpacity
                onPress={() => setShowRePassword(!showRePassword)}
              >
                <Image
                  source={showRePassword ? iconEyeOff : iconEye}
                  style={{ width: 24, height: 24, marginLeft: 8 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <TouchableOpacity
                onPress={toggleSwitch}
                style={{
                  width: 30,
                  height: 18,
                  backgroundColor: isEnabled ? '#81BA41' : '#637381',
                  borderRadius: 20,
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    transform: [{ translateX: isEnabled ? 13 : 2 }],
                    position: 'absolute',
                  }}
                />
              </TouchableOpacity>

              <Text style={[styles.label, { marginLeft: 5 }]}>
                Đăng ký kinh doanh
              </Text>
            </View>
          </View>
          {!isEnabled && (
            <View style={{ gap: 8 }}>
              <Text>Giấy phép kinh doanh *</Text>
              <CusDropdown
                items={businessLicenseList.map(item => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Chọn giấy phép kinh doanh"
                onChange={(value: string | null) => {
                  if (value) {
                    const selectedItem = businessLicenseList.find(
                      item => item.id === value,
                    );
                    if (selectedItem) {
                      setBusinessLicense({
                        id: selectedItem.id,
                        name: selectedItem.name,
                      });
                    }
                  } else {
                    setBusinessLicense({ id: '', name: '' });
                  }
                }}
              ></CusDropdown>
            </View>
          )}
          {!isEnabled && (
            <View style={{ gap: 8 }}>
              <Text>Đối tượng đăng ký *</Text>
              <CusDropdown
                items={objectList.map(item => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Chọn đối tượng đăng ký"
                onChange={(value: string | null) => {
                  if (value) {
                    const selectedItem = objectList.find(
                      item => item.id === value,
                    );
                    if (selectedItem) {
                      setObjectSelected({
                        id: selectedItem.id,
                        name: selectedItem.name,
                      });
                    }
                  } else {
                    setObjectSelected({ id: '', name: '' });
                  }
                }}
              ></CusDropdown>
            </View>
          )}
          <View style={{ gap: 8 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <TouchableOpacity
                onPress={toggleChecked}
                style={{
                  width: 24,
                  height: 24,
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={
                    !checked
                      ? require('../../../assets/img/icon/checkbox-false.png')
                      : require('../../../assets/img/icon/checkbox-true.png')
                  }
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </TouchableOpacity>

              <Text style={[styles.label, { marginLeft: 5 }]}>
                Tôi đã đọc và đồng ý với các{' '}
                <Text style={{ color: '#81BA41' }}>điều khoản sử dụng</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: screenWidth,
          bottom: 0,
          left: 0,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderTopWidth: 1,
          borderColor: '#E0E0E0',
        }}
        onPress={() => {}}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#80B941', '#65A438', '#4A9341']} // tùy chỉnh màu gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.loginBtn}
        >
          <Text style={styles.textBtn}>Đăng ký </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Plus Jakarta Sans',
  },

  textHeader: {
    width: screenWidth - 80,
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: 0,
    textAlign: 'center',
  },

  iconLeftChevron: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 24,
    height: 24,
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
    fontSize: 12,
    fontWeight: '400',
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

  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    width: '100%',
  },
});
export default RegisterScreen;
