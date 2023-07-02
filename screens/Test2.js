import React, { useRef } from 'react';
import { Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { CreateRouteLayout } from '../components/CreateRoute_Shared';

export default Test2 = () => {
  const mapRef = useRef(null);
  const coordinates = [
    { latitude: 37.78825, longitude: 126.9084 },
    { latitude: 37.75825, longitude: 126.9092 },
    { latitude: 37.72825, longitude: 126.907 },
  ];
  return (
    <CreateRouteLayout>
      <MapView
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: 37.559,
          longitude: 126.9084,
          latitudeDelta: 0.018289,
          longitudeDelta: 0.010928,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {coordinates.map((coordinate, index) => (
          <Marker key={index} coordinate={coordinate}>
            <MapView.Callout>
              <Text>{index + 1}</Text>
            </MapView.Callout>
          </Marker>
        ))}
      </MapView>
    </CreateRouteLayout>
  );
};
