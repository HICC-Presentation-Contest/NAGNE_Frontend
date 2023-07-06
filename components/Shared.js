import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('screen').height;

export const getToken = async () => {
  let token = await AsyncStorage.getItem('token');
  if (token) {
    return JSON.parse(token);
  } else {
    console.log('토큰 발급이 안되어있는뎁쇼?');
  }
};
