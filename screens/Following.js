import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dummy from '../dummy/follow.json';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { getToken } from '../components/Shared';

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
  const [userList, setUserList] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [originalList, setOriginalList] = useState(''); // 원래의 목록을 저장하는 상태 추가
  const userId = route.params.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        getToken().then(token => {
          axios
            .get(`http://3.37.189.80/follow/following/${userId}?page=0&size=100`, {
              headers: { Authorization: token },
            })
            .then(response => {
              console.log('팔로잉 데이터 get 반응값:', response.data);
              setUserList(response.data.content);
              setOriginalList(response.data.content); // 원래의 목록 저장
            });
        });
        // Perform necessary actions with the response data
      } catch (error) {
        console.error(error); // Error handling
      }
    };
    fetchData();
  }, [userId]);

  const performSearch = query => {
    const filteredList = originalList.filter(info => info.name.toLowerCase().includes(query.toLowerCase()));
    setUserList(filteredList);
    setSearchQuery(query); // 검색어 상태 업데이트
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
