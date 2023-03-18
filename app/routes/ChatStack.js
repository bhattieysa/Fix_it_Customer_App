import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServicesScreen from '../src/screens/Services/ServicesScreen';
import RatingDetailsScreen from '../src/screens/Services/RatingDetailsScreen';
import ChatScreen from '../src/screens/Services/ChatScreen';
import ChatScreenList from '../src/screens/Chat/ChatScreen';
import ChatWithAdmin from '../src/screens/Chat/ChatWithAdmin';




const ChatStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false,animation: 'none' }} initialRouteName="ChatScreenList">
      <Stack.Screen name="ChatScreenList"  component={ChatScreenList} />
     
      <Stack.Screen name="ChatScreen"  component={ChatScreen} />
      <Stack.Screen name="ChatWithAdmin"  component={ChatWithAdmin} />
     


    </Stack.Navigator>
  )

}

export default ChatStack