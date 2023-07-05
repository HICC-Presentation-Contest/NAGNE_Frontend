import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export default function Welcome({ navigation }) {
  const goToMyPage = () => navigation.navigate('MyPage', { userId: '2' });

  useEffect(() => {
    goToMyPage();
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyPage', { userId: '2' })}>
      <Text>welcome</Text>
    </TouchableOpacity>
  );
}
