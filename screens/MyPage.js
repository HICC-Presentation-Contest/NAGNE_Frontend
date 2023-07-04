import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import dummy from '../dummy/travelSimpleInfo.json';
import dUserInfo from '../dummy/userInfo.json';
import Maps from '../components/Maps';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
`;

const UserInfo = styled.View`
  width: 100%;
  height: 92px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ProfileHeader = styled.View`
  align-items: center;
  margin-left: 30px;
`;
const Follow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const FollowItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-right: 32px;
`;

const ProfilePicture = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 50px;
  background-color: gray;
`;

const ProfileInfo = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 38px;
`;

const TextInput = styled.TextInput`
  width: 364px;
  height: 36px;
  font-size: 16px;
  padding: 5px;
  margin-left: 12px;
  background-color: #c8dbff;
  border-radius: 5px;
`;

const Bio = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 11px;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 10px;
  border-bottom-width: ${props => (props.isActive ? '2px' : '0px')};
  border-bottom-color: ${props => (props.isActive ? 'blue' : 'transparent')};
`;

const TabText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const TabContent = styled.View`
  flex: 1;
  width: 100%;
`;

const TravelSimpleInfo = styled.View`
  width: 353px;
  height: 124px;
  border: 1px;
  border-color: #d9d9d9;
  margin-bottom: 12px;
  margin-left: 16px;
`;

const Title = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: #eef4ff;
  width: 100%;
  height: 33px;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

const LocationList = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})`
  width: 100%;
  padding: 5px;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

const Location = styled.View`
  flex-direction: row;
  align-items: center;
  flex-shrink: 1;
`;

const DateAddress = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  padding-left: 5px;
  padding-right: 5px;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
  margin: 5px;
`;

const MapContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin-left: 7px;
`;

const Map = styled.View`
  width: 170px;
  height: 176px;
  margin-left: 10px;
  margin-bottom: 16px;
  border: 1px;
  border-radius: 5px;
`;

export default function MyPage({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('Path');
  const [simplePost, setSimplePost] = useState(dummy.content);
  const [post, setPost] = useState();
  const [userInfo, setUserInfo] = useState(dUserInfo);
  const [bio, setBio] = useState(userInfo.description);
  const [isEditMode, setIsEditMode] = useState(false);
  const userId = route.params.userId;

  useEffect(() => {
    console.log('userId changed:', userId);
  }, [userId]);

  useEffect(() => {
    const posts = dummy.content || [];
    setSimplePost(posts);
  }, [dummy.content]);

  useEffect(() => {
    const info = dUserInfo || [];
    setUserInfo(info);
  }, [dUserInfo]);

  const handleTabPress = tabName => {
    setActiveTab(tabName);
  };

  let JWTToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODgyNzM4NTEsImV4cCI6MTY4ODg3ODY1MSwic3ViIjoic2Vobzc4QGcuaG9uZ2lrLmFjLmtyIiwiVE9LRU5fVFlQRSI6IkFDQ0VTU19UT0tFTiJ9.zAI5H-a0GejTLlWRznR3_jrQ1Q0zVuXWQlBlwTBwOcNFA6BmqfK6-qx67F4cfzCTL395uYg2zQrUxjE3zCyl4Q';

  //여행 간단 정보 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.37.189.80/trip/user/${userId}/simple?page=0&size=10`, {
          headers: { Authorization: `Bearer ${JWTToken}` },
        });
        console.log(response.data); // Server response data

        setSimplePost(response.data.content);
        // Perform necessary actions with the response data
      } catch (error) {
        console.error(error); // Error handling
      }
    };
    fetchData();
  }, [userId]);

  //여행 정보 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.37.189.80/trip/user/${userId}?page=0&size=10`, {
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
  }, [userId]);

  //유저 페이지 정보 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.37.189.80/user?userId=${userId}`, {
          headers: { Authorization: `Bearer ${JWTToken}` },
        });

        setUserInfo(response.data);
        setBio(response.data.description);
        navigation.setOptions({
          title: response.data.name, // userId에 해당하는 사용자의 이름으로 헤더 타이틀을 설정
        });
        // Perform necessary actions with the response data
      } catch (error) {
        console.error(error); // Error handling
      }
    };

    fetchData();
  }, [userId]);

  // 수정한 텍스트를 백엔드로 보내는 함수
  const sendTextToBackend = async text => {
    try {
      const response = await axios.post('http://example.com/api/endpoint', {
        text: text,
      });
      console.log(response.data); // 서버 응답 데이터
      // 성공적으로 전송되었을 때 필요한 처리를 수행합니다.
    } catch (error) {
      console.error(error); // 오류 처리
    }
  };

  const handleSaveButtonPress = () => {
    // 수정한 텍스트를 백엔드로 보냅니다.
    sendTextToBackend(bio);
    console.log('보냄');
  };

  const renderItem = ({ item: post }) => {
    return (
      <TravelSimpleInfo key={post.tripId}>
        <Title>
          <Logo resizeMode="contain" source={require('../assets/navigation.png')} />
          <Text>{post.title}</Text>
        </Title>
        <LocationList horizontal>
          {post.locationInfoList.map((location, index) => (
            <Location key={index}>
              {index === 0 ? null : <Logo resizeMode="contain" source={require('../assets/vector2.png')} />}
              <Text key={index}>{location.placeName}</Text>
            </Location>
          ))}
        </LocationList>
        <DateAddress>
          <Text>{post.createdDate}</Text>
          <Text>{post.address}</Text>
        </DateAddress>
      </TravelSimpleInfo>
    );
  };

  const renderItem2 = ({ item: post }) => {
    return (
      <Map key={post.tripId}>
        <Image source={{ uri: post.tripImageUrl }} />
      </Map>
    );
  };

  return (
    <Container>
      <UserInfo>
        <ProfileHeader>
          <ProfilePicture source={{ uri: userInfo.profileImageUrl }} />
        </ProfileHeader>
        <Follow>
          <FollowItem onPress={() => navigation.navigate('Follower', { userId: userId })}>
            <Text>팔로워</Text>
            <Text>{userInfo.followerCount}</Text>
          </FollowItem>
          <FollowItem onPress={() => navigation.navigate('Following', { userId: userId })}>
            <Text>팔로잉</Text>
            <Text>{userInfo.followingCount}</Text>
          </FollowItem>
        </Follow>
      </UserInfo>
      <ProfileInfo>
        {isEditMode ? (
          <TextInput
            placeholder="자신을 소개하는 글을 작성해 보세요"
            value={bio}
            maxLength={20}
            onChangeText={setBio}
            onBlur={() => {
              setIsEditMode(false);
              handleSaveButtonPress();
            }}
            autoFocus
          />
        ) : (
          <>
            <Bio>#{bio}</Bio>
            <TouchableOpacity onPress={() => setIsEditMode(true)}>
              <Image style={{ width: 24, height: 24 }} source={require('../assets/modify.png')} />
            </TouchableOpacity>
          </>
        )}
      </ProfileInfo>
      <TabContainer>
        <TabButton isActive={activeTab === 'Path'} onPress={() => handleTabPress('Path')}>
          <TabText>경로</TabText>
        </TabButton>
        <TabButton isActive={activeTab === 'Saved'} onPress={() => handleTabPress('Saved')}>
          <TabText>저장</TabText>
        </TabButton>
      </TabContainer>
      {activeTab === 'Path' && (
        <TabContent>
          <FlatList data={simplePost} keyExtractor={item => item.tripId} renderItem={renderItem} />
        </TabContent>
      )}
      {activeTab === 'Saved' && (
        <TabContent>
          <MapContainer>
            <FlatList data={post} keyExtractor={item => item.tripId} renderItem={renderItem2} />
          </MapContainer>
        </TabContent>
      )}
    </Container>
  );
}
