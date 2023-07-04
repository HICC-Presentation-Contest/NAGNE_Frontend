import React from 'react';
import LOGO from '../assets/OR.png';
import ALARM from '../assets/alarm.png';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  width: 100%;
  opacity: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3%;
  height: 10%;
`;
const Logo = styled.Image`
  height: 40%;
`;
const Alarm = styled.Image`
  height: 50%;
`;
export default Header = () => {
  return (
    <Container>
      <Logo style={{ resizeMode: 'contain' }} source={LOGO}></Logo>
      <Alarm style={{ resizeMode: 'contain' }} source={ALARM}></Alarm>
    </Container>
  );
};
