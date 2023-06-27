import React from 'react'
import Frame from '../assets/Wrt_1.png'
import { Button, ButtonText, Input } from '../components/CreateRoute_Shared';
import { useForm } from 'react-hook-form';
import { Container, CreateRouteLayout, Title } from '../components/CreateRoute_Shared';

const CreateRoute_1 = ({ navigation }) => {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const navigateTo2 = ()=> {
        const { title } = getValues();
        navigation.navigate('CreateRoute_2',{title})
    }
    return (
        <>
        {/* <Image source={Frame} style={{zIndex:999, width:ScreenWidth,height:ScreenHeight,position:'absolute',marginTop:'-24%',opacity:0}}/> */}
        <CreateRouteLayout>
            <Container>
                <Title>여정의 이름을 알려주세요</Title>
                <Input
                autoFocus
                placeholder='제목 입력'
                returnKeyType='next'
                blurOnSubmit={false}
                onChangeText={(text) => setValue('title', text)}
                />
            </Container>
            <Button onPress={()=>navigateTo2()}><ButtonText >다음</ButtonText></Button>
        </CreateRouteLayout>
        </>
    )
}

export default CreateRoute_1