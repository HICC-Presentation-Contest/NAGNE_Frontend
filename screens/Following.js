import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dummy from '../dummy/follow.json';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 352px;
  height: 36px;
  padding: 10px;
  margin-left: 15px;
  background-color: #c8dbff;
  border-radius: 5px;
  margin-bottom: 22px;
`;

const TextInput = styled.TextInput`
  margin-left: 5px;
`;

const FollowerItem = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 22px;
`;
const ProfileHeader = styled.View`
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;
const ProfilePicture = styled.Image`
  width: 46px;
  height: 46px;
  border-radius: 50px;
  background-color: gray;
`;

export default function Follower({ navigation, route }) {
  const [userList, setUserList] = useState(dummy.content);
  const [searchQuery, setSearchQuery] = useState('');
  const userId = route.params.userId;

  let JWTToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODgyNzM4NTEsImV4cCI6MTY4ODg3ODY1MSwic3ViIjoic2Vobzc4QGcuaG9uZ2lrLmFjLmtyIiwiVE9LRU5fVFlQRSI6IkFDQ0VTU19UT0tFTiJ9.zAI5H-a0GejTLlWRznR3_jrQ1Q0zVuXWQlBlwTBwOcNFA6BmqfK6-qx67F4cfzCTL395uYg2zQrUxjE3zCyl4Q';

  useEffect(() => {
    const infos = dummy.content || [];
    setUserList(infos);
  }, [dummy.content]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.37.189.80/follow/following/${userId}?page=0&size=10`, {
          headers: { Authorization: `Bearer ${JWTToken}` },
        });
        console.log(response.data);
        setUserList(response.data.content);
        // Perform necessary actions with the response data
      } catch (error) {
        console.error(error); // Error handling
      }
    };

    fetchData();
  }, [userId]);

  const performSearch = query => {
    const filteredList = dummy.content.filter(info => info.name.toLowerCase().includes(query.toLowerCase()));
    setUserList(filteredList);
  };

  const renderItem = ({ item: info }) => {
    return (
      <TouchableOpacity key={info.userId} onPress={() => navigation.push('MyPage', { userId: info.userId })}>
        <FollowerItem>
          <ProfileHeader>
            <ProfilePicture source={{ uri: info.profileImage }} />
          </ProfileHeader>
          <Text>{info.name}</Text>
        </FollowerItem>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <SearchContainer>
        <Image style={{ width: 24, height: 24 }} source={require('../assets/search.png')} />
        <TextInput
          placeholder="아이디"
          placeholderTextColor="#84ADFF"
          value={searchQuery}
          onChangeText={query => {
            setSearchQuery(query);
            performSearch(query);
          }}
        />
      </SearchContainer>

      <FlatList data={userList} keyExtractor={item => item.userId} renderItem={renderItem} />
    </Container>
  );
}
