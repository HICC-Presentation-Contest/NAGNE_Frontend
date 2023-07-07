import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import RoutePage from '../screens/RoutePage';
import CreateRouteNav from './CreateRouteNav';

const Stack = createStackNavigator();

export default function HomeNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CreateRoute" component={CreateRouteNav}/>
      <Stack.Screen name="RoutePage" component={RoutePage} />
    </Stack.Navigator>
  );
}
