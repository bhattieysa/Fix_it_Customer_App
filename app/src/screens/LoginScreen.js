import { View, Text, Button, SafeAreaView, StatusBar, KeyboardAvoidingView, Image, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState ,useEffect,useCallback} from 'react'

import Colors from '../constants/Colors';
import Layout from '../constants/Dimensions';
import KeyBoardDismissHandler from '../components/KeyBoardDismissHandler';
import AppLoader from '../components/Apploader';
import axios from 'axios';
import * as api from '../../apis/api';
import { StackActions, NavigationActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const LoginScreen =  ({ navigation }) => {

  // const [verify, setVerify] = useState(false)
  // const [email, setEmail] = useState(false)
  const [loading, setLoading] = useState(false)
  const [emailAddress, setEmailAddress] = useState(null)
  const [password, setPassword] = useState(null)
  const navigation1 = useNavigation();


  

    useEffect( () => {
     

      async function check() {
        const data = await AsyncStorage.getItem('user')
        if (data != null) {
          navigation1.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
  
        }
    
      }
  
      check()



     
 
    }, [])

  const Login = () => {

    if (emailAddress == null) {
      setEmailAddress(false)
      return
    }
    if (password == null) {
      setPassword(false)
      return
    }
    var formData = new FormData();
    formData.append('email', emailAddress);
    formData.append('password', password);

    setLoading(true)

    axios({
      method: 'POST',
      url: api.LOGIN_URL,
      data: formData,
      
    
     

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    },)
      .then( async (response)=> {

        console.log(response.data)
        if (response.data.login.error == 'false') {
          setLoading(false)
          Alert.alert(
            '',
            'Login Successful',
          );

         await  AsyncStorage.setItem('user',JSON.stringify(response.data))
        
          navigation1.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
         

        } else {
          setLoading(false)
          Alert.alert(
            '',
            'Failed To Login',
          );
        }
      })
      .catch(function (error) {
        console.log("error11",error)
        setLoading(false)
      })


  }



  let wide = Layout.width;
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
      <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
      <AppLoader visible={loading} />
      <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">

            <View style={{ marginHorizontal: wide * 0.07, marginTop: wide * 0.1 }}>
              <Image
                style={{ width: wide * 0.8, height: wide * 0.4, alignSelf: 'center' }}
                source={require("../../Images/logo.png")}
              />
              <Text style={{ marginVertical: wide * 0.09, alignSelf: 'center', fontSize: wide * 0.06, fontWeight: 'bold', color: '#000000' }}>Sign In To Your Account</Text>



              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Email Address</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput onChangeText={text => setEmailAddress(text)} placeholder='Enter Email' style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {emailAddress == false ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >Email Can't Be Blank</Text>
                  </View>
                </View>
                :
                <></>
              }
              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Password</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput secureTextEntry={true} onChangeText={text => setPassword(text)} placeholder='Enter Password' style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {password == false ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >Password Can't Be Blank</Text>
                  </View>
                </View>
                :
                <></>
              }

              <TouchableOpacity onPress={() => Login()}
                style={{ marginTop: wide * 0.1, justifyContent: 'center', alignItems: 'center' }} >
                <View style={{ backgroundColor: Colors.main, height: wide * 0.14, borderRadius: wide * 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                  <View style={{ flex: 3, alignItems: 'center', }}>
                    <Text style={{ color: Colors.white, fontSize: wide * 0.04, fontWeight: 'bold' }}>LOGIN</Text>
                  </View>

                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: wide * 0.04 }}>
                <Text style={{ fontSize: wide * 0.039, color: '#000000', }}>Don't have a Account?</Text>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('SignupScreen')
                }}><Text style={{ marginTop: -wide * 0.005, fontSize: wide * 0.043, marginLeft: 5, color: Colors.main, fontWeight: 'bold' }} >Sign Up</Text></TouchableOpacity>
              </View>

            </View>
            {/* <Button
                style={{ marginTop: wide * 0.1 }}
                onPress={
                  () => navigation.dispatch(StackActions.replace('Home', { data: "eysa azhar" }))}
                title="Home"
              />
              <Button
                onPress={() => navigation.navigate('SignupScreen', { data: 'hello eysa' })}
                title="Signup"
              /> */}
          </ScrollView>
        </KeyboardAvoidingView>



      </SafeAreaView>
    </View>
  )
}

export default LoginScreen