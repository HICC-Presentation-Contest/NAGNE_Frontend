import React, { useEffect, useState } from 'react';
import { CreateRouteLayout } from '../components/CreateRoute_Shared';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const CreateRoute_5 = ({ route }) => {
  let url = 'http://3.37.189.80/trip';
  let JWTToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODgyODgyODAsImV4cCI6MTY4ODg5MzA4MCwic3ViIjoibmVvc2VsZjExMDVAZ21haWwuY29tIiwiVE9LRU5fVFlQRSI6IkFDQ0VTU19UT0tFTiJ9.xL-iMxiwJl3U6ZntsIrWueaK2dNx9DwO1GABGbigJhNpw4i4IIBmT9mh7wxGqIqgnXl4MN-2MEML8VULrf3Npw';

  const uploadDatas = async (hashtag, title, region, locations) => {
    const processData = async () => {
      const routeData = new FormData();
      routeData.append('address', region);
      routeData.append('title', title);
      routeData.append('tag[0].name', hashtag);

      for (let i = 0; i < locations.length; i++) {
        routeData.append(`locationInfo[${i}].address`, locations[i].name);
        const fileType = locations[i].image.split('.').pop();
        const newFileName = `${FileSystem.documentDirectory}image${i}.${fileType}`;
        await FileSystem.copyAsync({ from: locations[i].image, to: newFileName })
          .then(
            routeData.append(`locationInfo[${i}].locationImage`, {
              uri: newFileName,
              type: `image/${fileType}`,
              name: `photo.${fileType}`,
            }),
          )
          .then(
            console.log({
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
      //promise로 감싸서 formData형성 될때까지 기다리고 난 후에 axios.post 넘어가게끔
      const formData = await processData();
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${JWTToken}`, 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response:', response.config.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    let title = route.params.title;
    let region = route.params.region;
    let hashtag = route.params.hashtag;
    let locations = route.params.locations;
    uploadDatas(hashtag, title, region.name, locations);
  }, []);

  return (
    <CreateRouteLayout>
      {/* <MapView
        // ref={mapRef}
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: 37.559,
          longitude: 126.9084,
          latitudeDelta: 0.018289,
          longitudeDelta: 0.010928,
        }}
        provider={PROVIDER_GOOGLE}
        // onLongPress={handleLongPress}
      >
        {coord && <Marker coordinate={coord} draggable onDragEnd={e => handleMarkerDragEnd(e)} />}
      </MapView>
      {mapSnapshot && (
        <View style={styles.snapshotContainer}>
          <Image source={{ uri: mapSnapshot }} style={styles.snapshotImage} />
        </View>
      )} */}
    </CreateRouteLayout>
  );
};
export default CreateRoute_5;
