import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonText, CreateRouteLayout } from '../components/CreateRoute_Shared';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { styled } from 'styled-components/native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { View, Text } from 'react-native';
import { getToken } from '../components/Shared';

const MapContainer = styled.View`
  margin-top: 40px;
  elevation: 9;
  background-color: black;
  /* box-shadow: 24px 16px 16px black; */
  width: 300px;
  height: 400px;
`;

const CreateRoute_5 = ({ route }) => {
  const [mapSnapshot, setMapSnapshot] = useState(null);
  let url = 'http://3.37.189.80/trip';
  const uploadDatas = async (hashtag, title, region, locations, Thumbnail) => {
    const processData = async () => {
      const routeData = new FormData();
      routeData.append('address', region);
      routeData.append('title', title);
      routeData.append('tag[0].name', hashtag);
      console.log(Thumbnail);
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
      const formData = await processData();
      getToken().then(token => {
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
      setMapSnapshot(result);
      return result;
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
        edgePadding: { top: 64, right: 32, bottom: 32, left: 32 },
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
    }, 2000);
  }, []);
  const mapRef = useRef(null);

  return (
    <CreateRouteLayout>
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
          provider={PROVIDER_GOOGLE}
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
      <Button style={{ marginBottom: 80 }}>
        <ButtonText>홈화면으로 돌아가기</ButtonText>
      </Button>
    </CreateRouteLayout>
  );
};
export default CreateRoute_5;
