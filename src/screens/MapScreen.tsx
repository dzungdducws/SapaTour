import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FooterMenu } from '../components/FooterMenu';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Header } from '../components/Header';
import { ThongTinThanhToanModal } from '../components/ThongTinThanhToanModal';

type MapScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Map'>;
};

const MapScreen = ({ navigation }: MapScreenProps) => {
  useEffect(() => {
    const start = performance.now();
    return () => {
      console.log(
        `[MapScreen] mount -> ${(performance.now() - start).toFixed(2)}ms`,
      );
    };
  }, []);

  const [showModal2, setShowModal2] = useState(false);

  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      <Button
        title="Test Modal"
        onPress={() => {
          setShowModal2(true);
        }}
      />
      <ThongTinThanhToanModal
        visible={showModal2}
        onClose={() => setShowModal2(false)}
      />
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
