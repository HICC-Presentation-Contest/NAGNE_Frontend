import { useRef, useState } from 'react';
import Plus from '../assets/images/add_None.svg';
import { WithLocalSvg } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import { View, FlatList, Alert } from 'react-native';
import { styled } from 'styled-components/native';
import { ScreenWidth } from './Shared';
import { Button, ButtonText } from './CreateRoute_Shared';

const LocationInput = styled.TextInput`
  border-radius: 6px;
  padding: 4px;
  background-color: white;
  width: 100%;
`;

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

const ImageAddButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: white;
  border-radius: 6px;
`;
const RouteContainer = styled.View`
  margin: 8px 0;
  margin-right: 16px;
  width: ${ScreenWidth * 0.8}px;
  height: 400px;
  background-color: #eef4ff;
  border-radius: 10px;
  padding: 4%;
`;
const LocationContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;
const LocationTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #84adff;
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
  height: 20%;
  font-size: 15px;
  font-weight: 400;
  color: #afafaf;
`;

export const LocationList = ({ routeName, routeRegion, parentFunction }) => {
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [img, setImg] = useState('');
  const [locations, setLocations] = useState([
    {
      title: '',
      image: '',
      description: '',
      saved: false,
    },
  ]);

  const flatList = useRef(null);
  const selectImage = async index => {
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

  const removeItem = index => {
    setLocations(prevLocations => prevLocations.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    //locations 중에 saved만 필터하는 기능 필요**
    parentFunction(routeName, routeRegion, locations);
  };
  const updateLocation = () => {
    let newArr = [...locations];
    newArr[locations.length - 1].title = title;
    newArr[locations.length - 1].description = description;
    newArr[locations.length - 1].saved = true;
    newArr[locations.length - 1].image = img;

    if (locations.length > 4) {
      Alert.alert('경로 5개를 채웠어요!');
    } else {
      newArr.push({
        title: '',
        image: '',
        description: '',
        saved: false,
      });

      setTitle('');
      setDescription('');
      setImg('');
    }
    setLocations(newArr);
  };
  const renderItem = ({ item, index }) => (
    <RouteContainer key={item.title}>
      {locations[index].saved == true ? (
        <LocationContainer>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <LocationTitle>{locations[index].title}</LocationTitle>
            <DeleteButton onPress={() => removeItem(index)}>
              <DeleteButtonText>X</DeleteButtonText>
            </DeleteButton>
          </View>
          <LocationImage style={{ resizeMode: 'contain' }} source={{ uri: locations[index].image }} />
          <LocationDescription>{locations[index].description}</LocationDescription>
        </LocationContainer>
      ) : (
        <LocationContainer>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <LocationInput
              style={{ width: '85%' }}
              autoFocus
              value={title}
              placeholder="제목 입력"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={value => setTitle(value)}
            />
            <DeleteButton onPress={() => removeItem(index)}>
              <DeleteButtonText>X</DeleteButtonText>
            </DeleteButton>
          </View>
          <ImageContainer>
            {img ? (
              <LocationImage style={{ resizeMode: 'contain' }} source={{ uri: img }} />
            ) : (
              <ImageAddButton onPress={() => selectImage(index)}>
                <WithLocalSvg width={32} height={32} asset={Plus} />
              </ImageAddButton>
            )}
          </ImageContainer>
          <LocationInput
            style={{ height: '20%' }}
            value={description}
            placeholder="설명"
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={value => setDescription(value)}
          />
        </LocationContainer>
      )}
    </RouteContainer>
  );

  return (
    <View style={{ width: ScreenWidth, marginLeft: '-6%', alignItems: 'center' }}>
      <FlatList
        horizontal
        data={locations}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        ref={flatList}
        onContentSizeChange={() => {
          flatList.current.scrollToEnd();
        }}
      />
      <Button
        style={
          {
            //필드값 안 채워지면 바로 그냥 색상 지워버리기**
          }
        }
        onPress={updateLocation}
      >
        <ButtonText>장소 추가</ButtonText>
      </Button>

      <Button onPress={handleNext}>
        <ButtonText>다음</ButtonText>
      </Button>
    </View>
  );
};
