import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '../screens/MyPage';
import Follower from '../screens/Follower';
import Following from '../screens/Following';
import userInfo from '../dummy/userInfo.json';
import { Image } from 'react-native';
import LoggedInNav from './LoggedInNav';
import Welcome from '../screens/Welcome';

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
      <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
      <Stack.Screen
        name="MyPage"
        options={{
          headerShown: true,
          headerBackVisible: false,
          title: userInfo.name,
          headerTitleAlign: 'left',
          headerLeft: null,
          headerRight: () => (
            <Image
              source={require('../assets/alarm.png')}
              style={{ width: 24, height: 24, marginRight: 15 }}
              resizeMode="contain"
            />
          ),
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
      <Stack.Screen name="LoggedInNav" component={LoggedInNav} />
    </Stack.Navigator>
  );
}
