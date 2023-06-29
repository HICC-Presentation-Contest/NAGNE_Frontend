import React,{ useState }  from 'react'
import { Button, ButtonText, Container, CreateRouteLayout, Input, LocationList, SummaryList, Title } from '../components/CreateRoute_Shared'
import { View } from 'react-native';

const CreateRoute_3 = ({route}) => {
  let title =route.params.name;
  let region= route.params.region;

  return (
    <CreateRouteLayout style={{justifyContent:'space-between'}}>
      <View style={{width:'100%'}}>
        <SummaryList text={title}/>
        <SummaryList text={region.name}/>
      </View>
    <Container>
        <Title>경로를 입력해주세요 (최대 5개)</Title>
        <LocationList/>
    </Container>
    <Button onPress={()=>navigateTo2()}><ButtonText>다음</ButtonText></Button>
</CreateRouteLayout>
  )
}

export default CreateRoute_3