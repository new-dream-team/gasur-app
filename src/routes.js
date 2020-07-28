import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import Navigator from './pages/Navigator';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Main" component={Main} />
        <AppStack.Screen name="Navigator" component={Navigator} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
