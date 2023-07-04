import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components/native';
import { ScreenHeight, ScreenWidth } from '../components/Shared';
import axios from 'axios';
import leftArrow from '../assets/images/left_arrow.png';
import Header from '../components/Header';
import RoutePageHeader from '../components/RoutePageHeader';

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: ${ScreenHeight - 80}px;
  margin-top: 8%;
  width: ${ScreenWidth}px;
`;
const RoutePage = ({ route }) => {
  let [data, setData] = useState('');
  let [follow, toggleFollow] = useState(false);
  const fetchTripInfo = async tripId => {
    try {
      let JWTToken =
        'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODg0NjAwMzMsImV4cCI6MTY4OTA2NDgzMywic3ViIjoibmVvc2VsZjExMDVAZ21haWwuY29tIiwiVE9LRU5fVFlQRSI6IkFDQ0VTU19UT0tFTiJ9.EUnyvx1Sk0MPgoOvihGjL_2U-srcR4wLQzOXGh2PMBaslrguB-uh7VQlBWoygUOXhYaVCqKr60yEuQjpglxmbg';
      let url = `http://3.37.189.80/trip/${tripId}`;
      //   const queryStr = `?longitude=${longitude}&latitude=${latitude}&page=${page}&size=${size}`;
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${JWTToken}` } });
      const tripData = response.data;
      console.log(tripData);
      return tripData;
    } catch (error) {
      console.error('Failed to fetch trip data:', error.response);
    }
  };
  useEffect(() => {
    let tripId = route.params.tripId;
    fetchTripInfo(tripId)
      .then(data => setData(data))
      .then(console.log(data));
  }, []);

  return (
    <>
      <ScreenLayout>
        <RoutePageHeader userId={data.username} followed={follow} onPress={() => toggleFollow(!follow)} />
      </ScreenLayout>
    </>
  );
};

export default RoutePage;
