import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateRoute_1 from '../screens/CreateRoute_1';
import CreateRoute_2 from '../screens/CreateRoute_2';
import CreateRoute_3 from '../screens/CreateRoute_3';
import CreateRoute_4 from '../screens/CreateRoute_4';
import leftArrow from '../assets/images/left_arrow.png';
import CreateRoute_5 from '../screens/CreateRoute_5';

const stack = createNativeStackNavigator();

export default function CreateRouteNav() {
  return (
    <>
      <stack.Navigator
        screenOptions={{
          headerShown: true,
          headerBackImageSource: leftArrow,
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
          title: '경로 작성',
        }}
      >
        <stack.Screen name="CreateRoute_1" component={CreateRoute_1} />
        <stack.Screen name="CreateRoute_2" component={CreateRoute_2} />
        <stack.Screen name="CreateRoute_3" component={CreateRoute_3} />
        <stack.Screen name="CreateRoute_4" component={CreateRoute_4} />
        <stack.Screen name="CreateRoute_5" component={CreateRoute_5} />
      </stack.Navigator>
    </>
  );
}
