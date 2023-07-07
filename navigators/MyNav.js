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
const loggedInUserId = 7;

export default function MyNav() {
  // const [userId, setUserId] = useState();

  // const fetchUserInfo = async token => {
  //   try {
  //     let url = `http://3.37.189.80/user`;
  //     const response = await axios.get(url, { headers: { Authorization: token } });

  //     console.log(response.data);
  //     setUserId(response.data.userId);
  //   } catch (error) {
  //     console.log('유저정보 가져오기');

  //     console.error('Failed to fetch info data:', error);
  //   }
  // };

  // useEffect(() => {
  //   getToken().then(token => {
  //     console.log(token);
  //     fetchUserInfo(token);
  //   });
  // }, []);
  // console.log('유저 Id :', userId);

  // useEffect(() => {
  //   getToken().then(token => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(`http://3.37.189.80/user`, {
  //           headers: { Authorization: token },
  //         });
  //         console.log(response.data);
  //         setUserId(response.data.userId);

  //         // Perform necessary actions with the response data
  //       } catch (error) {
  //         console.error(error); // Error handling
  //       }
  //     };
  //     fetchData();
  //   });
  // }, []);

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
