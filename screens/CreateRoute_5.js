import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, ButtonText, CreateRouteLayout } from '../components/CreateRoute_Shared';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { styled } from 'styled-components/native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { captureRef } from 'react-native-view-shot';
import { View, Text } from 'react-native';
import { Platform } from 'react-native';
import { AuthContext } from '../components/AuthProvider';
import { colors } from '../colors';

const MapContainer = styled.View`
  margin-top: 40px;
  elevation: 9;
  background-color: white;
  width: 300px;
  height: 400px;
`;

const BackButton = styled.TouchableOpacity`
  padding: 16px;
  margin-bottom: 120px;
`;
const BackText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: ${colors.highlight};
`;
const ResultText = styled.Text`
  margin-top: 64px;
  font-weight: 900;
  font-size: 24px;
  color: black;
`;

const CreateRoute_5 = ({ route, navigation }) => {
  const { token, setToken } = useContext(AuthContext);
  let url = 'http://3.37.189.80/trip';
  const uploadDatas = async (hashtag, title, region, locations, Thumbnail) => {
    const processData = async () => {
      const routeData = new FormData();
      routeData.append('address', region);
      routeData.append('title', title);
      routeData.append('tag[0].name', hashtag);
      const fileType = Thumbnail.split('.').pop();
      const newThumbFileName = `${FileSystem.documentDirectory}tripImage.${fileType}`;
      await FileSystem.copyAsync({ from: Thumbnail, to: newThumbFileName }).then(
        routeData.append(`tripImage`, {
          uri: newThumbFileName,
          type: `image/${fileType}`,
          name: `photo.${fileType}`,
        }),
      );
      for (let i = 0; i < locations.length; i++) {
        routeData.append(`locationInfo[${i}].address`, locations[i].name);
        const fileType = locations[i].image.split('.').pop();
        const newFileName = `${FileSystem.documentDirectory}image${i}.${fileType}`;
        await FileSystem.copyAsync({ from: locations[i].image, to: newFileName }).then(
          routeData.append(`locationInfo[${i}].locationImage`, {
            uri: newFileName,
            type: `image/${fileType}`,
            name: `photo.${fileType}`,
          }),
        );
        routeData.append(`locationInfo[${i}].longitude`, locations[i].coord.longitude.toString());
        routeData.append(`locationInfo[${i}].latitude`, locations[i].coord.latitude.toString());
        routeData.append(`locationInfo[${i}].description`, locations[i].description);
        routeData.append(`locationInfo[${i}].sequence`, (i + 1).toString());
      }
      return routeData;
    };

    try {
      console.log('Token:', token);
      await processData().then(formData => {
        console.log(formData);
        axios
          .post(url, formData, {
            headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
          })
          .then(response => console.log('response for createRoute', response.config.data));
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const takeSnapshot = async () => {
    try {
      const result = await captureRef(mapRef, {
        format: 'jpg',
        quality: 0.8,
      });
      if (Platform.OS == 'ios') {
        let newResult = 'file://' + result;
        return newResult;
      } else {
        return result;
      }
    } catch (error) {
      console.error('Error taking map snapshot:', error);
    }
  };
  let coordinates = [];
  let locations = route.params.locations;
  for (let i = 0; i < locations.length; i++) {
    coordinates.push({ latitude: locations[i].coord.latitude, longitude: locations[i].coord.longitude });
  }
  const initLatitude = coordinates.reduce((prev, curr) => prev + curr.latitude, 0) / coordinates.length;
  const initLongitude = coordinates.reduce((prev, curr) => prev + curr.longitude, 0) / coordinates.length;
  const adjustMapView = () => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 64, right: 64, bottom: 64, left: 64 },
        animated: true,
      });
    }
  };
  useEffect(() => {
    let title = route.params.title;
    let region = route.params.region;
    let hashtag = route.params.hashtag;
    let locations = route.params.locations;
    setTimeout(() => {
      takeSnapshot().then(result => uploadDatas(hashtag, title, region.name, locations, result));
    }, 1000);
  }, []);

  const mapRef = useRef(null);
  const goBackHome = () => {
    navigation.reset({ routes: [{ name: 'HomeNav' }] });
  };

  return (
    <CreateRouteLayout style={{ justifyContent: 'space-between' }}>
      <MapContainer>
        <MapView
          ref={mapRef}
          style={{ width: '100%', height: '100%' }}
          onLayout={adjustMapView}
          initialRegion={{
            latitude: initLatitude,
            longitude: initLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_DEFAULT}
        >
          {coordinates.map((coordinate, index) => (
            <Marker key={index} coordinate={coordinate}>
              <View
                style={{
                  backgroundColor: '#0351ea',
                  borderRadius: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 64,
                  height: 64,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>{index + 1}</Text>
              </View>
            </Marker>
          ))}
          <Polyline coordinates={coordinates} strokeWidth={2} strokeColor="#0351ea" />
        </MapView>
      </MapContainer>
      <ResultText>경로작성이 완료되었습니다!</ResultText>
      <BackButton onPress={goBackHome}>
        <BackText>홈화면으로 돌아가기</BackText>
      </BackButton>
    </CreateRouteLayout>
  );
};
export default CreateRoute_5;
