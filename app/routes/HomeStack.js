import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../src/screens/Home/HomeScreen';
import ProfileStack from './ProfileStack';
import ServicesStack from './ServicesStack';
import ChatStack from './ChatStack';
import PaymentStack from './PaymentStack';



const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, animation: 'none' }} initialRouteName="HomeScreen">
     
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileStack" component={ProfileStack} />
      <Stack.Screen name="ServicesStack" component={ServicesStack} />
      <Stack.Screen name="ChatStack" component={ChatStack} />
      <Stack.Screen name="PaymentStack" component={PaymentStack} />
      
    </Stack.Navigator>
  )

}

export default HomeStack