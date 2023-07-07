import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import RoutePage from '../screens/RoutePage';

import MyPage from '../screens/MyPage';
import Follower from '../screens/Follower';
import Following from '../screens/Following';

const Stack = createStackNavigator();

export default function HomeNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="RoutePage" component={RoutePage} />
      <Stack.Screen
        name="MyPage"
        options={{
          headerShown: true,
          headerBackVisible: false,
          title: '',
          headerTitleAlign: 'left',
          headerLeft: null,
        }}
        component={MyPage}
      />
      <Stack.Screen
        name="Follower"
        options={{
          headerShown: true,
          title: '팔로워',
        }}
        component={Follower}
      />
      <Stack.Screen
        name="Following"
        options={{
          headerShown: true,
          title: '팔로잉',
        }}
        component={Following}
      />
    </Stack.Navigator>
  );
}
