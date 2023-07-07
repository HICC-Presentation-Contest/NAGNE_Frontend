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

export const iOSBoxShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.12, // Shadow opacity (0 to 1)
  shadowRadius: 6, // Shadow radius in points
};
