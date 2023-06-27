import React,{ useState }  from 'react'
import { Button, ButtonText, Container, CreateRouteLayout, Input, Title } from '../components/CreateRoute_Shared'
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';

const ImageContainer = styled.TouchableOpacity`
  width:100%;
  background-color: chartreuse;
  height: 200px;
`
const CreateRoute_3 = ({route}) => {
  let [img,setImg]= useState('')
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64:true
    });

    if (!result.canceled) {
      setImg('data:image/png;base64,'+ result.assets[0].base64);
    };
  };
  return (
    <CreateRouteLayout>
    <Container>
        <Title>경로를 입력해주세요 (최대 5개)</Title>
        <Input
        autoFocus
        placeholder='제목 입력'
        returnKeyType='next'
        blurOnSubmit={false}
        onChangeText={(text) => setValue('storeName', text)}
        />
        <ImageContainer 
        onPress={selectImage}/>
        <Input
          placeholder='설명'
          returnKeyType='next'
          blurOnSubmit={false}
          onChangeText={(text) => setValue('storeDescription', text)}
        />
    </Container>
    <Button onPress={()=>navigateTo2()}><ButtonText>다음</ButtonText></Button>
</CreateRouteLayout>
  )
}

export default CreateRoute_3