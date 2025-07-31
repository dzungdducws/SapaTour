import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { RootStackParamList } from '../types';
import { logout, logoutThunk } from '../slice/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

type HeaderProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  isLogin?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const icon_search = require('../../assets/img/icon/icon-search.png');
  const icon_cart = require('../../assets/img/icon/Cart.png');
  const icon_noti = require('../../assets/img/icon/Noti.png');
  const bg_header = require('../../assets/img/bg/bg_header.png');
  const flagSource = require('../../assets/img/icon/icon-vietnam-flag.png');

  const dispatch = useDispatch<AppDispatch>();

  return (
    <ImageBackground source={bg_header} style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={icon_search} style={styles.iconSearch} />
        <TextInput
          placeholder={t('component.header.placeholder')}
          placeholderTextColor="#919EAB"
          style={styles.inputText}
        />
      </View>
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={icon_cart} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            dispatch(logoutThunk());

            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}
        >
          <Image source={icon_noti} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, { flexDirection: 'row' }]}
          onPress={() => {
            i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
            console.log(i18n.language);
          }}
        >
          <Image source={flagSource} style={styles.iconImage} />
          <Text
            style={{
              fontWeight: 600,
              fontSize: 16,
              lineHeight: 24,
              color: '#fff',
              textTransform: 'uppercase',
              paddingLeft: 8,
            }}
          >
            {t('lang')}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    marginRight: 24,
  },
  iconSearch: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  inputText: {
    flex: 1,
    color: '#000',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});
