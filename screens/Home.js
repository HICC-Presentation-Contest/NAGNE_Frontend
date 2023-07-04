import React, { useEffect, useState } from 'react';
import Frame from '../assets/FIRST_1.png';
import { Image } from 'react-native';
import MapThumbnails from '../components/CardSection';
import axios from 'axios';
import Header from '../components/Header';
import { styled } from 'styled-components/native';
import { ScreenHeight, ScreenWidth } from '../components/Shared';

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: ${ScreenHeight - 80}px;
  margin-top: 8%;
  width: ${ScreenWidth}px;
`;
const UppderBase = styled.View`
  align-items: center;
  width: 100%;
  flex-direction: column;
`;
const CardTypeContainer = styled.View`
  height: 8%;
  border: 1px solid;
  width: 70%;
`;
const ThumbnailsContainer = styled.View`
  height: 500px;
  margin-top: 24px;
`;
const LocationContainer = styled.View`
  height: 48px;
  width: 90%;
  margin-bottom: 48px;
  background-color: #eef4ff;
  justify-content: center;
  align-items: center;
`;

const LocationText = styled.Text``;
const Home = () => {
  let [data, setData] = useState(null);
  let JWTToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODgxMzExODMsImV4cCI6MTY4ODczNTk4Mywic3ViIjoibmVvc2VsZjExMDVAZ21haWwuY29tIiwiVE9LRU5fVFlQRSI6IkFDQ0VTU19UT0tFTiJ9.rBuCHKreXBfSE49AQtqnmLvB15zKBhMUCj4xnV6Cv_W-gyhJW2hA9iFYTnVPhIlLXTymo04FqKhsI03A9bziBg';

  const fetchTripData = async (longitude, latitude, pageable) => {
    try {
      const { page, size } = pageable;
      const queryStr = `?longitude=${longitude}&latitude=${latitude}&page=${page}&size=${size}`;
      const response = await axios.get(url + queryStr, { headers: { Authorization: `Bearer ${JWTToken}` } });
      const tripData = response.data.content;
      return tripData;
    } catch (error) {
      console.error('Failed to fetch trip data:', error.response);
    }
  };
  //http://3.37.189.80/trip/search/address?address=%EC%98%81%EB%93%B1%ED%8F%AC&page=0&size=10
  //여기부터
  let url = 'http://3.37.189.80/trip';

  //   //백엔드에서 데이터 가져오는 구문
  useEffect(() => {
    const latitude = 37;
    const longitude = 126;
    const pageable = { page: 0, size: 20 };
    fetchTripData(longitude, latitude, pageable).then(data => setData(data));
    console.log('test');
  }, []);
  //여기까지
  return (
    <>
      <Image
        source={Frame}
        style={{ width: ScreenWidth, height: ScreenHeight, position: 'absolute', marginTop: 0, opacity: 0.3 }}
      />
      <ScreenLayout>
        <Header />
        <UppderBase>
          <CardTypeContainer>{/* <ToogleBase */}</CardTypeContainer>
          <ThumbnailsContainer>
            <MapThumbnails data={data} />
          </ThumbnailsContainer>
        </UppderBase>
        <LocationContainer>
          <LocationText>행정구</LocationText>
        </LocationContainer>
      </ScreenLayout>
    </>
  );
};

export default Home;
