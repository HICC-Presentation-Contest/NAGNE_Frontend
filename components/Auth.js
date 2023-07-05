import AsyncStorage from '@react-native-async-storage/async-storage';

export const logUserIn = async token => {
  await AsyncStorage.multiSet([
    ['token', JSON.stringify(token)],
    ['loggedIn', JSON.stringify('yes')],
  ]);
};
