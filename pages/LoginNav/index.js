import * as React from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';

import * as tools from "../../helper";
import { colorPrimaryFn, colorSecondaryFn } from '../../styles';

import LookStackScreen from '../LookScreen/index';
import FavorisStackScreen from '../FavorisScreen/index';
import SearchScreen from '../SearchScreen/index';
import ProfilScreen from '../ProfilScreen/index';

//Redux
import { useSelector } from 'react-redux';


function MyTabBar(props) {
  return (
    <BottomTabBar {...props} />
  );
}

export default function LoginNav() {
  const Tab = createBottomTabNavigator();

  let allData = useSelector((state) => state.lookData);

  const colorPrimary = colorPrimaryFn(allData.settings.theme);
  const colorSecondary = colorSecondaryFn(allData.settings.theme);

  return (<Tab.Navigator
    tabBar={(props) => <MyTabBar {...props} />}
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: colorPrimary.primary,
      tabBarInactiveTintColor: colorSecondary.primary,
      headerShown: false,
      keyboardHidesTabBar: true,
    })}
  >
    <Tab.Screen name="Search" component={SearchScreen} options={tools.defineTab('search', "Search")} />
    <Tab.Screen name="Look" component={LookStackScreen} options={tools.defineTab('shirt-outline', "Looks", "ionicon")} />
    <Tab.Screen name="Favoris" component={FavorisStackScreen} options={tools.defineTab('heart', "Favoris")} />
    <Tab.Screen name="Profil" component={ProfilScreen} options={tools.defineTab('user', "Profile")} />
  </Tab.Navigator>)
}