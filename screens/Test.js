import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ButtonText } from '../components/CreateRoute_Shared';

WebBrowser.maybeCompleteAuthSession();

const Test = () => {
  const [accessToken, setAccessToken] = useState(null);
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  const handleLogin = async () => {
    const response = await AuthSession.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=336901540265-8up6724ndjo4aif20k60ua8cs2f94rnd.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(
        redirectUri,
      )}&response_type=code&scope=email%20profile%20openid`,
    });

    if (response.type === 'success') {
      setAccessToken(response.params.access_token);
    } else {
      console.error('로그인 오류: ', response.error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={handleLogin}>
        <ButtonText>Sign in with Google</ButtonText>
      </Button>
    </View>
  );
};

export default Test;
