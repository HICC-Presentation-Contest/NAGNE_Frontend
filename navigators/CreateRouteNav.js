import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateRoute_1 from '../screens/CreateRoute_1';
import CreateRoute_2 from '../screens/CreateRoute_2';
import CreateRoute_3 from '../screens/CreateRoute_3';

const stack = createNativeStackNavigator();

export default function CreateNoteNav() {
  return (
    <stack.Navigator
      screenOptions={{
        // headerShown: false
      }}
    >
        <stack.Screen
        options={{ headerShown: false }}
        name='CreateRoute_1'
        component={CreateRoute_1}
        />
        <stack.Screen
        options={{ headerShown: false }}
        name='CreateRoute_2'
        component={CreateRoute_2}
        />
        <stack.Screen
        options={{ headerShown: false }}
        name='CreateRoute_3'
        component={CreateRoute_3}
        />
    </stack.Navigator>
  );
}
