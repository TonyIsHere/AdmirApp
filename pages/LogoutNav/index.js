import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './Welcome';
import CreateAccount from './CreateAccount';
import LoginPage from './LoginPage';

export default function LogoutNav() {
    const LogoutStack = createNativeStackNavigator();
    return (<LogoutStack.Navigator
        screenOptions={({ route }) => ({
            gestureEnabled: false
        })}
    >
        <LogoutStack.Screen name="Logout" options={{ headerShown: false }} component={Welcome} />
        <LogoutStack.Screen name="Login" options={{ headerShown: false }} component={LoginPage} />
        <LogoutStack.Screen name="CreateAccount" options={{ headerShown: false }} component={CreateAccount} />
    </LogoutStack.Navigator>)
}