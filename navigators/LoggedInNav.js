import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CreateNoteNav from './CreateRouteNav';
import Home from '../screens/Home';
import Test from '../screens/Test';
import TabIcon from '../components/nav/TabIcon';
import Test2 from '../screens/Test2';

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'rgba(255,255,255,0.3)',
        },
        tabBarActiveTintColor: 'white',
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={'home-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen name="Test2" component={Test2} />
      <Tabs.Screen
        name="CreateRoute"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={'add-circle-outline'} color={color} size={focused ? 22 : 18} />
          ),
        }}
      >
        {() => <CreateNoteNav />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
