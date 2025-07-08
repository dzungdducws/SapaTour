// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/contexts/UserContext';

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
