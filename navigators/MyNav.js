import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '../screens/MyPage';
import Follower from '../screens/Follower';
import Following from '../screens/Following';
import userInfo from '../dummy/userInfo.json';
import { Image } from 'react-native';

const Stack = createStackNavigator();
const loggedInUserId = 7;

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
          headerBackImage: () => <Ionicons name="chevron-back" size={24} color="black" />,
        }}
        component={MyPage}
        initialParams={{ userId: 7 }}
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
