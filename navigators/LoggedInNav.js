import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CreateNoteNav from './CreateRouteNav';
import MyNav from './MyNav';
import Home from '../screens/Home';
import TabIcon from '../components/nav/TabIcon';
import Storage from '../screens/Storage';
import MyPage from '../screens/MyPage';

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
      <Tabs.Screen
        name="Storage"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={'folder-outline'} color={color} size={focused ? 22 : 18} />
          ),
        }}
        component={Storage}
      />
      <Tabs.Screen
        name="MyNav"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={'person-outline'} color={color} size={focused ? 22 : 18} />
          ),
        }}
      >
        {() => <MyNav />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
