import React from 'react';
import styled from 'styled-components/native';
import { ScreenWidth } from './Shared';
let CardWidth = ScreenWidth * 0.74;
let CardMargin = (ScreenWidth - CardWidth) / 2;
const CardList = styled.FlatList``;
let TextContainerHeight = 88;

const CardContainer = styled.TouchableOpacity`
  width: ${CardWidth}px;
  margin-left: ${CardMargin}px;
  height: ${CardWidth * 1.333 + TextContainerHeight}px;
`;
const Thumbnail = styled.Image`
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  height: ${CardWidth * 1.333}px;
  background-color: white;
`;
const TextContainer = styled.View`
  background-color: #0351ea;
  border-radius: 0px 0px 8px 8px;
  width: 100%;
  height: ${TextContainerHeight}px;
  padding: 12px 16px 12px 16px;
`;
const Title = styled.Text`
  font-weight: bold;
  color: white;
  font-size: 14px;
`;
const Route = styled.Text`
  margin-top: 6px;
  font-weight: 300;
  color: white;
  font-size: 13px;
`;

export default MapThumbnails = props => {
  const renderItem = ({ item, index }) => (
    <CardContainer>
      <Thumbnail style={{ resizeMode: 'contain' }} source={{ uri: item.tripImageUrl }} />
      <TextContainer>
        <Title>{item.title}</Title>
        <Route>{item.locationInfoList.reduce((prev, curr) => prev + ' > ' + curr.placeName, '')}</Route>
      </TextContainer>
    </CardContainer>
  );
  return (
    <CardList
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={{
        paddingRight: 25,
        alignItems: 'center',
      }}
      data={props.data}
      keyExtractor={data => data.tripId}
      renderItem={renderItem}
    />
  );
};
