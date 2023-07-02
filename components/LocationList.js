import { useRef, useState, useEffect } from 'react';
import Plus from '../assets/images/add_None.svg';
import { WithLocalSvg } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import { View, FlatList, Alert, Keyboard } from 'react-native';
import { styled } from 'styled-components/native';
import { ScreenWidth } from './Shared';
import { Button, ButtonText, Title } from './CreateRoute_Shared';
import Check from '../assets/images/check.svg';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

const DeleteButton = styled.TouchableOpacity`
  background-color: grey;
  height: 32px;
  width: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;
const DeleteButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
const ImageContainer = styled.View`
  width: 100%;
  height: 240px;
`;
const RouteContainer = styled.View`
  margin: 8px 0;
  margin-right: 16px;
  width: ${ScreenWidth * 0.8}px;
  height: 440px;
  background-color: #eef4ff;
  border-radius: 10px;
  padding: 4%;
  margin-bottom: 64px;
`;
const LocationContainer = styled.View`
  height: 100%;
  justify-content: space-between;
`;
const LocationTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #84adff;
  height: 32px;
`;
const LocationImage = styled.Image`
  width: 100%;
  height: 240px;
  background-color: #e8e8e8;
  border-radius: 6px;
`;
const LocationDescription = styled.Text`
  border-radius: 6px;
  padding: 1%;
  height: 100px;
  font-size: 15px;
  font-weight: 400;
  color: #afafaf;
`;
const LocationInput = styled.TextInput`
  border-radius: 6px;
  padding: 4px;
  background-color: white;
  width: 100%;
  height: 32px;
`;
const LocationDescriptionInput = styled.TextInput`
  border-radius: 6px;
  padding: 4px;
  background-color: white;
  width: 100%;
  height: 60px;
  margin-bottom: 40px;
`;
const LocationAddButton = styled.TouchableOpacity`
  position: absolute;
  width: 120px;
  height: 64px;
  bottom: -40px;
  box-shadow: 16px 12px 12px black;
  border-radius: 12px;
  left: ${ScreenWidth * 0.375 - 60}px;
  justify-content: center;
  align-items: center;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 24px;
`;
const DetailText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: #0351ea;
`;
const StatusText = styled.Text`
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 4px;
`;

export const LocationList = ({ routeName, routeRegion, parentFunction }) => {
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
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

  const flatList = useRef(null);

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
      coordName: '',
      description: '',
      saved: false,
    });
    setLocations(filteredArr);
    setName('');
    setDescription('');
    setCoord('');
  };

  const handleSubmit = () => {
    let filteredArr = locations.filter(item => item.saved == true);
    parentFunction(routeName, routeRegion, filteredArr);
  };

  const handleLongPress = e => {
    setCoord(e.nativeEvent.coordinate);
  };
  const handleMarkerDragEnd = e => {
    console.log('드래그로 변경된 좌표:', e.nativeEvent.coordinate);
    setCoord(e.nativeEvent.coordinate);
  };
  const updateLocation = () => {
    let newArr = [...locations];
    newArr[locations.length - 1].name = name;
    newArr[locations.length - 1].description = description;
    newArr[locations.length - 1].saved = true;
    newArr[locations.length - 1].coord = coord;
    newArr[locations.length - 1].coordName = coordName;

    if (locations.length > 4) {
      Alert.alert('경로 5개를 채웠어요!');
    } else {
      newArr.push({
        name: '',
        coord: '',

        description: '',
        saved: false,
      });

      setName('');
      setDescription('');
      setCoord('');
    }
    setLocations(newArr);
  };
  const renderItem = ({ item, index }) => (
    <RouteContainer key={item.name}>
      {locations[index].saved == true ? (
        <LocationContainer style={{ justifyContent: 'flex-start' }}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <LocationTitle>{locations[index].name}</LocationTitle>
            <DeleteButton onPress={() => removeItem(index)}>
              <DeleteButtonText>X</DeleteButtonText>
            </DeleteButton>
          </View>
          {/* <LocationImage style={{ resizeMode: 'contain' }} source={{ uri: locations[index].image }} /> */}
          <LocationDescription>{locations[index].coordName}</LocationDescription>
          <LocationDescription style={{ color: 'black' }}>{locations[index].description}</LocationDescription>
        </LocationContainer>
      ) : (
        <LocationContainer>
          <LocationInput
            style={{ width: '100%' }}
            autoFocus
            value={name}
            placeholder="제목 입력"
            returnKeyType="next"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            blurOnSubmit={false}
            onChangeText={value => setName(value)}
          />
          <ImageContainer>
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
          </ImageContainer>
          {coord ? (
            <StatusText style={{ color: '#15A457' }}>{coordName}</StatusText>
          ) : (
            <StatusText style={{ color: '#ef3a3a' }}>길게 눌러 장소 위치를 정해주세요</StatusText>
          )}
          <LocationDescriptionInput
            value={description}
            placeholder="설명"
            returnKeyType="done"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            onChangeText={value => setDescription(value)}
          />
          <LocationAddButton
            disabled={name && coord ? false : true}
            style={
              name && coord
                ? {
                    elevation: 2,
                    backgroundColor: 'white',
                  }
                : {
                    elevation: 0,
                    backgroundColor: '#D9D9D9',
                  }
            }
            onPress={updateLocation}
          >
            <WithLocalSvg
              style={
                name && coord
                  ? { color: '#0351EA' }
                  : {
                      color: '#AAAAAA',
                    }
              }
              width={40}
              height={40}
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
        <DetailText>{locations.filter(item => item.saved == true).length}/5</DetailText>
      </TitleContainer>
      <FlatList
        horizontal
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
            backgroundColor: '#D9D9D9',
          }
        }
        disabled={noValidLocation ? true : false}
        onPress={handleSubmit}
      >
        <ButtonText style={noValidLocation ? { color: '#747474' } : { color: 'white' }}>다음</ButtonText>
      </Button>
    </View>
  );
};
