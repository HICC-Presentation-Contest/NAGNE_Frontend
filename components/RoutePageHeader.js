import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import leftArrow from '../assets/images/left_arrow.png';

import { styled } from 'styled-components/native';
import { Image } from 'react-native';

const Container = styled.SafeAreaView`
  width: 100%;
  opacity: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const BackButton = styled.TouchableOpacity`
  width: 48px;
  height: 64px;
  justify-content: center;
  align-items: center;
`;
const FollowButton = styled.TouchableOpacity`
  height: 50%;
  width: 72px;
  height: 36px;
  border: #747474;
  color: black;
  margin-right: 8px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
`;
const FollowText = styled.Text`
  color: black;
  font-size: 12px;
`;
const UserText = styled.Text`
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 18px;
  font-weight: bold;
  width: 50%;
  text-align: center;
  left: 25%;
`;
const RoutePageHeader = ({ userId, followed, onPress }) => {
  const handleClick = () => {
    onPress();
  };
  return (
    <Container>
      <BackButton>
        <Image style={{ width: 28, height: 28 }} source={leftArrow}></Image>
      </BackButton>
      <FollowButton style={followed && { backgroundColor: '#0351EA' }} onPress={handleClick}>
        <FollowText style={followed && { color: 'white' }}>{followed ? '언팔로우' : '팔로우'}</FollowText>
      </FollowButton>
      <UserText>{userId}</UserText>
    </Container>
  );
};

export default RoutePageHeader;
