// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TripScreen from '../screens/TripScreen';
import MenuScreen from '../screens/MenuScreen';
import MapScreen from '../screens/MapScreen';
import DetailInMenu from '../screens/DetailInMenu.tsx';
import DetailInfoHotelBookingScreen from '../screens/DetailInfoHotelBookingScreen.tsx';
import DetailInfoRestaurantBookingScreen from '../screens/DetailInfoRestaurantBookingScreen.tsx';

import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Trip" component={TripScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="DetailInfoHotelBooking"
        component={DetailInfoHotelBookingScreen}
      />
      <Stack.Screen
        name="DetailInfoRestaurantBooking"
        component={DetailInfoRestaurantBookingScreen}
      />

      <Stack.Screen name="RouteInMenu" component={DetailInMenu} />
      <Stack.Screen name="HeartInMenu" component={DetailInMenu} />
      <Stack.Screen name="OrderInMenu" component={DetailInMenu} />
      <Stack.Screen name="PromotionInMenu" component={DetailInMenu} />
      <Stack.Screen name="WeatherInMenu" component={DetailInMenu} />
      <Stack.Screen name="SupportInMenu" component={DetailInMenu} />
      <Stack.Screen name="ContactInMenu" component={DetailInMenu} />
      <Stack.Screen name="SuggestInMenu" component={DetailInMenu} />
      <Stack.Screen name="LanguageInMenu" component={DetailInMenu} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
