import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Storage from '../screens/Storage';
import RoutePage from '../screens/RoutePage';
import { Title } from '../components/CreateRoute_Shared';
import MyPage from '../screens/MyPage';
import Follower from '../screens/Follower';
import Following from '../screens/Following';

const Stack = createStackNavigator();

export default function StorageNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Storage" options={{ title: '저장한 지도' }} component={Storage} />
      <Stack.Screen name="RoutePage" options={{ headerShown: false }} component={RoutePage} />
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
    </Stack.Navigator>
  );
}
