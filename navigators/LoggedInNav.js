import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateRoute_1 from '../screens/CreateRoute_1';
import CreateRoute_2 from '../screens/CreateRoute_2';
import CreateRoute_3 from '../screens/CreateRoute_3';
import CreateRoute_4 from '../screens/CreateRoute_4';
import CreateRoute_5 from '../screens/CreateRoute_5';
import { Ionicons } from '@expo/vector-icons';
import MyNav from './MyNav';
import HomeNav from './HomeNav';
import leftArrow from '../assets/images/left_arrow.png';
import StorageNav from './StorageNav';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: 'rgba(255,255,255,0.3)',
          shadowOpacity: 0.25,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 3.84,
        },
        tabBarActiveTintColor: '#0351ea',
      }}
    >
      <Tabs.Screen
        name="HomeNav"
        options={{
          tabBarIcon: ({ focused, color }) => <Ionicons name={'home-outline'} color={color} size={focused ? 22 : 18} />,
        }}
      >
        {() => <HomeNav />}
      </Tabs.Screen>
      <Tabs.Screen
        name="CreateRoute"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={'add-circle-outline'} color={color} size={focused ? 22 : 18} />
          ),
        }}
      >
        {() => (
          <Stack.Navigator
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
            <Stack.Screen name="CreateRoute_1" component={CreateRoute_1} />
            <Stack.Screen name="CreateRoute_2" component={CreateRoute_2} />
            <Stack.Screen name="CreateRoute_3" component={CreateRoute_3} />
            <Stack.Screen name="CreateRoute_4" component={CreateRoute_4} />
            <Stack.Screen name="CreateRoute_5" component={CreateRoute_5} />
          </Stack.Navigator>
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="StorageNav"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={'folder-outline'} color={color} size={focused ? 22 : 18} />
          ),
        }}
      >
        {() => <StorageNav />}
      </Tabs.Screen>
      <Tabs.Screen
        name="MyNav"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={'person-outline'} color={color} size={focused ? 22 : 18} />
          ),
        }}
      >
        {() => <MyNav />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
