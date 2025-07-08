import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ItemMenuProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  icon: any;
  text: string;
  detail: string;
  mustLogin: boolean;
  isLogin: boolean;
};

export const ItemMenu: React.FC<ItemMenuProps> = ({
  navigation,
  icon,
  text,
  detail,
  mustLogin,
  isLogin,
}) => {
  const caret_right = require('../../assets/img/icon/caret-right.png');
  const handlePress = () => {
    // navigation.navigate(detail);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.item}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
          <Text style={styles.text}>{text}</Text>
        </View>
        <Image source={caret_right} style={styles.right_chevron} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 0.25,
    borderColor: '#E8E8E8',
    shadowColor: '#919EAB1F',
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 2,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  right_chevron: {
    width: 24,
    height: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
