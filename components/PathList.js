import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { ScreenWidth } from './Shared';

const CardContainer = styled.View`
  width: ${ScreenWidth - 32}px;
  height: 240px;
  margin-bottom: 16px;
  background-color: #f7faff;
  border-radius: 6px;
  border: #d9d9d9 1px;
`;
const Thumbnail = styled.Image`
  flex: 1;
  width: 100%;
  background-color: white;
`;
const Title = styled.Text`
  font-weight: 500;
  color: black;
  font-size: 14px;
  padding: 12px 16px;
`;
const Description = styled.Text`
  font-weight: 400;
  color: black;
  font-size: 12px;
  padding: 12px 16px;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export default PathList = ({ data }) => {
  console.log(data);
  const renderItem = ({ item, index }) => (
    <CardContainer key={index}>
      <TitleContainer>
        <Title>{item.sequence}번째 장소</Title>
        <Title>{item.place}</Title>
      </TitleContainer>
      <Thumbnail style={{ resizeMode: 'contain' }} source={{ uri: item.imageUrl }} />
      <Description>{item.description}</Description>
    </CardContainer>
  );
  return (
    <FlatList
      style={{ width: '100%' }}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      data={data.locationInfo}
      keyExtractor={data => data.userId}
      renderItem={renderItem}
    />
  );
};
