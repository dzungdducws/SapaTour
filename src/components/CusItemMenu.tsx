import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

type CusItemMenuProps = {
  index?: number;
  sourceIcon: string;
  Title: string;
  colorBg: string;
};

export const CusItemMenu: React.FC<CusItemMenuProps> = ({
  index,
  sourceIcon,
  Title,
  colorBg,
}) => {
  console.log(sourceIcon);
  

  const AllSourceIcon: any = {
    'Map-Point': require('../../assets/img/icon/Map-Point.png'),
    Building: require('../../assets/img/icon/Building.png'),
    'buildings-2': require('../../assets/img/icon/buildings-2.png'),
    'shopping-cart': require('../../assets/img/icon/shopping-cart.png'),
    fi_18472616: require('../../assets/img/icon/fi_18472616.png'),
  };

  const _sourceIcon =
    AllSourceIcon[sourceIcon] || require('../../assets/img/icon/Map-Point.png');

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: 8,
          paddingBottom: 8,
          height: 36,
          width: 36,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 13,
          backgroundColor: colorBg,
        }}
      >
        <Image source={_sourceIcon} style={{ width: 24, height: 24 }} />
      </View>
      <Text
        style={{
          marginBottom: 8,
          fontSize: 10,
          fontWeight: 400,
          lineHeight: 15,
          letterSpacing: 0,
          textAlign: 'center',
          color: 'black',
        }}
      >
        {Title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
