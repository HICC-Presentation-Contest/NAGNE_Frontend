import React,{ useState }  from 'react'
import { Button, ButtonText, Container, CreateRouteLayout, Input, Title } from '../components/CreateRoute_Shared'
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import {  WithLocalSvg } from 'react-native-svg';
import Plus from '../assets/images/add_None.svg'
import { FlatList,View,Text,TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';

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
  const [inputs, setInputs] = useState({ title: '', description: ''});
  let [img,setImg]= useState(null)
  let [id,setId]= useState(0)
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
      console.log("img Added")
    };
  };

  const onChangeText = (key, value) => {
    setInputs({
      ...inputs,
      [key]: value,
    });
  };

  const clearAllTextInputs = () => {
    setInputs({ title: '', description: '' });
  };

  const LocationList = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const onPressDropdown = id => {
      setSelectedItem(selectedItem === id ? null : id);
    };
    const renderLocationItem = ({item}) => (
      <View key={item.id}>
        <Text>{item.name}</Text>
        <TouchableOpacity
          onPress={() => onPressDropdown(item.id)}>
          <Text>{selectedItem === item.id ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {selectedItem === item.id && (
          <Text>{item.description}</Text>
        )}
      </View>
    );
  
    return (
      <FlatList
        data={location}
        renderItem={renderLocationItem}
        keyExtractor={item => `${item.id}`}
      />
    );
  };

  const addLocation = ()=> {
    console.log(id,inputs.title, inputs.description)
    setLocation([...location,{id,name :inputs.title, img, description: inputs.description}])
    setId(id+1);
    clearAllTextInputs();
}
  return (
    <CreateRouteLayout>
      <LocationList/>
    <Container>
        <Title>경로를 입력해주세요 (최대 5개)</Title>
        <RouteContainer>
          <Input
          autoFocus
          value={inputs.title}
          placeholder='제목 입력'
          returnKeyType='next'
          // blurOnSubmit={false}
          onChangeText={(text) => onChangeText('title', text)}
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
            value={inputs.description}
            returnKeyType='next'
            onChangeText={(text) => onChangeText('description', text)}
          />
        </RouteContainer>
    </Container>
    <Button onPress={()=>addLocation()}><ButtonText>장소 추가</ButtonText></Button>
    <Button onPress={()=>navigateTo2()}><ButtonText>다음</ButtonText></Button>
</CreateRouteLayout>
  )
}

export default CreateRoute_3