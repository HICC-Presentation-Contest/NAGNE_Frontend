import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ButtonText } from '../components/CreateRoute_Shared';

WebBrowser.maybeCompleteAuthSession();

const Auth = ({ parentFunction }) => {
  const androidClientId = '960989891259-cd3e0f1r6e41bu4la3t8h3ufrp4iqgo8.apps.googleusercontent.com';
  const webClientId = '960989891259-63edtm97k3hq6t8j84q13p14mg60fpv7.apps.googleusercontent.com';
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  const handleLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await AuthSession.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${webClientId}&redirect_uri=${encodeURIComponent(
        redirectUri,
      )}&response_type=code&scope=email%20profile%20openid`,
    });
    if (response?.type === 'success') {
      if (!token) {
        console.log(response);
        await AsyncStorage.setItem('token', response.params.code);
      } else {
        console.log(response);
        console.log('user 존재함:', response.params.code);
      }
      console.log('로그인 성공, 현재 토큰:', response.params.code);
      parentFunction();
    } else {
      console.error('로그인 오류');
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

export default Auth;
