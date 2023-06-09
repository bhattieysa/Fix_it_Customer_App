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
            'Inicio de sesión exitoso',
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
            'Error al iniciar sesión',
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
                style={{ width: wide * 0.65, height: wide * 0.25, alignSelf: 'center' }}
                source={require("../../Images/logo.png")}
              />
              <Text style={{ marginVertical: wide * 0.09, alignSelf: 'center', fontSize: wide * 0.06, fontWeight: 'bold', color: '#000000' }}>Inicie sesión en su cuenta</Text>



              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Dirección de correo electrónico</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput onChangeText={text => setEmailAddress(text)} placeholder='Ingrese correo electrónico' style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {emailAddress == false ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >El correo electrónico no puede estar en blanco</Text>
                  </View>
                </View>
                :
                <></>
              }
              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Contraseña</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput secureTextEntry={true} onChangeText={text => setPassword(text)} placeholder='Introducir la contraseña' style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {password == false ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >La contraseña no puede estar en blanco</Text>
                  </View>
                </View>
                :
                <></>
              }

              <TouchableOpacity onPress={() => Login()}
                style={{ marginTop: wide * 0.1, justifyContent: 'center', alignItems: 'center' }} >
                <View style={{ backgroundColor: Colors.main, height: wide * 0.14, borderRadius: wide * 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                  <View style={{ flex: 3, alignItems: 'center', }}>
                    <Text style={{ color: Colors.white, fontSize: wide * 0.04, fontWeight: 'bold' }}>Ingresar</Text>
                  </View>

                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: wide * 0.04 }}>
                <Text style={{ fontSize: wide * 0.039, color: '#000000', }}>No tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('SignupScreen')
                }}><Text style={{ marginTop: -wide * 0.005, fontSize: wide * 0.043, marginLeft: 5, color: Colors.main, fontWeight: 'bold' }} >Inicie</Text></TouchableOpacity>
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