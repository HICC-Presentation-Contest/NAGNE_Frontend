import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { CreateRouteLayout } from '../components/CreateRoute_Shared';

export default function Test() {
  const [mapSnapshot, setMapSnapshot] = useState(null);
  const mapRef = useRef(null);
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
    takeSnapshot().then(console.log(mapSnapshot));
  }, []);
  return (
    <ViewShot style={{ flex: 1 }}>
      {mapSnapshot ? (
        <View style={{ flex: 1 }}>
          <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: mapSnapshot }} />
        </View>
      ) : (
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
      )}
    </ViewShot>
  );
}
