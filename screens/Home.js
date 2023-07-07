import React, { useContext, useEffect, useState } from 'react';
import MapThumbnails from '../components/MapThumbnails';
import axios from 'axios';
import Header from '../components/Header';
import { styled } from 'styled-components/native';
import { ScreenHeight, ScreenWidth } from '../components/Shared';
import ToogleBase from '../components/Home/ToogleBase';
import * as Location from 'expo-location';
import { WithLocalSvg } from 'react-native-svg';
import LocationIcon from '../assets/images/location.svg';
import { API_KEY } from '../PrivateConfig';

import { AuthContext } from '../components/AuthProvider'; //**

import Back from '../assets/appBack.jpg';
import { Image } from 'react-native';

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  width: ${ScreenWidth}px;
`;
const UpperBase = styled.View`
  align-items: center;
  width: 100%;
  flex-direction: column;
`;
const CardTypeContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 40px;
  flex-direction: row;
  width: 70%;
`;
const ThumbnailsContainer = styled.View`
  height: 520px;
  margin-bottom: 16px;
`;
const LocationContainer = styled.View`
  height: 48px;
  width: 84%;
  border-radius: 4px;
  margin-bottom: 48px;
  flex-direction: row;
  background-color: #eef4ff;
  padding: 0px 12px;
  align-items: center;
`;
const Line = styled.View`
  border: #0351ea 1px solid;
  margin-left: 28px;
  margin-right: 36px;
  height: 18px;
`;
const LocationText = styled.Text`
  font-size: 15px;
  margin-left: 10px;
  font-weight: bold;
  width: 100%;
  color: #0351ea;
`;
const Home = ({ navigation }) => {
  let [myLocationData, setMyLocationData] = useState(null);
  let [popularData, setPopularData] = useState(null);
  let [mode, setMode] = useState(0);
  const [location, setLocation] = useState(null);
  const { token, setToken } = useContext(AuthContext);

  const fetchMyLocationData = async (Token, longitude, latitude, pageable) => {
    try {
      let url = 'http://3.37.189.80/trip';
      const { page, size } = pageable;
      const queryStr = `?longitude=${longitude}&latitude=${latitude}&page=${page}&size=${size}`;
      const response = await axios.get(url + queryStr, { headers: { Authorization: Token } });
      const tripData = response.data.content;
      return tripData;
    } catch (error) {
      console.error('Failed to fetch myLocation data:', Token, error);
    }
  };
  const fetchPopularData = async (Token, longitude, latitude, pageable) => {
    try {
      let url = 'http://3.37.189.80/trip/popularity';
      const { page, size } = pageable;
      const queryStr = `?longitude=${longitude}&latitude=${latitude}&page=${page}&size=${size}`;
      const response = await axios.get(url + queryStr, { headers: { Authorization: Token } });
      const tripData = response.data.content;
      console.log('poluarData Fetched');
      return tripData;
    } catch (error) {
      console.error('Failed to fetch Popular data:', Token, error);
    }
  };

  async function getDistrictFromCoordinates(lat, lng) {
    await axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}&language=ko`)
      .then(response => {
        let city = null;
        let district = null;
        console.log(response);
        if (response.data.status === 'OK') {
          for (const result of response.data.results) {
            for (const ac of result.address_components) {
              if (ac.types.includes('administrative_area_level_1')) {
                city = ac.long_name;
              }
              if (ac.types.includes('political') && ac.types.includes('sublocality')) {
                district = ac.long_name;
              }
              if (city && district) {
                return `${city} ${district}`;
              }
            }
          }
        }
      })
      .then(result => console.log('result', result));
  }
  const navigateToRoutePage = tripId => {
    navigation.navigate('RoutePage', { tripId });
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('Permission to access location was denied');
        return;
      }
      //토큰 받고 난후, 바로 위치정보값을 가져옴
      await Location.getCurrentPositionAsync({}).then(location => {
        //토큰과 위치정보값을 사용하여 나머지 정보들을 가져옴
<<<<<<< HEAD
        const latitude = location.coords.latitude;
        const longitude = -location.coords.longitude;
        // const latitude = 37;
        // const longitude = 126;
=======
        const latitude = parseInt(location.coords.latitude);
        const longitude = parseInt(-location.coords.longitude);
>>>>>>> 2992b1e (homeAddressFix)
        const pageable = { page: 0, size: 20 };
        console.log('현재 사용자 위치:', latitude, longitude, token);
        fetchMyLocationData(token, longitude, latitude, pageable).then(data => setMyLocationData(data));
        fetchPopularData(token, longitude, latitude, pageable).then(data => setPopularData(data));
        getDistrictFromCoordinates(location.coords.latitude, location.coords.longitude);
      });
    })();
  }, [token]);
  return (
    <>
      <Image
        source={Back}
        style={{ resizeMode: 'cover', width: '100%', height: '100%', position: 'absolute' }}
        blurRadius={70}
      />
      <ScreenLayout>
        <Header />
        <UpperBase>
          <CardTypeContainer>
            <ToogleBase onPress={() => setMode(0)} selected={mode == 0} icon={true} text="내 위치" />
            <Line />
            <ToogleBase onPress={() => setMode(1)} selected={mode == 1} icon={false} text="인기" />
          </CardTypeContainer>
          <ThumbnailsContainer>
            <MapThumbnails parentFunction={navigateToRoutePage} data={mode == 0 ? myLocationData : popularData} />
          </ThumbnailsContainer>
        </UpperBase>
        <LocationContainer>
          <WithLocalSvg style={{ color: '#0351ea' }} width={22} height={22} asset={LocationIcon} />
          {/* <LocationText>{location}</LocationText> */}
          <LocationText>서울특별시 마포구</LocationText>
        </LocationContainer>
      </ScreenLayout>
    </>
  );
};

export default Home;
