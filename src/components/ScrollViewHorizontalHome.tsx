import { ScrollView, Text, TouchableOpacity } from 'react-native';

type ScrollViewHorizontalHomeProps = {
  list: string[];
  indexOfChoose: number;
  func: (index: number) => void;
};

const ScrollViewHorizontalHome: React.FC<ScrollViewHorizontalHomeProps> = ({
  list,
  indexOfChoose,
  func,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 12,
        paddingRight: 16,
      }}
    >
      {list.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            func(index);
          }}
          style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 50,
            backgroundColor: indexOfChoose === index ? '#81BA41' : '#919EAB29',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              lineHeight: 22,
              fontWeight: 400,
              color: indexOfChoose === index ? '#ffffff' : '#000000',
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ScrollViewHorizontalHome;
