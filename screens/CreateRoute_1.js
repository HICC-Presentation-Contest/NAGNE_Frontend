import React, { useState } from 'react';
import { Button, ButtonText, Input, Container, CreateRouteLayout, Title } from '../components/CreateRoute_Shared';

const CreateRoute_1 = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const navigateTo2 = () => {
    navigation.navigate('CreateRoute_2', {
      title,
    });
  };
  return (
    <>
      {/* <Image source={Frame} style={{zIndex:999, width:ScreenWidth,height:ScreenHeight,position:'absolute',marginTop:'-24%',opacity:0}}/> */}
      <CreateRouteLayout>
        <Container style={{ marginTop: '50%' }}>
          <Title>여정의 이름을 알려주세요</Title>
          <Input
            placeholderTextColor="#84ADFF"
            autoFocus
            onSubmitEditing={() => navigateTo2()}
            placeholder="제목 입력"
            returnKeyType="next"
            blurOnSubmit={false}
            style={{ marginTop: 16 }}
            onChangeText={text => setTitle(text)}
          />
        </Container>
        <Button
          disabled={title ? false : true}
          style={title ? { backgroundColor: '#0351EA' } : { backgroundColor: '#f3f3f3' }}
          onPress={() => navigateTo2()}
        >
          <ButtonText style={title ? { color: 'white' } : { color: '#747474' }}>다음</ButtonText>
        </Button>
      </CreateRouteLayout>
    </>
  );
};

export default CreateRoute_1;
