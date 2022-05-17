import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AllLook from './AllLook';
import NewLook from './NewLook';
import DetailLook from '../DetailLook';
import DetailProduct from '../DetailProduct';

const LookStack = createNativeStackNavigator();

export default function LookStackScreen() {
  return (
    <LookStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })
      }>
      <LookStack.Screen name="AllLock" component={AllLook} />
      <LookStack.Screen name="NewLook" component={NewLook} />
      <LookStack.Screen name="DetailLook" component={DetailLook} />
      <LookStack.Screen name="DetailProduct" component={DetailProduct} />
    </LookStack.Navigator>
  );
}