import { Image, Dimensions } from 'react-native';
import LoggedInNav from './navigators/LoggedInNav';
import { NavigationContainer } from '@react-navigation/native';
import { ScreenHeight,ScreenWidth } from './components/Shared';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <LoggedInNav/>
      </NavigationContainer>
    </>
  );
}