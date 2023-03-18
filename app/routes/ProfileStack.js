import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../src/screens/Profile/ProfileScreen';
import EditProfileScreen from '../src/screens/Profile/EditProfileScreen';
import LoginScreen from '../src/screens/LoginScreen';



const ProfileStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false,animation: 'none' }} initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen"  component={ProfileScreen} />
      <Stack.Screen name="LoginScreen"  component={LoginScreen} />
      <Stack.Screen name="EditProfileScreen"  component={EditProfileScreen} />
  
      


    </Stack.Navigator>
  )

}

export default ProfileStack