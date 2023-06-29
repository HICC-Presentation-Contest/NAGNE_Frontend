import { styled } from 'styled-components/native';
import {StyleSheet,View,FlatList,Text } from 'react-native';
import { useRef, useState } from 'react';
import { ScreenWidth } from './Shared';
import Plus from '../assets/images/add_None.svg'
import { WithLocalSvg } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';

export const CreateRouteLayout = styled.SafeAreaView`
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: white;
    width:100%;
    flex:1;
    /* background-color: chartreuse; */
`
export const Container = styled.SafeAreaView`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 90%;
`
export const Title = styled.Text`
font-size: 20px;
font-weight: bold;
color: #0351EA;
margin-bottom: 12px;
`
export const ButtonText = styled.Text`
font-size: 16px;
font-weight: 400;
color: white;
font-weight: 800;

`
export const Button = styled.TouchableOpacity`
  background-color: #0351EA;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 46px;
  border-radius: 22px;
  width: 46%;
  margin-bottom: 64px;
`
const TextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  border-radius: 4px;
  background-color: #EEF4FF;
  border-radius: 10px;
  width:100%;
`;

export const Input = ({ innerRef, lastOne, ...data }) => {
  return (
    <TextInput
      ref={innerRef}
      lastOne={lastOne}
      placeholderTextColor='#84ADFF'
      {...data}
    />
  );
};

const SummaryContainer= styled.View`
width: 100%;
border-bottom-width: ${StyleSheet.hairlineWidth}px;
border-color: #84ADFF;
`
const SummaryText= styled.Text`
margin: 10px 6%;
color:#AFAFAF;
`
const LocationInput = styled.TextInput`
  border-radius: 6px;
  padding: 4px;
  background-color: white;
  width:100%;
`


export const SummaryList = ({text})=> {
  return (
    <SummaryContainer>
      <SummaryText>{text}</SummaryText>
    </SummaryContainer>
  )
}

const DeleteButton = styled.TouchableOpacity`
background-color: grey;
height: 32px;
width: 32px;
justify-content: center;
align-items: center;
border-radius: 6px;
`
const DeleteButtonText= styled.Text`
font-size: 20px;
font-weight: bold;
color: white;
`
const ImageContainer = styled.View`
  width:100%;
  height: 240px;
`

const ImageAddButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: white;
  border-radius: 6px;
`
const RouteContainer = styled.View`
margin: 8px 0;
margin-right: 16px;
width: ${ScreenWidth*0.8}px;
height: 400px;
background-color: #EEF4FF;
border-radius: 10px;
padding: 4%;
`
const LocationContainer = styled.View`
width:100%;
height:100%;
justify-content: space-between;
`
const LocationTitle=styled.Text`
font-size: 20px;
font-weight: 700;
color: #84ADFF;
`
const LocationImage= styled.Image`
width: 100%;
height: 240px;
background-color: #e8e8e8;
border-radius: 6px;
`
const LocationDescription = styled.Text`
border-radius: 6px;
padding:1%;
height: 20%;
font-size: 15px;
font-weight: 400;
color: #AFAFAF;
`

export const LocationList = () => {
  let [title,setTitle]=useState('')
  let [description,setDescription]=useState('')
  let [img,setImg]=useState('')
  const flatList=useRef(null)

  const [locations, setLocations] = useState([
  { 
    title: "", 
    image:"", 
    description: "" ,
    saved:false
  },
])
  
  const selectImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [10,8]
    });
    if (!result.canceled) {
      setImg(result.assets[0].uri)
    };
  };

  const removeItem = (index) => {
    setLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index)
    );
  };

  const updateLocation = () => {
    let newArr = [...locations];
    newArr[locations.length-1].title=title
    newArr[locations.length-1].description=description
    newArr[locations.length-1].saved=true
    newArr[locations.length-1].image=img
    newArr.push({ 
      title: "", 
      image:"", 
      description: "" ,
      saved:false
    })
    setLocations(newArr)
    setTitle('')
    setDescription('')
    setImg('')
    console.log(locations)
  }

  const renderItem = ({ item, index }) => (
    <RouteContainer key={item.title}>
      {(locations[index].saved==true)? (
        <LocationContainer>
          <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between'}}>
          <LocationTitle>{locations[index].title}</LocationTitle>
          <DeleteButton onPress={() => removeItem(index)}>
          <DeleteButtonText>X</DeleteButtonText>
        </DeleteButton>
          </View>
          <LocationImage style={{resizeMode:'contain'}} source={{uri: locations[index].image}}/>
          <LocationDescription>{locations[index].description}</LocationDescription>
        </LocationContainer>

      ):(
      <LocationContainer>
        <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between'}}>
          <LocationInput
          style = {{width:"85%"}}
          autoFocus
          value={title}
          placeholder="제목 입력"
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(value) => setTitle(value)}
          />
          <DeleteButton
            onPress={() => removeItem(index)}>
            <DeleteButtonText>X</DeleteButtonText>
          </DeleteButton>
        </View>
        <ImageContainer>
          {img ? (
            <LocationImage
            style={{resizeMode:'contain'}}
            source={{uri:img}}
            />
            ):(
            <ImageAddButton
              onPress={()=>selectImage(index)}
            >
              <WithLocalSvg
                      width={32}
                      height={32}
                      asset={Plus}
                  />
            </ImageAddButton>)
            }
        </ImageContainer>
        <LocationInput
          style = {{height:"20%"}}
          value={description}
          placeholder='설명'
          returnKeyType='next'
          blurOnSubmit={false}
          onChangeText={(value) => setDescription(value)}
        />
      </LocationContainer>
      )}
    
    </RouteContainer>
  );

  return (
    <View style={{width:ScreenWidth, marginLeft:'-6%',alignItems:'center'}}>
      <FlatList
        horizontal
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        ref={flatList}
        onContentSizeChange={()=> {
          flatList.current.scrollToEnd();
        }}
      />
      <Button onPress={updateLocation}>
        <ButtonText>장소 추가</ButtonText>
      </Button>
    </View>
  );
};

export const regions = [
  {name:"강동구", id:1},
  {name:"강남구", id:2},
  {name:"강북구", id:3},
  {name:"강서구", id:4},
  {name:"관악구", id:5},
  {name:"광진구", id:6},
  {name:"구로구", id:7},    
  {name:"금천구", id:8},
  {name:"노원구", id:9},
  {name:"도봉구", id:10},
  {name:"동대문구", id:11},
  {name:"동작구", id:12},
  {name:"마포구", id:13},
  {name:"서대문구", id:14},
  {name:"서초구", id:15},
  {name:"성동구", id:16},
  {name:"성북구", id:17},
  {name:"송파구", id:18},
  {name:"양천구", id:19},
  {name:"영등포구", id:20},
  {name:"용산구", id:21},
  {name:"은평구", id:22},
  {name:"종로구", id:23},
  {name:"중구",  id:24},    
  {name:"중랑구", id:25}
]