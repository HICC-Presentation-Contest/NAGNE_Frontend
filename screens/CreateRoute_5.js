import React, { useState } from 'react';
import { Blank24px, Button, ButtonText, Container, CreateRouteLayout, Title } from '../components/CreateRoute_Shared';

export default CreateRoute_4 = ({ route }) => {
  let [mode, setMode] = useState(0);
  let title = route.params.title;
  let region = route.params.region;
  let locations = route.params.locations;

  return (
    <CreateRouteLayout>
      <MapView />
    </CreateRouteLayout>
  );
};
