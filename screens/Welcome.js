import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

export default function Welcome({ navigation }) {
  const goToMyPage = () => navigation.navigate('MyPage', { userId: '3' });

  useEffect(() => {
    goToMyPage();
  }, []);

  return <Text>welcome</Text>;
}
