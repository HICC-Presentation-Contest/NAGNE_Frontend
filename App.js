import LoggedInNav from './navigators/LoggedInNav';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useState } from 'react';
import Auth from './screens/Auth';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  let [loggedIn, setLoggedIn] = useState(false);
  const preload = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      console.log(token);
      setLoggedIn(true);
    }
  };

  if (loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
  }
  const Login = () => {
    console.log('hi');
    setLoggedIn(true);
  };
  return (
    <>
      <NavigationContainer theme={MyTheme}>
        {loggedIn ? <LoggedInNav /> : <Auth parentFunction={Login} />}
      </NavigationContainer>
    </>
  );
}
