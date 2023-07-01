import React, { useState } from 'react';
import styled from 'styled-components/native';
import {
  Blank24px,
  Button,
  ButtonText,
  Container,
  CreateRouteLayout,
  Input,
  SummaryList,
  Title,
} from '../components/CreateRoute_Shared';

const SummaryContainer = styled.View`
  width: 100%;
`;

export default CreateRoute_4 = ({ route }) => {
  let [hashtag, setHashtag] = useState('');
  let title = route.params.title;
  let region = route.params.region;
  let locations = route.params.locations;

  const navigateTo5 = () => {
    navigation.navigate('CreateRoute_5', {
      title,
      region,
      locations,
      hashtag,
    });
  };
  return (
    <CreateRouteLayout>
      <SummaryContainer>
        <SummaryList text={title} />
        <SummaryList text={region.name} />
      </SummaryContainer>
      <Container>
        <Title>해시태그</Title>
        <Blank24px />
        <Input
          autoFocus
          placeholder="#"
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={text => setHashtag(text)}
        />
      </Container>
      <Button
        style={
          !hashtag && {
            backgroundColor: '#D9D9D9',
          }
        }
        disabled={hashtag ? false : true}
        onPress={() => navigateTo5()}
      >
        <ButtonText style={hashtag ? { color: 'white' } : { color: '#747474' }}>완료</ButtonText>
      </Button>
    </CreateRouteLayout>
  );
};
