import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddData, EditData, Home } from '../pages';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator 
        screenOptions={Platform.OS === 'android' ? {
            headerShown: false, 
            animation: 'slide_from_right',
        }:{
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: false
        }}
        initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AddData' component={AddData} />
        <Stack.Screen name='EditData' component={EditData} />
    </Stack.Navigator>
  )
}

export default Router