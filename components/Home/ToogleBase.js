import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import styled from 'styled-components/native';
import Popular from '../../assets/images/popular_Active.svg';
import Position from '../../assets/images/position_Active.svg';

const Container = styled.View``;
const ModeText = styled.Text``;
const ToogleBase = ({ selected, iconName, text }) => {
  return (
    <Container>
      <WithLocalSvg width={32} height={32} asset={iconName} />
      <ModeText>{text}</ModeText>
    </Container>
  );
};

export default ToogleBase;
