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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useTranslation } from 'react-i18next';
const { width: screenWidth } = Dimensions.get('window');

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

const imageSource_1 = require('../../../assets/img/bg/bg_quenmk.png');
const iconLeftChevron = require('../../../assets/img/icon/icon-left-chevron.png');
const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const { t } = useTranslation();
  const [imageHeight, setImageHeight] = useState(200); // placeholder

  useEffect(() => {
    let { uri: uri_1 } = Image.resolveAssetSource(imageSource_1);
    Image.getSize(uri_1, (imgWidth, imgHeight) => {
      const ratio = imgHeight / imgWidth;
      setImageHeight(screenWidth * ratio);
    });
  }, []);

  const handleBackPress = () => {
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
        <Text style={styles.textHeader}>
          {t('screen.forgetPassword.label.title')}{' '}
        </Text>
      </View>
      <ImageBackground
        source={imageSource_1}
        style={{
          position: 'absolute',
          width: screenWidth,
          height: imageHeight,
        }}
        resizeMode="cover"
      ></ImageBackground>
      <View style={{ flex: 1, marginTop: 60, alignItems: 'center' }}>
        <View style={{ padding: 16, width: '100%', gap: 24 }}>
          <View style={{ gap: 8 }}>
            <Text style={styles.label}>
              {t('screen.forgetPassword.label.subTitle')}
            </Text>
            <TextInput
              placeholder={t('screen.forgetPassword.inputHolder.email')}
              placeholderTextColor={'#919EAB'}
              style={styles.input}
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
          <LinearGradient
            colors={['#80B941', '#65A438', '#4A9341']} // tùy chỉnh màu gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmBtn}
          >
            <Text style={styles.textBtn}>
              {t('screen.forgetPassword.button.confirm')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
  },
  input: {
    height: 40,
    color: 'black',

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

  confirmBtn: {
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
export default ForgotPasswordScreen;
