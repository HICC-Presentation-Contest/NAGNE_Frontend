import React, { useState } from 'react';
import styled from 'styled-components/native';
import {
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

const CreateRoute_4 = ({ route, navigation }) => {
  let [hashtag, setHashtag] = useState('');
  let title = route.params.title;
  let region = route.params.region;
  let locations = route.params.locations;
  const navigateTo5 = () => {
    navigation.reset({ routes: [{ name: 'CreateRoute_5', params: { title, region, locations, hashtag } }] });
  };

  return (
    <CreateRouteLayout>
      <SummaryContainer>
        <SummaryList text={title} />
        <SummaryList text={region.name} />
      </SummaryContainer>
      <Container>
        <Title>해시태그</Title>
        <Input
          style={{ marginTop: 24 }}
          autoFocus
          placeholder="#"
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={text => setHashtag(text)}
        />
      </Container>
      <Button onPress={() => navigateTo5()}>
        <ButtonText>{hashtag ? '작성완료' : '해시태그 없이 작성완료'}</ButtonText>
      </Button>
    </CreateRouteLayout>
  );
};

export default CreateRoute_4;
