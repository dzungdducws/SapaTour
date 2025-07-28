// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';
import { Provider } from 'react-redux';

const App = () => {
  if (__DEV__) {
    require('./src/devtools/ReactotronConfig');
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
