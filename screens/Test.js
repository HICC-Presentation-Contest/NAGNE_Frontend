import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import ViewShot, { captureRef } from 'react-native-view-shot';
import styled from 'styled-components/native';
import { CreateRouteLayout } from '../components/CreateRoute_Shared';

const MarkerBase = styled.View`
  background-color: #0351ea;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
`;
const MarkerText = styled.Text`
  color: white;
  font-weight: 800;
`;

export default function Test() {
  const [mapSnapshot, setMapSnapshot] = useState(null);
  const mapRef = useRef(null);
  const coordinates = [
    { latitude: 37.78825, longitude: 126.9084 },
    { latitude: 37.75825, longitude: 126.9092 },
    { latitude: 37.72825, longitude: 126.907 },
  ];
  const takeSnapshot = async () => {
    try {
      const result = await captureRef(mapRef, {
        format: 'jpg',
        quality: 0.8,
      });
      setMapSnapshot(result);
      console.log('success');
    } catch (error) {
      console.error('Error taking map snapshot:', error);
    }
  };
  useEffect(() => {
    setTimeout(() => takeSnapshot(), 500);
    console.log(coordinates.length);
  }, []);
  return (
    <>
      {/* {mapSnapshot ? (
        <View style={{ width: '50%', height: '50%' }}>
          <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: mapSnapshot }} />
        </View>
      ) : (
        <ViewShot style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            style={{ width: '100%', height: '100%', flex: 1 }}
            initialRegion={{
              latitude: 37.559,
              longitude: 126.9084,
              latitudeDelta: 0.018289,
              longitudeDelta: 0.010928,
            }}
            provider={PROVIDER_GOOGLE}
          ></MapView>
        </ViewShot>
      )} */}
      <MapView
        style={{ flex: 1 }}
        ref={mapRef}
        initialRegion={{
          latitude: 37.78825,
          longitude: 126.9092,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
                elevation: 3,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>{index + 1}</Text>
            </View>
          </Marker>
        ))}
        <Polyline coordinates={coordinates} strokeWidth={3} strokeColor="blue" />
      </MapView>
    </>
  );
}
