import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServicesScreen from '../src/screens/Services/ServicesScreen';
import RatingDetailsScreen from '../src/screens/Services/RatingDetailsScreen';
import ChatScreen from '../src/screens/Services/ChatScreen';
import PaymentScreen from '../src/screens/Payment/PaymentScreen';
import HistoryScreen from '../src/screens/Payment/HistoryScreen';




const PaymentStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false,animation: 'none' }} initialRouteName="PaymentScreen">
      <Stack.Screen name="PaymentScreen"  component={PaymentScreen} />
      <Stack.Screen name="HistoryScreen"  component={HistoryScreen} />
    </Stack.Navigator>
  )

}

export default PaymentStack