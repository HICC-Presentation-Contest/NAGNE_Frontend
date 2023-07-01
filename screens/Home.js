import React, { useEffect } from 'react';
import Frame from '../assets/FIRST_1.png';
import { Image } from 'react-native';
import CardSection from '../components/CardSection';
import axios from 'axios';
import Header from '../components/Header';
import { styled } from 'styled-components/native';
import { ScreenHeight, ScreenWidth } from '../components/Shared';

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  height: 100%;
  margin-top: 8%;
  border: 1px;
`;

const Home = () => {
  let cardsData = [
    {
      id: 1,
      text: 'hello1',
    },
    {
      id: 2,
      text: 'hello2',
    },
    {
      id: 3,
      text: 'hello3',
    },
    {
      id: 4,
      text: 'hello4',
    },
  ];
  let JWTToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODgxMzExODMsImV4cCI6MTY4ODczNTk4Mywic3ViIjoibmVvc2VsZjExMDVAZ21haWwuY29tIiwiVE9LRU5fVFlQRSI6IkFDQ0VTU19UT0tFTiJ9.rBuCHKreXBfSE49AQtqnmLvB15zKBhMUCj4xnV6Cv_W-gyhJW2hA9iFYTnVPhIlLXTymo04FqKhsI03A9bziBg';

  // const fetchTripData = async (address, pageable) => {
  //     try {
  //     const { page, size } = pageable;
  //     const queryStr = `?address=${address}&page=${page}&size=${size}`;
  //     const response = await axios.get(url + queryStr, { headers: {"Authorization" : `Bearer ${JWTToken}`}}).then()
  //     const tripData = response.data;
  //     console.log('Successfully fetched trip data:', tripData);
  //     } catch (error) {
  //     console.error('Failed to fetch trip data:',error.response);
  //     }
  // };
  // http://3.37.189.80/trip/search/address?address=%EC%98%81%EB%93%B1%ED%8F%AC&page=0&size=10

  //여기부터
  let url = 'http://3.37.189.80/trip/search/address';
  const fetchTripData = async address => {
    try {
      const queryStr = `?address=${address}&page=0&size=10`;
      const response = await axios.get(url + queryStr, { headers: { Authorization: `Bearer ${JWTToken}` } }).then();
      const tripData = response.data;
      console.log('Successfully fetched trip data:', tripData);
    } catch (error) {
      console.error('Failed to fetch trip data:', error.response);
    }
  };

  //   //백엔드에서 데이터 가져오는 구문
  //   useEffect(() => {
  //     const exampleAddress = '영등포구';
  //     fetchTripData(exampleAddress);
  //   }, []);
  //여기까지
  return (
    <>
      <Image
        source={Frame}
        style={{ width: ScreenWidth, height: ScreenHeight, position: 'absolute', marginTop: 28, opacity: 0.2 }}
      />
      <ScreenLayout>
        <Header />
        <CardSection data={cardsData} />
      </ScreenLayout>
    </>
  );
};

export default Home;
