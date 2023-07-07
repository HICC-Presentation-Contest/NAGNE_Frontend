import React, { useRef } from 'react';
import { Animated, Platform } from 'react-native';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { iOSBoxShadow, ScreenWidth } from './Shared';
let CardWidth = ScreenWidth * 0.74;
let CardMargin = (ScreenWidth - CardWidth) / 2;
let TextContainerHeight = 88;
const CustomView = styled.View`
  background-color: ${Platform.select({
    ios: 'blue', // iOS 플랫폼에 적용할 색상
    android: 'red', // Android 플랫폼에 적용할 색상
    default: 'purple', // 기타 플랫폼에 적용할 색상
  })};
  padding: 20px;
`;

const CardContainer = styled.TouchableOpacity`
  width: ${CardWidth}px;
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

export default MapThumbnails = ({ ...props }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleCardPress = tripId => {
    props.parentFunction(tripId);
  };
  const renderItem = ({ item, index }) => {
    const inputRange = [-1, 0, CardWidth * index, CardWidth * (index + 4)];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.98, 1, 0],
    });
    return (
      <Animated.View
        style={[
          {
            transform: [{ scale }],
            backgroundColor: 'white',
            width: CardWidth,
            height: '100%',
            marginRight: CardMargin - 24,
            borderRadius: 8,
          },
          Platform.select({ ios: iOSBoxShadow, android: { elevation: 10 } }),
        ]}
      >
        <CardContainer
          // style={{ shadowColor: '#fff', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 24 }}
          onPress={() => handleCardPress(item.tripId)}
        >
          <Thumbnail style={{ resizeMode: 'contain' }} source={{ uri: item.tripImageUrl }} />
          <TextContainer>
            <Title>{item.title}</Title>
            <Route>{item.locationInfoList.reduce((prev, curr) => prev + ' > ' + curr.placeName, '')}</Route>
          </TextContainer>
        </CardContainer>
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      horizontal={true}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={{
        paddingLeft: 28,
        alignItems: 'center',
      }}
      data={props.data}
      keyExtractor={data => data.tripId}
      renderItem={renderItem}
    />
  );
};
