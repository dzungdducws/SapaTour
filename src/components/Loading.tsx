import { View, Text, ActivityIndicator } from 'react-native';

export const Loading: React.FC = ({}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50,
      }}
    >
      <View
        style={{
          width: 150,
          height: 150,
          borderRadius: 1000,
        }}
      >
        <ActivityIndicator size={150} />
        <Text
          style={{
            position: 'absolute',
            fontSize: 20,
            fontWeight: 500,
            top: '50%',
            left: '50%',
            transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
          }}
        >
          Đang tải...
        </Text>
      </View>
    </View>
  );
};
