import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FavorisAll from './FavorisAll';
import DetailLook from '../DetailLook';
import DetailProduct from '../DetailProduct';
import Wishlist from './Wishlist';

const FavorisStack = createNativeStackNavigator();

export default function FavorisStackScreen() {
  return (
    <FavorisStack.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
  })}
    >
      <FavorisStack.Screen name="AllFav" component={FavorisAll} />
      <FavorisStack.Screen name="Wish" component={Wishlist} />
      <FavorisStack.Screen name="DetailLook" component={DetailLook} />
      <FavorisStack.Screen name="DetailProduct" component={DetailProduct} />
    </FavorisStack.Navigator>
  );
}