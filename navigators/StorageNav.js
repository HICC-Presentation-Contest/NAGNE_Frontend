import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Storage from '../screens/Storage';
import RoutePage from '../screens/RoutePage';
import { Title } from '../components/CreateRoute_Shared';

const Stack = createStackNavigator();

export default function StorageNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Storage" options={{ title: '저장한 지도' }} component={Storage} />
      <Stack.Screen name="RoutePage" options={{ headerShown: false }} component={RoutePage} />
    </Stack.Navigator>
  );
}
