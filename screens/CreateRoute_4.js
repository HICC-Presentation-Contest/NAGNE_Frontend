import React from 'react';
import { Container, CreateRouteLayout, SummaryList, Title } from '../components/CreateRoute_Shared';
import { LocationList } from '../components/LocationList';
import { View } from 'react-native';

export default CreateRoute_4 = ({ route }) => {
  let routeTitle = route.params.routeName;
  let routeRegion = route.params.routeRegion;
  let locations = route.params.locations;
  console.log(routeTitle, routeRegion.name, locations);

  return (
    <CreateRouteLayout style={{ justifyContent: 'space-between' }}>
      <Title>경로를 입력해주세요 (최대 5개)</Title>
    </CreateRouteLayout>
  );
};
