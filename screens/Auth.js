import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ButtonText } from '../components/CreateRoute_Shared';
import axios from 'axios';
import { saveToken } from '../PrivateConfig';
import { getToken, iOSBoxShadow } from '../components/Shared';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';
import styled from 'styled-components/native';
import { colors } from '../colors';
import loginImage from '../assets/images/google.png';

WebBrowser.maybeCompleteAuthSession();
const addToken = async (code, setToken) => {
  let url = `http://3.37.189.80/login/oauth2/google/access-token`;
  const queryStr = `?accessToken=${code}`;
  await axios.get(url + queryStr).then(response => {
    // AsyncStorage.setItem('token', JSON.stringify(response.data.accessToken));
    setToken(response.data.accessToken);
    console.log('useContext의 setToken 실행되었음', response.data.accessToken);
  });
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0px 20px;
`;
const LOGOText = styled.Text`
  font-size: 50px;
  font-weight: bold;
  color: ${colors.highlight};
  margin-bottom: 40px;
  margin-top: -80px;
`;
const GoogleImg = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 50px;
`;
const HelloText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-top: 10px;
`;
const WelcomeText = styled.Text`
  font-size: 16px;
  margin-top: 10;
`;
const LoginButton = styled.TouchableOpacity`
  background-color: #f7f7f7;
  padding: 10px 20px;
  border-radius: 20px;
  margin-top: 130px;
  flex-direction: row;
  align-items: center;
  border: ${StyleSheet.hairlineWidth}px #d7d7d7 solid;
  ${iOSBoxShadow}
`;
const LoginText = styled.Text`
  font-size: 16px;
  color: black;
  margin-right: 50px;
`;

const Auth = ({ parentFunction }) => {
  const { token, setToken } = useContext(AuthContext);
  // const androidClientId = '960989891259-cd3e0f1r6e41bu4la3t8h3ufrp4iqgo8.apps.googleusercontent.com';
  const webClientId = '336901540265-8up6724ndjo4aif20k60ua8cs2f94rnd.apps.googleusercontent.com';
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

  const handleLogin = async () => {
    const response = await AuthSession.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${webClientId}&redirect_uri=${encodeURIComponent(
        redirectUri,
      )}&response_type=token&scope=email%20profile%20openid`,
    });
    if (response?.type === 'success') {
      addToken(response.params.access_token, setToken).then(parentFunction());
    } else {
      console.error('로그인 오류');
    }
  };

  return (
    <Container>
      <LOGOText>OpenRoute</LOGOText>
      <HelloText>안녕하세요!</HelloText>
      <WelcomeText>OR에 오신 걸 환영합니다</WelcomeText>
      <LoginButton onPress={handleLogin}>
        <GoogleImg source={loginImage}></GoogleImg>
        <LoginText>구글로 로그인</LoginText>
      </LoginButton>
    </Container>
  );
};

export default Auth;
