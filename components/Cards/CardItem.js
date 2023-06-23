import React from 'react'
import styled from 'styled-components/native';
import { ScreenWidth } from '../Shared';
import test from '../../assets/test.jpg'

const CardBackground = styled.ImageBackground`
    height: 70%;
    width: ${ScreenWidth*0.67}px;
    /* background-color: chartreuse; */
    margin-right: 25px;
    border-radius: 25px;
    overflow: hidden;
`
const CardTouchable= styled.TouchableHighlight`
    height:100%;
    border-radius: 25px;
`
const TouchableView= styled.View`
justify-content:space-between;
align-items: center;
padding:30px;
flex:1;

`
const CardRow= styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
`


export default LocationList = () => {
  return (
    <CardBackground source={test}>
        <CardTouchable underlayColor="black" onPress={console.log("pressed")}>
            <TouchableView>
                <CardRow></CardRow>
            </TouchableView>
        </CardTouchable>

    </CardBackground>
  )
}
