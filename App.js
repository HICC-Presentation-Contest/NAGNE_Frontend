import LoggedInNav from './navigators/LoggedInNav';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useState } from 'react';
import Auth from './screens/Auth';
import AppLoading from 'expo-app-loading';
import { AuthProvider } from './components/AuthProvider';

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
  const preload = async () => {};

  if (loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
  }

  const Login = () => {
    setLoggedIn(true);
  };
  return (
    <AuthProvider>
      <NavigationContainer theme={MyTheme}>
        {loggedIn ? <LoggedInNav /> : <Auth parentFunction={Login} />}
      </NavigationContainer>
    </AuthProvider>
  );
}
