import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import DriversList from './src/screens/DriversList';
import DriverDetail from './src/screens/DriverDetail';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DriversList" screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="DriversList" 
          component={DriversList} 
        />
        <Stack.Screen 
          name="DriverDetail" 
          component={DriverDetail} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;