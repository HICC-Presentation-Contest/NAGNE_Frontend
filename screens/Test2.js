import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import styled from 'styled-components/native';
import { ButtonText, CreateRouteLayout } from '../components/CreateRoute_Shared';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: blue;
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function Test2({ navigation }) {
  const [ok, setOk] = useState(false);
  const getPhotos = async () => {
    if (ok) {
      const { assets: photos } = await MediaLibrary.getAssetsAsync();
      console.log(photos);
    }
  };
  const getPermissions = async () => {
    const { canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (canAskAgain) {
      const permissions = await MediaLibrary.requestPermissionsAsync();
      if (permissions.granted == true) {
        setOk(true);
      }
    }
  };
  useEffect(() => {
    getPermissions();
    getPhotos();
  }, []);
  return (
    <CreateRouteLayout style={{ justifyContent: 'center' }}>
      <ButtonText style={{ color: 'black' }}>권한이 없습니다</ButtonText>
    </CreateRouteLayout>
  );
}
