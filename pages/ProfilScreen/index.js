import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyAccount from './MyAccount';
import SettingsPage from './Settings';

const ProfilStack = createNativeStackNavigator();

export default function ProfilStackScreen(props) {
  return (
    <ProfilStack.Navigator
      screenOptions={({ route }) => ({
        gestureEnabled: false,
        headerShown: false
      })}
    >
      <ProfilStack.Screen name="MyAccount" component={MyAccount} />
      <ProfilStack.Screen name="Settings" component={SettingsPage} />
    </ProfilStack.Navigator>
  );
}