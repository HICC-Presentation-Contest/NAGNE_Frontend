import { Text } from 'react-native';
import styled from 'styled-components';
import Maps from '../components/Maps';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  width: 100%;
`;

const MapContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  padding: 9px;
  background-color: white;
`;

const Map = styled.View`
  width: 170px;
  height: 176px;
  margin-left: 10px;
  margin-bottom: 16px;

  border-radius: 5px;
`;

export default function Storage() {
  const [post, setPost] = useState();

  let JWTToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODg0NTc2NDEsImV4cCI6MTY4OTA2MjQ0MSwic3ViIjoic2Vobzc4QGcuaG9uZ2lrLmFjLmtyIiwiVE9LRU5fVFlQRSI6IkFDQ0VTU19UT0tFTiJ9.XRGs2XPdCrHpPgkcd96O46r2l8KRYpkZQu8PRfZoDtxYPV3N4-l5QB7IL77BfJMS-9Y7HyZssjPoxDYXAZVrrA';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.37.189.80/bookmark?page=0&size=10`, {
          headers: { Authorization: `Bearer ${JWTToken}` },
        });
        console.log('성공'); // Server response data
        console.log(response.data); // Server response data

        setPost(response.data.content);
        // Perform necessary actions with the response data
      } catch (error) {
        console.error(error); // Error handling
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item: post }) => {
    return (
      <Map key={post.tripId}>
        <Image
          style={{ width: 168, height: 174, borderRadius: 5 }}
          source={{
            uri: post.tripImageUrl,
          }}
        />
      </Map>
    );
  };

  return (
    <Container>
      <FlatList
        data={post}
        numColumns={2}
        keyExtractor={item => item.tripId}
        renderItem={renderItem}
        contentContainerStyle={{
          width: '100%',
          marginLeft: 7,
        }}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
        }}
      />
    </Container>
  );
}
