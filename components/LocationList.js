import { useRef, useState } from 'react';
import Plus from '../assets/images/add_None.svg';
import { WithLocalSvg } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import { View, FlatList, Alert, Keyboard } from 'react-native';
import { styled } from 'styled-components/native';
import { ScreenWidth } from './Shared';
import { Button, ButtonText, Title } from './CreateRoute_Shared';
import Check from '../assets/images/check.svg';

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
  height: 420px;
  background-color: #eef4ff;
  border-radius: 10px;
  padding: 4%;
  margin-bottom: 64px;
`;
// 40 + 240 + 400
const LocationContainer = styled.View`
  height: 100%;
  justify-content: space-between;
`;

const LocationInputHeader = styled.View`
  flex-direction: row;
  width: 100%;
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
  font-weight: 40;
  color: #0351ea;
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

  const handleSubmit = () => {
    let filteredArr = locations.filter(item => item.saved == true);
    parentFunction(routeName, routeRegion, filteredArr);
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
          <LocationInputHeader>
            <LocationInput
              style={{ width: '85%' }}
              autoFocus
              value={title}
              placeholder="제목 입력"
              returnKeyType="next"
              onSubmitEditing={() => {
                selectImage(index);
              }}
              blurOnSubmit={false}
              onChangeText={value => setTitle(value)}
            />
            <DeleteButton onPress={() => removeItem(index)}>
              <DeleteButtonText>X</DeleteButtonText>
            </DeleteButton>
          </LocationInputHeader>
          <ImageContainer>
            {img ? (
              <LocationImage style={{ resizeMode: 'contain' }} source={{ uri: img }} />
            ) : (
              <ImageAddButton onPress={() => selectImage(index)}>
                <WithLocalSvg width={32} height={32} asset={Plus} />
              </ImageAddButton>
            )}
          </ImageContainer>
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
            disabled={title && img && description ? false : true}
            style={
              title && img && description
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
                title && img && description
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
        keyExtractor={item => item.title}
        ref={flatList}
        onContentSizeChange={() => {
          setTimeout(() => {
            flatList.current.scrollToEnd();
          }, 500);
        }}
      />
      <Button onPress={handleSubmit}>
        <ButtonText>다음</ButtonText>
      </Button>
    </View>
  );
};
