import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  useAnimatedValue,
} from 'react-native';
import { RootStackParamList } from '../types';

import { ImageLocal } from '../dataraw';
import container from '../dependencies/dependencies';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

type FooterMenuProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  selected: string;
};

export const FooterMenu: React.FC<FooterMenuProps> = ({
  navigation,
  selected,
}) => {
  const {t} = useTranslation();
  const startTimeRef = useRef<number>(performance.now());
  const imageLocal = container.get<ImageLocal>('ImageLocal');

  useEffect(() => {
    const arr = navigation.getState().routes;
    let res: any[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      let check = true;
      for (const item of res) {
        if (item.name === arr[i].name) {
          check = false;
          break;
        }
      }
      if (check) res.unshift(arr[i]);
    }

    navigation.reset({
      index: 0,
      routes: res,
    });
  }, [navigation]);

  // useFocusEffect(() => {
  //   if (navigation.getState().routes.length === 1) return;
  //   const endTime = performance.now();
  //   const transitionTime = endTime - startTimeRef.current;
  //   const arr = navigation.getState().routes;
  //   console.log(
  //     `⏱️ Thời gian chuyển từ ${arr[arr.length - 2].name} sang ${
  //       arr[arr.length - 1].name
  //     } : ${transitionTime.toFixed(2)}ms`,
  //   );

  //   // Reset time nếu bạn quay lại màn này sau đó
  //   startTimeRef.current = performance.now();
  // });

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TabItem
          onPress={() => {
            navigation.navigate('Home');
          }}
          icon={imageLocal.homeIcon}
          label={t('component.footer.label.Home')}
          isSeletcted={selected === 'home'}
        />
        <TabItem
          onPress={() => {
            navigation.navigate('Map');
          }}
          icon={imageLocal.mapIcon}
          label={t('component.footer.label.Map')}
          isSeletcted={selected === 'map'}
        />

        <View style={{ width: 70 }} />

        <TabItem
          onPress={() => {
            navigation.navigate('Trip');
          }}
          icon={imageLocal.tripIcon}
          label={t('component.footer.label.Trip')}
          isSeletcted={selected === 'trip'}
        />
        <TabItem
          onPress={() => {
            navigation.navigate('Menu');
          }}
          icon={imageLocal.menuIcon}
          label={t('component.footer.label.Menu')}
          isSeletcted={selected === 'menu'}
        />
      </View>

      <TouchableOpacity style={styles.centerButton}>
        <Image source={imageLocal.logoMain} style={{ width: 46, height: 46 }} />
        <Text style={styles.centerLabel}>{t('component.footer.label.Travel itinerary')}</Text>
      </TouchableOpacity>
    </View>
  );
};

type TabItemProps = {
  icon: any;
  label: string;
  isSeletcted: boolean;
  onPress: () => void;
};

const TabItem: React.FC<TabItemProps> = ({
  icon,
  label,
  isSeletcted,
  onPress,
}) => {
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  const fadeAnim = useAnimatedValue(0);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.tabItem,
        isSeletcted && {
          transform: [
            {
              scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.25, 1],
              }),
            },
          ],
        },
      ]}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={[
          { width: 24, height: 24 },
          { tintColor: isSeletcted ? '#81BA41' : '#637381' },
        ]}
      />
      <Text
        style={[styles.label, { color: isSeletcted ? '#81BA41' : '#637381' }]}
      >
        {label}
      </Text>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    position: 'absolute',
    bottom: 28,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(145, 158, 171, 0.25)',

    elevation: 12,
    shadowColor: 'rgba(145, 158, 171, 0.70)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 10,
    color: '#6E7A8A',
  },
  centerButton: {
    position: 'absolute',
    top: -30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabel: {
    position: 'absolute',
    bottom: -10,
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
    color: '#81BA41',
  },
});
