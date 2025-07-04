// src/screens/ProfileScreen.tsx
import React from 'react';
import { Text, View, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
  route: RouteProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is {route.params.name}'s profile</Text>

      <Button
        onPress={() => {
          navigation.navigate('Home');
        }}
        title="Go to Home"
      />

      {/* <Button
        onPress={() => {
          navigation.navigate('OneScreen');
        }}
        title="Go to 1"
      /> */}
    </View>
  );
};

export default ProfileScreen;
