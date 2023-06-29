import React, { useState } from 'react';
import { Button, ButtonText, Container, CreateRouteLayout, SummaryList, Title } from '../components/CreateRoute_Shared';
import { LocationList } from '../components/LocationList';
import { View } from 'react-native';

const CreateRoute_3 = ({ route, navigation }) => {
  let title = route.params.name;
  let region = route.params.region;

  const navigateTo4 = (routeName, routeRegion, locations) => {
    navigation.navigate('CreateRoute_4', { routeName, routeRegion, locations });
  };
  return (
    <CreateRouteLayout style={{ justifyContent: 'space-between' }}>
      <View style={{ width: '100%' }}>
        <SummaryList text={title} />
        <SummaryList text={region.name} />
      </View>
      <Container>
        <Title>경로를 입력해주세요 (최대 5개)</Title>
        <LocationList routeName={title} routeRegion={region} parentFunction={navigateTo4} />
      </Container>
    </CreateRouteLayout>
  );
};

export default CreateRoute_3;
