import React from 'react';
import { WithLocalSvg } from 'react-native-svg';
import styled from 'styled-components/native';
import Popular from '../../assets/images/popular_Active.svg';
import Position from '../../assets/images/position_Active.svg';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  /* background-color: chartreuse; */
  width: 80px;
  /* justify-content: space-between; */
`;
const ModeText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
`;
const ToogleBase = ({ selected, icon, text, onPress }) => {
  return (
    <Container onPress={onPress}>
      <WithLocalSvg
        style={selected ? { color: '#0351EA' } : { color: '#B7B7B7' }}
        width={24}
        height={24}
        asset={icon ? Position : Popular}
      />
      <ModeText style={selected ? { fontWeight: 800, color: '#0351EA' } : { fontWeight: 400, color: '#B7B7B7' }}>
        {text}
      </ModeText>
    </Container>
  );
};

export default ToogleBase;
