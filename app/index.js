import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';


import HomeStack from './routes/HomeStack'

const App = () => {
    useEffect(()=>{
        SplashScreen.hide();
      },[])

      const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false,animation: 'none' }}  initialRouteName="LoginScreen">
            <Stack.Screen  name='LoginScreen'  component={LoginScreen}/>
          
            <Stack.Screen name='SignupScreen'  component={SignupScreen}/>
       
            <Stack.Screen name='Home' screenOptions={{animation: 'none'}} component={HomeStack}/>
           


        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App