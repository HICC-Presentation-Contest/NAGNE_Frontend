import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { useState, useEffect } from 'react';
import { View } from 'react-native';

export default function Maps() {
  let [coord, setCoord] = useState(null);
  const [coordName, setCoordName] = useState('');

  const [locations, setLocations] = useState([
    {
      name: '',
      coord: '',
      coordName: '',
      description: '',
      saved: false,
    },
  ]);

  Geocoder.init('AIzaSyAaUkAfVEg4MhR_oH4javLSxywHfOJANBs');
  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from({ latitude, longitude }, { language: 'ko' });

      if (response.results.length > 0) {
        console.log(response.results[0]);
        const address = response.results[0].formatted_address;
        setCoordName(address);
      } else {
        setCoordName('위치명을 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('위치명을 가져오는 중 오류가 발생했습니다:', error);
      setCoordName('위치명을 가져오는 중 오류가 발생했습니다');
    }
  };

  const handleLongPress = e => {
    setCoord(e.nativeEvent.coordinate);
  };
  const handleMarkerDragEnd = e => {
    console.log('드래그로 변경된 좌표:', e.nativeEvent.coordinate);
    setCoord(e.nativeEvent.coordinate);
  };

  useEffect(() => {
    if (coord) {
      getLocationName(coord.latitude, coord.longitude);
    }
  }, [coord]);

  return (
    <View>
      <MapView
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: 37.559,
          longitude: 126.9084,
          latitudeDelta: 0.018289,
          longitudeDelta: 0.010928,
        }}
        provider={PROVIDER_GOOGLE}
        onLongPress={handleLongPress}
      >
        {coord && <Marker coordinate={coord} draggable onDragEnd={e => handleMarkerDragEnd(e)} />}
      </MapView>
    </View>
  );
}
