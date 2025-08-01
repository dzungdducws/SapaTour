import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Loading } from '../Loading';
import { screenWidth } from '../../utils/size';

type Props = {
  visible: boolean;
  isTrue: number;
};

export const AuthModal: React.FC<Props> = ({ visible, isTrue }) => {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            width: screenWidth / 2,
            maxHeight: screenWidth / 2,
            borderRadius: 10,
          }}
        >
          {(() => {
            switch (isTrue) {
              case 0:
                return <Loading></Loading>;
              case 1:
                return (
                  <View>
                    <Text>Đăng nhập thành công</Text>
                  </View>
                );
              case 2:
                return (
                  <View>
                    <Text>Thất bại</Text>
                  </View>
                );
            }
          })()}
        </View>
      </View>
    </Modal>
  );
};
