import React from 'react'
import { Button, ButtonText, Input } from '../components/CreateRoute_Shared';
import { useForm } from 'react-hook-form';
import { Container, CreateRouteLayout, Title } from '../components/CreateRoute_Shared';


const CreateRoute_2 = ({route}) => {
    const regions = ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"]
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