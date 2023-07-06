import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components/native';
import { getToken, ScreenHeight, ScreenWidth } from '../components/Shared';
import axios from 'axios';
import leftArrow from '../assets/images/left_arrow.png';
import Header from '../components/Header';
import RoutePageHeader from '../components/RoutePageHeader';
import { WithLocalSvg } from 'react-native-svg';
import PathList from '../components/PathList';
import Bookmark from '../assets/images/bookmark_Active.svg';

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
  padding: 0px 24px;
`;
const TitleText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #0351ea;
`;
const BookmarkContainer = styled.TouchableOpacity`
  flex-direction: row;
`;
const BookmarkText = styled.Text`
  font-size: 16px;
  color: #0351ea;
  font-weight: 500;
  margin-right: 8px;
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
const RoutePage = ({ route, navigation }) => {
  let [data, setData] = useState('');
  let [follow, setFollow] = useState(false);
  let [bookmarked, setBookmarked] = useState(false);
  let [bookmarkCount, setBookmarkCount] = useState('');
  const handleBookmarkPressed = async (token, tripId) => {
    setBookmarked(bookmarked => !bookmarked);
    const routeData = new FormData();
    routeData.append('tripId', tripId);
    await axios
      .post(`http://3.37.189.80/bookmark?tripId=${tripId}`, routeData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
      })
      .then(result => console.log(result));
  };
  const fetchBookmarkCount = async (token, tripId) => {
    let url = `http://3.37.189.80/bookmark/count`;
    const queryStr = `?tripId=${tripId}`;
    await axios
      .get(url + queryStr, { headers: { Authorization: token } })
      .then(result => setBookmarkCount(result.data.bookMarkCount));
  };
  const fetchBookmarked = async (token, tripId) => {
    let url = `http://3.37.189.80/bookmark/check`;
    const queryStr = `?tripId=${tripId}`;
    await axios
      .get(url + queryStr, { headers: { Authorization: token } })
      .then(result => setBookmarked(result.data.bookMark));
  };
  const fetchTripInfo = async (token, tripId) => {
    try {
      let url = `http://3.37.189.80/trip/${tripId}`;
      const response = await axios.get(url, { headers: { Authorization: token } });
      const tripData = response.data;
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
    getToken().then(token => {
      fetchBookmarkCount(token, tripId);
      fetchBookmarked(token, tripId);
      fetchTripInfo(token, tripId).then(data => setData(data));
    });
  }, []);
  //console.log(data.locationInfo.map(item => console.log(item.place)));
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <ScreenLayout>
        <RoutePageHeader onPressBack={goBack} userId={data.username} followed={follow} onPress={toggleFollow} />
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
          <BookmarkContainer onPress={() => handleBookmarkPressed(route.params.tripId)}>
            <BookmarkText>{bookmarkCount}</BookmarkText>
            <WithLocalSvg style={bookmarked && { color: '#0351ea' }} width={26} height={26} asset={Bookmark} />
          </BookmarkContainer>
        </TitleContainer>
      </ScreenLayout>
    </>
  );
};

export default RoutePage;
