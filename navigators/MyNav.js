import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '../screens/MyPage';
import Follower from '../screens/Follower';
import Following from '../screens/Following';
import userInfo from '../dummy/userInfo.json';
import { Image } from 'react-native';
import RoutePage from '../screens/RoutePage';
import { getToken } from '../components/Shared';
import axios from 'axios';

const Stack = createStackNavigator();

export default function MyNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          borderBottomWidth: 0,
        },
      }}
    >
      <Stack.Screen
        name="MyPage"
        options={{
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
          title: '팔로워',
        }}
        component={Follower}
      />
      <Stack.Screen
        name="Following"
        options={{
          title: '팔로잉',
        }}
        component={Following}
      />
      <Stack.Screen
        name="RoutePage"
        options={{
          headerShown: false,
        }}
        component={RoutePage}
      />
    </Stack.Navigator>
  );
}
