import { styled } from 'styled-components/native';

export const CreateRouteLayout = styled.SafeAreaView`
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: white;
    width:100%;
    flex:1;
`
export const Container = styled.SafeAreaView`
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 90%;
`
export const Title = styled.Text`
font-size: 20px;
font-weight: bold;
color: #0351EA;
margin-bottom: 12px;
`
export const ButtonText = styled.Text`
font-size: 16px;
font-weight: 400;
color: #0351EA;
`
export const Button = styled.TouchableOpacity`
  background-color: #0351EA;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 42px;
  border-radius: 22px;
  width: 46%;
`;

const TextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  border-radius: 4px;
  background-color: #EEF4FF;
  border-radius: 10px;
  width:100%;
`;

export const Input = ({ innerRef, lastOne, ...data }) => {
  return (
    <TextInput
      ref={innerRef}
      lastOne={lastOne}
      placeholderTextColor='#84ADFF'
      {...data}
    />
  );
};
