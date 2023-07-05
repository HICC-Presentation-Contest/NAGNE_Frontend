import React, { useEffect, useState } from 'react';
import Frame from '../assets/FIRST_1.png';
import { Image } from 'react-native';
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

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: ${ScreenHeight - 80}px;
  margin-top: 8%;
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
  height: 8%;
  flex-direction: row;
  width: 70%;
`;
const ThumbnailsContainer = styled.View`
  height: 500px;
  margin-top: 24px;
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
  border: 1px solid;
  margin-left: 28px;
  margin-right: 36px;
  color: #0351ea;
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
  let JWTToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODgxMzExODMsImV4cCI6MTY4ODczNTk4Mywic3ViIjoibmVvc2VsZjExMDVAZ21haWwuY29tIiwiVE9LRU5fVFlQRSI6IkFDQ0VTU19UT0tFTiJ9.rBuCHKreXBfSE49AQtqnmLvB15zKBhMUCj4xnV6Cv_W-gyhJW2hA9iFYTnVPhIlLXTymo04FqKhsI03A9bziBg';

  const fetchMyLocationData = async (longitude, latitude, pageable) => {
    try {
      let url = 'http://3.37.189.80/trip';
      const { page, size } = pageable;
      const queryStr = `?longitude=${longitude}&latitude=${latitude}&page=${page}&size=${size}`;
      const response = await axios.get(url + queryStr, { headers: { Authorization: `Bearer ${JWTToken}` } });
      const tripData = response.data.content;
      return tripData;
    } catch (error) {
      console.error('Failed to fetch trip data:', error.response);
    }
  };
  const fetchPopularData = async (longitude, latitude, pageable) => {
    try {
      let url = 'http://3.37.189.80/trip/popularity';
      const { page, size } = pageable;
      const queryStr = `?longitude=${longitude}&latitude=${latitude}&page=${page}&size=${size}`;
      const response = await axios.get(url + queryStr, { headers: { Authorization: `Bearer ${JWTToken}` } });
      const tripData = response.data.content;
      console.log('poluarData Fetched:', tripData);
      return tripData;
    } catch (error) {
      console.error('Failed to fetch trip data:', error.response);
    }
  };

  async function getDistrictFromCoordinates(lat, lng) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}&language=ko`,
    );
    let city = null;
    let district = null;

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

    return null;
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
      let location = await Location.getCurrentPositionAsync({});
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      console.log('현재 사용자 위치:', longitude, latitude);
      const pageable = { page: 0, size: 20 };

      fetchMyLocationData(longitude, latitude, pageable).then(data => setMyLocationData(data));
      fetchPopularData(longitude, latitude, pageable).then(data => setPopularData(data));
      getDistrictFromCoordinates(latitude, longitude).then(district => {
        setLocation(district);
      });
    })();
  }, []);
  return (
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
        <LocationText>{location}</LocationText>
      </LocationContainer>
    </ScreenLayout>
  );
};

export default Home;
