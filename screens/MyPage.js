import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import bookmarkedIcon from '../assets/bookmarked.png';
import nonBookmarkedIcon from '../assets/non-bookmarked.png';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../components/AuthProvider';

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

const TravelSimpleInfo = styled.TouchableOpacity`
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

const Map = styled.TouchableOpacity`
  width: 170px;
  height: 176px;
  margin-left: 10px;
  margin-bottom: 16px;

  border-radius: 5px;
`;

const FollowButton = styled.TouchableOpacity`
  height: 50%;
  width: 72px;
  height: 36px;
  border: #747474;
  color: black;
  margin-right: 8px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
`;
const FollowText = styled.Text`
  color: black;
  font-size: 12px;
`;

export default function MyPage({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('Path');
  const [simplePost, setSimplePost] = useState();
  const [post, setPost] = useState();
  const [userInfo, setUserInfo] = useState('');
  const [bio, setBio] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const [userId, setUserId] = useState(route.params.userId);
  const [follow, setFollow] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(7);

  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (route && route.params && route.params.userId) {
      // route.params.userId가 존재하는 경우
      console.log(route, '라우터 생성');
      setUserId(route.params.userId);
    } else {
      // route.params.userId가 존재하지 않는 경우
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://3.37.189.80/user`, {
            headers: { Authorization: token },
          });
          console.log(response.data);
          setUserId(response.data.userId);
          setLoggedInUserId(response.data.userId);
        } catch (error) {
          console.error(error); // Error handling
        }
      };
      fetchData();
    }
  }, [route]);

  //유저 페이지 정보 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.37.189.80/user?userId=${userId}`, {
          headers: { Authorization: token },
        });
        console.log('유저 페이지 정보 조회', response.data);
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
  }, [userId, follow]);

  useEffect(() => {
    console.log('받아온 유저 id', userId);
  }, []);

  // 팔로우 상태 get
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://3.37.189.80/follow/check?receiverId=${userId}
        `,
          {
            headers: { Authorization: token },
          },
        );
        console.log(response.data);
        setFollow(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId]);

  const handleClick = async () => {
    try {
      const routeData = new FormData();
      routeData.append('receiverId', userId);
      // 백엔드에 북마크 상태 전송
      const response = await axios.post(`http://3.37.189.80/follow?receiverId=${userId}`, routeData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
      });
      // 응답이 정상적인 경우, 프론트엔드의 상태 업데이트
      if (response.status === 200) {
        setFollow(!follow);
      } else {
        throw new Error('Failed to update follow');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 현재 페이지의 사용자의 userId가 로그인한 사용자와 다른 경우 뒤로가기 버튼과 팔로우 버튼 표시
    if (loggedInUserId !== userId) {
      console.log('조건문 1 실행');
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <FollowButton style={follow && { backgroundColor: '#0351EA' }} onPress={handleClick}>
            <FollowText style={follow && { color: 'white' }}>{follow ? '언팔로우' : '팔로우'}</FollowText>
          </FollowButton>
        ),
      });
    } else {
      // 일치하는 경우 뒤로가기 버튼을 제거하고 팔로우 버튼도 제거
      navigation.setOptions({
        headerLeft: () => null,
        headerRight: () => null,
      });
      console.log('조건문 2 실행');
    }
  }, [userId, loggedInUserId, follow]);

  useEffect(() => {
    console.log('userId changed:', userId);
  }, [userId]);

  const handleTabPress = tabName => {
    setActiveTab(tabName);
  };

  //여행 간단 정보 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.37.189.80/trip/user/${userId}/simple?page=0&size=100`, {
          headers: { Authorization: token },
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
        const response = await axios.get(`http://3.37.189.80/trip/user/${userId}?page=0&size=100`, {
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
  }, [userId, bookmarkedPosts]);

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
      <TravelSimpleInfo key={post.tripId} onPress={() => navigation.push('RoutePage', { tripId: post.tripId })}>
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
          <Image style={{ width: 24, height: 24 }} source={post.bookmark ? bookmarkedIcon : nonBookmarkedIcon} />
        </TouchableOpacity>
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
          <FollowItem onPress={() => navigation.push('Follower', { userId: userId })}>
            <Text>팔로워</Text>
            <Text>{userInfo.followerCount}</Text>
          </FollowItem>
          <FollowItem onPress={() => navigation.push('Following', { userId: userId })}>
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
          <FlatList
            data={post}
            numColumns={2}
            keyExtractor={item => item.tripId}
            renderItem={renderItem2}
            contentContainerStyle={{
              width: '100%',
              marginLeft: 7,
            }}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
            }}
          />
        </TabContent>
      )}
    </Container>
  );
}
