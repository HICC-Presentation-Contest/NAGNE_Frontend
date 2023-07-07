import React from 'react';
import Home from '../../assets/images/home.svg';
import add from '../../assets/images/add.svg';
import user from '../../assets/images/user.svg';
import folder from '../../assets/images/folder.svg';
import { WithLocalSvg } from 'react-native-svg';
import { View } from 'react-native';

export default function TabIcon({ iconName }) {
  return (
    <View style={{ backgroundColor: 'chartreuse' }}>
      <WithLocalSvg
        // style={focused ? { color: '#0351ea' } : { color: '#747474' }}
        width={24}
        height={24}
        asset={iconName == 'Home' && Home}
      />
    </View>
  );
}
