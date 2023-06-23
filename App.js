import { Image, Dimensions } from 'react-native';
import { useState,useEffect } from 'react';
import Header from './components/Header';
import styled from 'styled-components/native';
import Frame from './assets/FIRST_1.png'
import CardSection from './components/CardSection';
import axios from 'axios';

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  height: 100%;
  margin-top: 8%;
  border: 1px;
`;
const Button = styled.TouchableOpacity`
  background-color: 'black';
  padding: 15px 10px;
  border-radius: 3px;
  width: 100%;
`;

export let {width,height} = Dimensions.get('window')

export default function App() {
  let [data,setData]= useState([])  
  let url = "http://3.37.189.80/trip";
  let JWTToken= 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2ODc0OTgwOTcsImV4cCI6MTY4ODEwMjg5Nywic3ViIjoibmVvc2VsZjExMDVAZ21haWwuY29tIiwiVE9LRU5fVFlQRSI6IkFDQ0VTU19UT0tFTiJ9.b-fnUT41Pw3RF2r3JbtgUJNofVBlYxk75JxrCRQ9VXTfAne9sGp6ZV6qFQ7rejUNzH1e-7afaD-VXDcaPaCitw'

  const fetchTripData = async (address, pageable) => {
    try {
      const { page, size } = pageable;
      const queryStr = `?address=${address}&page=${page}&size=${size}`;
      const response = await axios.get(url + queryStr, { headers: {"Authorization" : `Bearer ${JWTToken}`}}).then()
      const tripData = response.data;
      console.log('Successfully fetched trip data:', tripData);
    } catch (error) {
      console.error('Failed to fetch trip data:');
    }
  };
    

  useEffect(() => {
    const exampleAddress = 'seoul';
    const examplePageable = {
      page: 1,
      size: 10,
    };

    fetchTripData(exampleAddress, examplePageable);
  }, []);
  
  let cardsData=[
    {
      id:1,
      text:'hello1'
  },{
      id:2,
      text:'hello2'
  },{
      id:3,
      text:'hello3'
  },{
      id:4,
      text:'hello4'
  }
  ]


  return (
  <>
    <Image source={Frame} style={{width,height,position:'absolute',marginTop:28,opacity:0.2}}></Image>
      <ScreenLayout>
        <Header/> 
        <CardSection data={cardsData}/>
      </ScreenLayout>
    </>
  );
}