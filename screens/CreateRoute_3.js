import React,{ useState }  from 'react'
import { Button, ButtonText, Container, CreateRouteLayout, Input, Title } from '../components/CreateRoute_Shared'
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import {  WithLocalSvg } from 'react-native-svg';
import Plus from '../assets/images/add_None.svg'
import { FlatList } from 'react-native';

const ImageContainer = styled.View`
  width:100%;
  height: 200px;
`
const RouteContainer = styled.View`
margin-top: 22px;
width:100%;
`
const ImageAddButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f3f3f3;
`
const LocationImage= styled.Image`
width: 100%;
height: 100%;
background-color: #e8e8e8;
`
const CreateRoute_3 = ({route}) => {
  let [img,setImg]= useState(null)
  let [location,setLocation]= useState([])
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [10,8],
      base64:true
    });
    if (!result.canceled) {
      setImg('data:image/png;base64,'+ result.assets[0].base64);
    };
  };
  const addLocation = ()=> {
    const { storeName,storeDescription } = getValues();

    setValue('storeName','')
    setValue('storeDescription','')
    navigation.navigate('CreateRoute_2',{storeName,storeDescription})
}
  return (
    <CreateRouteLayout>
      <FlatList
        data={Location}
        renderItem={renderLocationItem}
        keyExtractor={item => `${item.id}`}
      />
    <Container>
        <Title>경로를 입력해주세요 (최대 5개)</Title>
        <RouteContainer>
          <Input
          autoFocus
          placeholder='제목 입력'
          returnKeyType='next'
          blurOnSubmit={false}
          onChangeText={(text) => setValue('storeName', text)}
          />
          <ImageContainer>
          {img?(
            <LocationImage
            style={{resizeMode:'contain'}}
            source={{uri:img}}
            />
            ):(
            <ImageAddButton
              onPress={selectImage}
            >
              <WithLocalSvg
                      width={32}
                      height={32}
                      asset={Plus}
                  />
            </ImageAddButton>)
            }
          </ImageContainer>
          <Input
            placeholder='설명'
            returnKeyType='next'
            blurOnSubmit={false}
            onChangeText={(text) => setValue('storeDescription', text)}
          />
        </RouteContainer>
    </Container>
    <Button onPress={()=>addLocation()}><ButtonText>장소 추가</ButtonText></Button>
    <Button onPress={()=>navigateTo2()}><ButtonText>다음</ButtonText></Button>
</CreateRouteLayout>
  )
}

export default CreateRoute_3