import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { RootStackParamList } from '../types';

const screenWidth = Dimensions.get('window').width;

type FooterMenuProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  selected: string;
};

export const FooterMenu: React.FC<FooterMenuProps> = ({
  navigation,
  selected,
}) => {
  const homeIcon = require('../../assets/img/icon/home.png');
  const mapIcon = require('../../assets/img/icon/map-trifold.png');
  const logoMain = require('../../assets/img/Logo-Main.png');
  const tripIcon = require('../../assets/img/icon/suitcase-rolling.png');
  const menuIcon = require('../../assets/img/icon/list.png');

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TabItem
          onPress={() => {
            navigation.navigate('Home');
          }}
          icon={homeIcon}
          label="Trang chủ"
          isSeletcted={selected === 'home'}
        />
        <TabItem
          onPress={() => {
            navigation.navigate('Map');
          }}
          icon={mapIcon}
          label="Bản đồ"
          isSeletcted={selected === 'map'}
        />

        <View style={{ width: 70 }} />

        <TabItem
          onPress={() => {
            navigation.navigate('Trip');
          }}
          icon={tripIcon}
          label="Chuyến đi"
          isSeletcted={selected === 'trip'}
        />
        <TabItem
          onPress={() => {
            navigation.navigate('Menu');
          }}
          icon={menuIcon}
          label="Menu"
          isSeletcted={selected === 'menu'}
        />
      </View>

      <TouchableOpacity style={styles.centerButton}>
        <Image source={logoMain} style={{ width: 46, height: 46 }} />
        <Text style={styles.centerLabel}>Lộ trình du lịch</Text>
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
}) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
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
  </TouchableOpacity>
);

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
