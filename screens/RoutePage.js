import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components/native';
import { ScreenHeight, ScreenWidth } from '../components/Shared';
import axios from 'axios';
import leftArrow from '../assets/images/left_arrow.png';
import Header from '../components/Header';
import RoutePageHeader from '../components/RoutePageHeader';
import { WithLocalSvg } from 'react-native-svg';
import PathList from '../components/PathList';

let diagramRadius = 40;
const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: ${ScreenHeight - 80}px;
  margin-top: 8%;
  width: ${ScreenWidth - 32}px;
  margin-left: 16px;
`;
const LocationText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  text-align: left;
`;
const LocationListContainer = styled.View`
  margin-top: 16px;
  width: 100%;
  flex: 1;
`;
const TitleContainer = styled.View`
  height: 56px;
  width: ${ScreenWidth}px;
  background-color: #eef4ff;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
const TitleText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #0351ea;
  margin-left: 24px;
`;
const BookmarkContainer = styled.View``;
const BookmarkText = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;
const SequenceDiagram = styled.View`
  width: ${diagramRadius}px;
  height: ${diagramRadius}px;
  justify-content: center;
  align-items: center;
  background-color: #0351ea;
  border-radius: ${diagramRadius / 2}px;
`;
const SequenceText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 500;
`;
const PlaceListContainer = styled.View`
  margin-top: 24px;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  height: ${diagramRadius * 2}px;
`;
const PlaceText = styled.Text`
  top: ${diagramRadius}px;
  position: absolute;
  /* background-color: chartreuse; */
  width: ${diagramRadius * 2}px;
  text-align: center;
  margin-top: 12px;
  font-size: 13px;
  font-weight: 500;
`;
const PlaceContainer = styled.View`
  margin: 0px 10px;
  align-items: center;
`;
const HorizontalLine = styled.View`
  margin-top: ${diagramRadius / 2}px;
  width: 90%;
  left: 5%;
  position: absolute;
  border: #0351ea 1px solid;
`;
const RoutePage = ({ route }) => {
  let [data, setData] = useState('');
  let [follow, setFollow] = useState(false);
  const fetchTripInfo = async tripId => {
    try {
      let JWTToken =
        'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODg0NjAwMzMsImV4cCI6MTY4OTA2NDgzMywic3ViIjoibmVvc2VsZjExMDVAZ21haWwuY29tIiwiVE9LRU5fVFlQRSI6IkFDQ0VTU19UT0tFTiJ9.EUnyvx1Sk0MPgoOvihGjL_2U-srcR4wLQzOXGh2PMBaslrguB-uh7VQlBWoygUOXhYaVCqKr60yEuQjpglxmbg';
      let url = `http://3.37.189.80/trip/${tripId}`;
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${JWTToken}` } });
      const tripData = response.data;
      console.log(tripData);
      return tripData;
    } catch (error) {
      console.error('Failed to fetch trip data:', error.response);
    }
  };
  const toggleFollow = () => {
    setFollow(!follow);
  };
  useEffect(() => {
    let tripId = route.params.tripId;

    fetchTripInfo(tripId)
      .then(data => setData(data))
      .then(console.log(data));
  }, []);
  //console.log(data.locationInfo.map(item => console.log(item.place)));

  return (
    <>
      <ScreenLayout>
        <RoutePageHeader userId={data.username} followed={follow} onPress={toggleFollow} />
        <LocationText>서울시 {data.address}</LocationText>
        <PlaceListContainer>
          <HorizontalLine />
          {data.locationInfo?.map((item, id) => (
            <PlaceContainer key={id}>
              <SequenceDiagram>
                <SequenceText>{id}</SequenceText>
              </SequenceDiagram>
              <PlaceText>{item.place}</PlaceText>
            </PlaceContainer>
          ))}
        </PlaceListContainer>

        <LocationListContainer>
          <PathList data={data} />
        </LocationListContainer>
        <TitleContainer>
          <TitleText>{data.title}</TitleText>
          <BookmarkContainer>
            <BookmarkText></BookmarkText>
          </BookmarkContainer>
        </TitleContainer>
      </ScreenLayout>
    </>
  );
};

export default RoutePage;
