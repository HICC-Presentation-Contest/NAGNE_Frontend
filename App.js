import { Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Frame from './assets/FIRST_1.png'
import LoggedInNav from './navigators/LoggedInNav';
import { NavigationContainer } from '@react-navigation/native';

export let {width,height} = Dimensions.get('window')

export default function App() {
  return (
    <>
      <Image source={Frame} style={{width,height,position:'absolute',marginTop:28,opacity:0.2}}></Image>
      <NavigationContainer>
        <LoggedInNav/>
      </NavigationContainer>
    </>
  );
}