import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServicesScreen from '../src/screens/Services/ServicesScreen';
import RatingDetailsScreen from '../src/screens/Services/RatingDetailsScreen';
import ChatScreen from '../src/screens/Services//ChatScreen';




const ServicesStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false,animation: 'none' }} initialRouteName="ServicesScreen">
      <Stack.Screen name="ServicesScreen"  component={ServicesScreen} />
      <Stack.Screen name="RatingDetailsScreen"  component={RatingDetailsScreen} />
      <Stack.Screen name="ChatScreen"  component={ChatScreen} />
     


    </Stack.Navigator>
  )

}

export default ServicesStack