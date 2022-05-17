import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetailLook from '../DetailLook';
import SearchPage from './SearchPage';
import DetailProduct from '../DetailProduct';

const SearchStack = createNativeStackNavigator();

export default function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <SearchStack.Screen name="SearchPage" component={SearchPage} />
      <SearchStack.Screen name="DetailLook" component={DetailLook} />
      <SearchStack.Screen name="DetailProduct" component={DetailProduct} />
    </SearchStack.Navigator>
  );
}