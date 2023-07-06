import React from 'react';
import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ButtonText } from '../components/CreateRoute_Shared';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();
const addToken = async token => {
  let url = `http://3.37.189.80/login/oauth2/google/access-token`;
  const queryStr = `?accessToken=${token}`;
  await axios.get(url + queryStr).then(response => {
    AsyncStorage.setItem('token', JSON.stringify(response.data.accessToken));
    console.log('토큰 AsyncStorage에 저장되었음', JSON.stringify(response.data.accessToken));
  });
};
const Auth = ({ parentFunction }) => {
  // const androidClientId = '960989891259-cd3e0f1r6e41bu4la3t8h3ufrp4iqgo8.apps.googleusercontent.com';
  const webClientId = '336901540265-8up6724ndjo4aif20k60ua8cs2f94rnd.apps.googleusercontent.com';
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

  const handleLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    // console.log(redirectUri);
    const response = await AuthSession.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${webClientId}&redirect_uri=${encodeURIComponent(
        redirectUri,
      )}&response_type=token&scope=email%20profile%20openid`,
    });
    if (response?.type === 'success') {
      if (!token) {
        console.log('새로운 토큰 발급');
        addToken(response.params.access_token).then(parentFunction());
      } else {
        console.log('user에 대한 토큰 저장되어있음, 토큰발급절차 생략', response.params.access_token);
        parentFunction();
      }
    } else {
      console.error('로그인 오류');
    }
  };

  // const fetchAccessToken = async code => {
  //   console.log(code, webClientId, redirectUri, CLIENT_SECRET);
  //   const tokenEndpoint = 'https://www.googleapis.com/oauth2/v4/token';
  //   const body = {
  //     code: code,
  //     client_id: webClientId,
  //     client_secret: CLIENT_SECRET, //문제없
  //     // grant_type='authorization_code'
  //   };

  //   try {
  //     const response = await axios.post(tokenEndpoint, new URLSearchParams(body), {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     });

  //     const { data } = response;
  //     console.log('토큰:', data.access_token);
  //     return data.access_token;
  //   } catch (error) {
  //     console.error('Error fetching access token:', error);
  //   }
  // };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={handleLogin}>
        <ButtonText>Sign in with Google</ButtonText>
      </Button>
    </View>
  );
};

export default Auth;
