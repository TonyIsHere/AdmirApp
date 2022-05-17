import React from 'react';
import { Icon } from 'react-native-elements'
import { StyleSheet, Text, View, Button, Animated, TouchableOpacity, SafeAreaView } from 'react-native';
/**
 * Define TabItem options
 */
export function defineTab(tabicon, name = "", type = "font-awesome") {
  return {
    tabBarIcon: ({ color }) => <Icon name={tabicon} color={color} type={type}  size={23} />,
    tabBarLabel: name,
  };
}


/**
 * Check if a param is send from route params
 * @param {*} props 
 * @param {*} name 
 * @param {*} defaultVal 
 */
export function checkParamRouteExist(props, name, defaultVal = '') {
  return props.route.params && props.route.params.hasOwnProperty(name)
    ? props.route.params[name]
    : defaultVal;
}


export function generateIcon(name,color="black", type="font-awesome",  size=23) {
  return (<Icon name={name} type={type} color={color} size={size} />);
}


export const generateUid = function(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}