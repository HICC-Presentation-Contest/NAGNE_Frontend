import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Blank24px, Button, ButtonText, Container, CreateRouteLayout, Title } from '../components/CreateRoute_Shared';
import { Text, ScrollView } from 'react-native';
import { regions } from '../components/CreateRoute_Shared';
import styled from 'styled-components/native';

const RegionContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: -8px;
`;
const ListItem = styled.TouchableOpacity`
  width: 30%;
  height: 54px;
  margin: 1.6%;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: #dbdbdb 0.5px;
  border-radius: 8px;
  margin-bottom: 4px;
`;
const CreateRoute_2 = ({ navigation, route }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  let title = route.params.title;
  const navigateTo3 = () => {
    let region = regions[selectedRegion];
    navigation.navigate('CreateRoute_3', {
      title,
      region,
      location: [],
    });
  };
  return (
    <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
      <CreateRouteLayout>
        <Container>
          <Title style={{ marginTop: 24 }}>여정의 위치를 알려주세요</Title>
          <Blank24px />
          <RegionContainer>
            {regions.map((region, index) => (
              <ListItem
                key={region.id}
                style={[
                  selectedRegion === region.id && { backgroundColor: '#0351EA' },
                  index % 3 === 2 && { marginRight: 0 },
                ]}
                onPress={() => setSelectedRegion(region.id)}
              >
                <Text
                  style={
                    selectedRegion === region.id
                      ? { color: 'white', fontWeight: '800' }
                      : { color: '#747474', fontWeight: '400' }
                  }
                >
                  {region.name}
                </Text>
              </ListItem>
            ))}
          </RegionContainer>
        </Container>
        <Button
          onPress={() => {
            navigateTo3();
          }}
          style={[{ margin: 32 }, selectedRegion ? { backgroundColor: '#0351EA' } : { backgroundColor: '#f3f3f3' }]}
        >
          <ButtonText style={selectedRegion ? { color: 'white' } : { color: '#747474' }}>다음</ButtonText>
        </Button>
      </CreateRouteLayout>
    </ScrollView>
  );
};

export default CreateRoute_2;
