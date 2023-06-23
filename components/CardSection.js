import React from 'react'
import styled from 'styled-components/native';
import CardItem from './Cards/CardItem';

const CardList = styled.FlatList`
width: 100%;
flex:1;
padding-left: 25px;
padding-bottom:15px;
/* background-color: chartreuse; */
`

export default LocationList = (props) => {
    
  return (
    <CardList
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
    paddingRight:25,
    alignItems:"center"
    }}
    data={props.data}
    keyExtractor={({id})=>id.toString()}
    renderItem={({item})=><CardItem {...item}/>}
    />
  )
}
