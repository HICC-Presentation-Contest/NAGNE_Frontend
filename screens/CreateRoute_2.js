import React from 'react'
import { Button, ButtonText, Input } from '../components/CreateRoute_Shared';
import { useForm } from 'react-hook-form';
import { Container, CreateRouteLayout, Title } from '../components/CreateRoute_Shared';

const CreateRoute_2 = ({route}) => {
    console.log(route.params.title)
  return (
    <CreateRouteLayout>
    <Container>
        <Title>여정의 위치를 알려주세요</Title>
        <Input
        autoFocus
        placeholder='위치 검색'
        returnKeyType='next'
        blurOnSubmit={false}
        onChangeText={(text) => setValue('title', text)}
        />
    </Container>
    <Button onPress={()=>navigateTo2()}><ButtonText style={{color:'white',fontWeight:'bold'}}>다음</ButtonText></Button>
</CreateRouteLayout>
  )
}

export default CreateRoute_2