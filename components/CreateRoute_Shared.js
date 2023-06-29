import { styled } from 'styled-components/native';
import {StyleSheet,View,FlatList,Text } from 'react-native';
import { useState } from 'react';
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
  height: 200px;
`

const ImageAddButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f3f3f3;
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
color: #0351EA;
`
const LocationImage= styled.Image`
width: 100%;
height: 240px;
background-color: #e8e8e8;
border-radius: 6px;
margin-top: 8px;
`
const LocationDescription = styled.Text`
background-color: white;
border-radius: 6px;
padding:1%;
height: 20%;
font-size: 20px;
font-weight: 400;
color: grey;
`

export const LocationList = () => {
  let [title,setTitle]=useState('')
  let [description,setDescription]=useState('')

  const [locations, setLocations] = useState([
  { 
    title: "hello", 
    image:"file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fnagne-native-2959e224-a56b-485e-8542-f96033dc10ad/ImagePicker/19377dc0-c7dd-4d54-89d0-99c178d456fc.jpeg", 
    description: "description" ,
    saved:true
  },
  { 
    title: "", 
    image:"", 
    description: "" ,
    saved:false
  },
])
//   const [locations, setLocations] = useState([
//   { 
//     title: "1", 
//     image:"", 
//     description: "1" 
//   },
//   { 
//     title: "2", 
//     image:"", 
//     description: "3" 
//   }
// ]);
  
  const selectImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [10,8]
    });
    if (!result.canceled) {
      updateLocation(index,"image",result.assets[0].uri)
      console.log(locations)
    };
  };

  const removeItem = (index) => {
    setLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index)
    );
  };

  const updateLocation = (id,type,value) => {
    let newArr = [...locations];
    if (type='title'){
      locations[id].title=value;
    } else if (type='description'){
      locations[id].description=value;
    } else {
      locations[id].image = value
    }
    setLocations(newArr)
  }
  const saveLocations = () => {
    console.log("Saved Locations:", locations);
    let newArr = [...locations];
    newArr[locations.length-1].title=title;
    newArr[locations.length-1].description=description;
    newArr.push({ 
      title: "", 
      image:"", 
      description: "" 
    })
    console.log("Saved Locations:", newArr);
    setLocations(newArr)
    setTitle('')
    setDescription('')
  };
  const addItem = () => {
    
  }

  const renderItem = ({ item, index }) => (
    <RouteContainer key={item.title}>
      {(locations[index].saved==true)? (
        <LocationContainer>
          <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between'}}>
          <LocationTitle>{locations[index].title}</LocationTitle>
          <DeleteButton
          onPress={() => removeItem(index)}>
          <DeleteButtonText>X</DeleteButtonText>
        </DeleteButton>
          </View>
          <LocationImage style={{resizeMode:'contain'}} source={{uri: locations[index].image}}/>
          <LocationDescription>{locations[index].description}</LocationDescription>
        </LocationContainer>
      ):(
      <>
        <Input
        autoFocus
        value={locations[index].title}
        placeholder="제목 입력"
        returnKeyType="next"
        blurOnSubmit={false}
        onChangeText={(value) => setTitle(value)}
        />
        <ImageContainer>
          {locations[index].image ? (
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
        <Input
            value={locations[index].description}
            placeholder='설명'
            returnKeyType='next'
            blurOnSubmit={false}
            onChangeText={(value) => setDescription(value)}
          />
        <DeleteButton style={{}}
          onPress={() => removeItem(index)}>
          <DeleteButtonText>X</DeleteButtonText>
        </DeleteButton>
      </>
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
      />
      <Button onPress={saveLocations}>
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





// const ItemContainer= styled.View`
// flex-direction: row;
// align-items: center;
// padding: 10px;
// border-bottom-width: ${StyleSheet.hairlineWidth};
// border-color: #ccc;
// `
// const ItemTitle=styled.Text`
// font-size: 18px;
// font-weight: bold;
// color: #333;
// `
// const DropDownButton = styled.TouchableOpacity`
// margin-left: 10px;
// `
// const DropDownButtonTitle= styled.Text`
// font-size: 18px;
// font-weight: bold;
// `

// const ItemDescription = styled.Text`
// margin-top: 5px;
// padding: 0px 20px;
// `

// const LocationList = () => {
  //   const [selectedItem, setSelectedItem] = useState(null);
  //   const onPressDropdown = id => {
  //     setSelectedItem(selectedItem === id ? null : id);
  //   };
  //   const renderLocationItem = ({item}) => (
  //     <ItemContainer  key={item.id}>
  //       <ItemTitle>{item.name}</ItemTitle>
  //       <DropDownButton
  //         onPress={() => onPressDropdown(item.id)}>
  //         <DropDownButtonTitle>{selectedItem === item.id ? '▲' : '▼'}</DropDownButtonTitle>
  //       </DropDownButton>
  //       {selectedItem === item.id && (
  //         <ItemDescription>{item.description}</ItemDescription>
  //       )}
  //     </ItemContainer>
  //   );
  
  //   return (
  //     <FlatList
  //       data={location}
  //       renderItem={renderLocationItem}
  //       keyExtractor={item => `${item.id}`}
  //     />
  //   );
  // };