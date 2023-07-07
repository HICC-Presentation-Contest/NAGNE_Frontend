import { Text } from 'react-native';
import styled from 'styled-components';
import Maps from '../components/Maps';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../components/AuthProvider';
import bookmarkedIcon from '../assets/bookmarked.png';
import nonBookmarkedIcon from '../assets/non-bookmarked.png';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 7px;
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

const Map = styled.TouchableOpacity`
  width: 170px;
  height: 176px;
  margin-left: 10px;
  margin-bottom: 16px;

  border-radius: 5px;
`;

export default function Storage({ navigation }) {
  const [post, setPost] = useState();
  const { token, setToken } = useContext(AuthContext);
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});

  // let JWTToken =
  //   'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODg1NDY2NTIsImV4cCI6MTY4OTE1MTQ1Miwic3ViIjoic2Vobzc4QGcuaG9uZ2lrLmFjLmtyIiwiVE9LRU5fVFlQRSI6IkFDQ0VTU19UT0tFTiJ9.P81MwwK7CR5kyTa--S7KX5zqRPM3mWzGg_JQoi7dgWIBn5RtbXABde4MXizmY7lXkpOU6fvmKQFwpxot48kQog';

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://3.37.189.80/bookmark?page=0&size=100`, {
            headers: { Authorization: token },
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
    }, []),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.37.189.80/bookmark?page=0&size=100`, {
          headers: { Authorization: token },
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
  }, [bookmarkedPosts]);

  const renderItem = ({ item: post }) => {
    // 현재 포스트의 북마크 상태를 가져옵니다.
    const handleBookmarkPress = async myTripId => {
      try {
        const routeData = new FormData();
        routeData.append('tripId', myTripId);
        // 백엔드에 북마크 상태 전송
        const response = await axios.post(`http://3.37.189.80/bookmark?tripId=${myTripId}`, routeData, {
          headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
        });
        console.log('북마크 생성 성공');
        console.log(myTripId);
        console.log(post.bookmark);
        // 응답이 정상적인 경우, 프론트엔드의 상태 업데이트
        if (response.status === 200) {
          setBookmarkedPosts(bookmarkedPosts => ({
            ...bookmarkedPosts,
            [post.tripId]: !bookmarkedPosts[post.tripId],
          }));
        } else {
          throw new Error('Failed to update bookmark');
        }
      } catch (error) {
        console.error(error);
        alert('북마크 업데이트에 실패했습니다. 다시 시도해 주세요.');
      }
    };
    console.log('북마크 여부 ******', post);

    return (
      <Map key={post.tripId} onPress={() => navigation.push('RoutePage', { tripId: post.tripId })}>
        <Image
          style={{ width: 168, height: 174, borderRadius: 5 }}
          source={{
            uri: post.tripImageUrl,
          }}
        />
        {/* 북마크 아이콘 추가 */}
        <TouchableOpacity
          onPress={() => handleBookmarkPress(post.tripId)}
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          <Image style={{ width: 24, height: 24 }} source={post.bookMark ? bookmarkedIcon : nonBookmarkedIcon} />
        </TouchableOpacity>
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
