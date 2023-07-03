import React, { useEffect } from 'react';
import styled from 'styled-components/native';

export default function Welcome({ navigation }) {
  const goToMyPage = () => navigation.navigate('MyPage', { userId: '2' });

  useEffect(() => {
    goToMyPage();
  }, []);

  return;
}
