import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import RoutePage from '../screens/RoutePage';

const Stack = createStackNavigator();

export default function HomeNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="RoutePage"
        // options={{
        //   title: '팔로워',
        // }}
        component={RoutePage}
      />
    </Stack.Navigator>
  );
}
