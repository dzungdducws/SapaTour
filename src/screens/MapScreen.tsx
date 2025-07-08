import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FooterMenu } from '../components/FooterMenu';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Header } from '../components/Header';

type MapScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Map'>;
};

const MapScreen = ({ navigation }: MapScreenProps) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <Text>Map</Text>
      <FooterMenu navigation={navigation} selected={'map'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default MapScreen;
