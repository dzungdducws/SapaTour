import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FooterMenu } from '../components/FooterMenu';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Header } from '../components/Header';

type TripScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Trip'>;
};

const TripScreen = ({ navigation }: TripScreenProps) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <FooterMenu navigation={navigation} selected={'trip'} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
export default TripScreen;
