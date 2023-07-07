import { useRef, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, FlatList, Alert, Keyboard, Platform, StyleSheet, Text } from 'react-native';
import { styled } from 'styled-components/native';
import { iOSBoxShadow, ScreenWidth } from './Shared';
import { Button, ButtonText, Title } from './CreateRoute_Shared';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { API_KEY } from '../PrivateConfig';
import axios from 'axios';
import { colors } from '../colors';

//Assets
import { WithLocalSvg } from 'react-native-svg';
import marker from '../assets/images/marker.svg';
import Plus from '../assets/images/add_None.svg';
import Check from '../assets/images/check.svg';
import Upload from '../assets/images/uploadImg.svg';
import Delete from '../assets/images/x.svg';

let ImageHeight = 200;
const DeleteButton = styled.TouchableOpacity`
  /* background-color: ${colors.sub}; */
  height: 32px;
  width: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;
const DeleteButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.grey};
`;
const ImageContainer = styled.View`
  width: 100%;
  height: ${ImageHeight}px;
`;
const RouteContainer = styled.View`
  margin: 16px 0;
  margin-right: 16px;
  width: ${ScreenWidth * 0.8}px;
  height: 400px;
  border-radius: 12px;
  padding: 4%;
  margin-bottom: 64px;
  ${iOSBoxShadow}
`;
const LocationContainer = styled.View`
  height: 100%;
  justify-content: flex-start;
`;
const LocationTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.grey};
  height: 32px;
  margin: 4px 0px;
`;
const LocationImage = styled.Image`
  width: 100%;
  height: ${ImageHeight}px;
  background-color: ${colors.base};
  border-radius: 6px;
  margin-bottom: 2px;
`;
const LocationAdress = styled.Text`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.4px;
  color: #a7a7a7;
  margin-bottom: 8px;
`;
const LocationDescription = styled.Text`
  font-size: 16px;
  font-weight: 300;
  color: ${colors.grey};
`;
const LocationInput = styled.TextInput`
  border-radius: 6px;
  padding: 4px;
  background-color: ${colors.base};
  width: 100%;
  height: 32px;
  margin-bottom: 8px;
`;
const LocationDescriptionInput = styled.TextInput`
  border-radius: 6px;
  padding: 4px;
  background-color: ${colors.base};
  width: 100%;
  height: 60px;
  margin-bottom: 40px;
`;
const LocationAddButton = styled.TouchableOpacity`
  position: absolute;
  width: 64px;
  height: 64px;
  bottom: -40px;
  border-radius: 32px;
  left: ${ScreenWidth * 0.375 - 32}px;
  justify-content: center;
  align-items: center;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  margin-top: 24px;
`;
const DetailText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${colors.highlight};
`;
const StatusText = styled.Text`
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 12px;
`;
const ImageAddButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: ${colors.base};
  border-radius: 6px;
  margin-bottom: 40px;
`;
export const LocationList = ({ routeName, routeRegion, parentFunction }) => {
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [coord, setCoord] = useState(null);
  let [img, setImg] = useState('');
  const [coordName, setCoordName] = useState('');
  const [locations, setLocations] = useState([
    {
      name: '',
      coord: '',
      coordName: '',
      image: '',
      description: '',
      saved: false,
    },
  ]);

  const flatList = useRef(null);

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}&language=ko`,
      );
      if (response.data.results.length > 0) {
        // console.log(response.data.results[0]);
        const address = response.data.results[0].formatted_address;
        setCoordName(address);
      } else {
        setCoordName('위치명을 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('위치명을 가져오는 중 오류가 발생했습니다:', error);
      setCoordName('위치명을 가져오는 중 오류가 발생했습니다');
    }
  };

  useEffect(() => {
    if (coord) {
      getLocationName(coord.latitude, coord.longitude);
    }
  }, [coord]);

  const removeItem = index => {
    let originArr = [...locations];
    let filteredArr = originArr.filter((_, i) => i !== index);
    filteredArr.push({
      name: '',
      coord: '',
      image: '',
      coordName: '',
      description: '',
      saved: false,
    });
    setLocations(filteredArr);
    setName('');
    setDescription('');
    setCoord('');
    setImg('');
  };

  const handleSubmit = () => {
    let filteredArr = locations.filter(item => item.saved == true);
    parentFunction(routeName, routeRegion, filteredArr);
  };
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [10, 8],
    });
    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };
  const handleLongPress = e => {
    setCoord(e.nativeEvent.coordinate);
  };
  const handleMarkerDragEnd = e => {
    setCoord(e.nativeEvent.coordinate);
  };
  const updateLocation = () => {
    let newArr = [...locations];
    newArr[locations.length - 1].name = name;
    newArr[locations.length - 1].description = description;
    newArr[locations.length - 1].coord = coord;
    newArr[locations.length - 1].image = img;
    newArr[locations.length - 1].coordName = coordName;
    newArr[locations.length - 1].saved = true;
    // console.log(newArr);
    if (locations.length > 4) {
      Alert.alert('경로 5개를 채웠어요!');
    } else {
      newArr.push({
        name: '',
        description: '',
        coord: '',
        image: '',
        coordName: '',
        saved: false,
      });
      setImg('');
      setName('');
      setDescription('');
      setCoord('');
    }
    setLocations(newArr);
  };
  const platformShadowInactive = Platform.select({
    ios: {
      boxShadow: 'none',
      borderRadius: 12,
      elevation: 'none',
      backgroundColor: colors.base,
    },
    android: {
      elevation: 0,
      backgroundColor: colors.base,
    },
  });
  const renderItem = ({ item, index }) => (
    <RouteContainer style={{ backgroundColor: 'white' }} key={item.name}>
      {locations[index].saved == true ? (
        <LocationContainer style={{ justifyContent: 'flex-start' }}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <LocationTitle>{locations[index].name}</LocationTitle>
            <DeleteButton onPress={() => removeItem(index)}>
              <WithLocalSvg width={32} height={32} asset={Delete} />
            </DeleteButton>
          </View>
          <LocationImage style={{ resizeMode: 'cover' }} source={{ uri: locations[index].image }} />
          <LocationAdress>{locations[index].coordName}</LocationAdress>
          <LocationDescription style={{ color: 'black' }}>
            {locations[index].description ? locations[index].description : '작성된 내용 없음'}
          </LocationDescription>
        </LocationContainer>
      ) : (
        <LocationContainer>
          <LocationInput
            style={{ width: '100%' }}
            autoFocus
            value={name}
            placeholder="장소명을 입력해주세요"
            returnKeyType="next"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            blurOnSubmit={false}
            onChangeText={value => setName(value)}
          />
          <ImageContainer>
            {img ? (
              <LocationImage style={{ resizeMode: 'cover' }} source={{ uri: img }} />
            ) : (
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
                {coord && (
                  <Marker coordinate={coord} draggable onDragEnd={e => handleMarkerDragEnd(e)}>
                    <WithLocalSvg width={40} height={40} asset={marker} />
                  </Marker>
                )}
              </MapView>
            )}
          </ImageContainer>
          {coord ? (
            <StatusText style={{ color: '#15A457' }}>{coordName}</StatusText>
          ) : (
            <StatusText style={{ color: '#ef3a3a' }}>길게 눌러 장소 위치를 정해주세요</StatusText>
          )}
          {img && (
            <LocationDescriptionInput
              value={description}
              placeholder="내용을 작성해주세요"
              returnKeyType="done"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              onChangeText={value => setDescription(value)}
            />
          )}
          {coord && !img && (
            <ImageAddButton onPress={() => selectImage(index)}>
              <WithLocalSvg color={colors.grey} width={32} height={32} asset={Upload} />
            </ImageAddButton>
          )}
          <LocationAddButton
            disabled={name && coord && img ? false : true}
            style={
              name && coord && img
                ? {
                    backgroundColor: colors.highlight,
                  }
                : {
                    ...platformShadowInactive,
                  }
            }
            onPress={updateLocation}
          >
            <WithLocalSvg
              style={name && coord && img ? { color: 'white' } : { color: '#AAAAAA' }}
              width={32}
              height={32}
              asset={Check}
            />
          </LocationAddButton>
        </LocationContainer>
      )}
    </RouteContainer>
  );

  const noValidLocation = locations.filter(item => item.saved == true).length == 0;
  return (
    <View style={{ width: ScreenWidth, marginLeft: '-6%', alignItems: 'center' }}>
      <TitleContainer>
        <Title>경로를 입력해주세요 (최대 5개)</Title>
        <DetailText>
          {locations.filter(item => item.saved == true).length}/5 {'>>'}
        </DetailText>
      </TitleContainer>
      <FlatList
        style={{ width: '100%' }}
        horizontal
        contentContainerStyle={{ paddingLeft: 32 }}
        data={locations}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        ref={flatList}
        onContentSizeChange={() => {
          setTimeout(() => {
            flatList.current.scrollToEnd();
          }, 500);
        }}
      />
      <Button
        style={
          noValidLocation && {
            backgroundColor: colors.base,
          }
        }
        disabled={noValidLocation ? true : false}
        onPress={handleSubmit}
      >
        <ButtonText
          style={noValidLocation ? { fontWeight: 400, color: '#747474' } : { fontWeight: 800, color: 'white' }}
        >
          다음
        </ButtonText>
      </Button>
    </View>
  );
};
