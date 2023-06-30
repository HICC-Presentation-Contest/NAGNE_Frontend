import React, { useState } from 'react';
import { Button, ButtonText, Container, CreateRouteLayout, SummaryList, Title } from '../components/CreateRoute_Shared';
import { LocationList } from '../components/LocationList';
import { View } from 'react-native';

const CreateRoute_3 = ({ route, navigation }) => {
  let title = route.params.title;
  let region = route.params.region;
  const navigateTo4 = (title, region, locations) => {
    console.log(title, region, locations);
    navigation.navigate('CreateRoute_4', { title, region, locations });
  };
  return (
    <CreateRouteLayout style={{ justifyContent: 'space-between' }}>
      <View style={{ width: '100%' }}>
        <SummaryList text={title} />
        <SummaryList text={region.name} />
      </View>
      <Container>
        <LocationList routeName={title} routeRegion={region} parentFunction={navigateTo4} />
      </Container>
    </CreateRouteLayout>
  );
};

export default CreateRoute_3;
