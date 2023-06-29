import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity,Image} from 'react-native';
import CreateRoute_1 from '../screens/CreateRoute_1';
import CreateRoute_2 from '../screens/CreateRoute_2';
import CreateRoute_3 from '../screens/CreateRoute_3';
import {  WithLocalSvg } from 'react-native-svg';
import LeftArrow from '../assets/images/left_arrow.svg'

const stack = createNativeStackNavigator();

export default function CreateNoteNav() {
  return (
      <>
    <stack.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: ({onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <WithLocalSvg
                    width={24}
                    height={24}
                    asset={LeftArrow}
                />
            </TouchableOpacity>
          ),
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        title: '경로 작성'
      }}
    >
        <stack.Screen
        name='CreateRoute_1'
        component={CreateRoute_1}
        />      
        <stack.Screen
          name='CreateRoute_2'
          component={CreateRoute_2}
        />
        <stack.Screen
          name='CreateRoute_3'
          component={CreateRoute_3}
        />
    </stack.Navigator>
    </>
  );
}
