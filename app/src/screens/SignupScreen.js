import { View, Text, Button, SafeAreaView, StatusBar, Alert, KeyboardAvoidingView, FlatList, Image, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native'
import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import Colors from '../constants/Colors';
import Layout from '../constants/Dimensions';
import { BlurView } from "@react-native-community/blur";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppLoader from '../components/Apploader';
import axios from 'axios';
import * as api from '../../apis/api';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker'

const SignupScreen = ({ route, navigation }) => {

  const [showCategoryDropDown, setShowCategoryrDropDown] = useState(false)
  const [showSubCategoryDropDown, setShowSubCategoryrDropDown] = useState(false)
  const [categoryValue, setCategoryValue] = useState('Select Category')
  const [subCategoryValue, setSubCategoryValue] = useState('Select Sub Category')
  const [loading, setLoading] = useState(false)
  const [professionCertificates, setProfessionCertificates] = useState(null)
  const [categories, setCategories] = useState()
  const [categoriesIndex, setCategoriesIndex] = useState()
  const [categoriesId, setCategoriesId] = useState()
  const [subCategoriesId, setSubCategoriesId] = useState()
  const [subCategories, setSubCategories] = useState()
  const [frontSideDNI, setFrontSideDNI] = useState(null)
  const [frontSideDNIBase64, setFrontSideDNIBase64] = useState(null)
  const [image, setImage] = useState(null)
  const [imageBase64, setImageBase64] = useState(null)
  const [backSideDNIBase64, setBackSideDNIBase64] = useState(null)
  const [backSideDNI, setBackSideDNI] = useState(null)
  const [backgroundCheckCertificatesBase64, setbackgroundCheckCertificatesBase64] = useState(null)
  const [professionCertificatesBase64, setProfessionCertificatesBase64] = useState(null)
  const [backgroundCheckCertificates, setbackgroundCheckCertificates] = useState(null)
  const [fullName, setFullName] = useState("")
  const [dni, setDni] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [experience, setExperience] = useState("")
  const [address, setAddress] = useState("")
  const [accountHolderName, setAccountHolderName] = useState(null)
  const [typeOfAccount, setTypeOfAccount] = useState(null)
  const [accountNumber, setAccountNumber] = useState(null)
  const [bankName, setBankName] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState("")


  let wide = Layout.width;
  let high = Layout.height;



  const UploadImage = () => {
    Alert.alert(
      "Sube tu imagen",
      'Seleccionar foto de',
      [
        {
          text: 'Galería',
          onPress: async () => {
          await  ImagePicker.openPicker({
              width: 500,
              height: 500,
              cropping: true,
              cropperCircleOverlay: true,
              sortOrder: 'none',
              compressImageMaxWidth: 1000,
              compressImageMaxHeight: 1000,
              compressImageQuality: 1,
              compressVideoPreset: 'MediumQuality',
              includeExif: true,
              cropperStatusBarColor: 'white',
              cropperToolbarColor: 'white',
              cropperActiveWidgetColor: 'white',
              cropperToolbarWidgetColor: '#3498DB',
              mediaType: 'photo',
              includeBase64: true
            })
              .then((image) => {
                // setBase64(image.data)
                // setProfileImage(image.path)
                setImage(image.path)
                setImageBase64(image.data)

              })
              .catch((e) => {
                //Toast.show("Failed")
              });
          }
        },
        {
          text: 'Cámara', onPress: () => {
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
              mediaType: 'photo',
              includeBase64: true
            }).then(image => {

              // setBase64(image.data)
              // setProfileImage(image.path)
              setImage(image.path)
              setImageBase64(image.data)


            });
          }
        },
        {
          text: 'Cancelar',
          // onPress: () => Toast.show('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  }
  const FrontSide = async () => {
    Alert.alert(
      "Imagen del frente de Rut",
      'Seleccionar foto de',
      [
        {
          text: 'Galería',
          onPress: async () => {
          await  ImagePicker.openPicker({
              width: 500,
              height: 500,
              cropping: true,
              cropperCircleOverlay: false,
              sortOrder: 'none',
              compressImageMaxWidth: 1000,
              compressImageMaxHeight: 1000,
              compressImageQuality: 1,
              compressVideoPreset: 'MediumQuality',
              includeExif: true,
              cropperStatusBarColor: 'white',
              cropperToolbarColor: 'white',
              cropperActiveWidgetColor: 'white',
              cropperToolbarWidgetColor: '#3498DB',
              mediaType: 'photo',
              includeBase64: true
            })
              .then((image) => {          
                setFrontSideDNI(image.path)
                setFrontSideDNIBase64(image.data)

              })
              .catch((e) => {
                //Toast.show("Failed")
              });
          }
        },
        {
          text: 'Cámara', onPress: async() => {
            await    ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
              mediaType: 'photo',
              includeBase64: true
            }).then(image => {

              // setBase64(image.data)
              // setProfileImage(image.path)
              setFrontSideDNI(image.path)
              setFrontSideDNIBase64(image.data)
            });
          }
        },
        {
          text: 'Cancelar',
          // onPress: () => Toast.show('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  }
  const BackSide = () => {
    Alert.alert(
      "Imagen del reverso de Rut",
      'Seleccionar foto de',
      [
        {
          text: 'Galería',
          onPress: () => {
            ImagePicker.openPicker({

              width: 500,
              height: 500,
              cropping: true,
              cropperCircleOverlay: false,
              sortOrder: 'none',
              compressImageMaxWidth: 1000,
              compressImageMaxHeight: 1000,
              compressImageQuality: 1,
              compressVideoPreset: 'MediumQuality',
              includeExif: true,
              cropperStatusBarColor: 'white',
              cropperToolbarColor: 'white',
              cropperActiveWidgetColor: 'white',
              cropperToolbarWidgetColor: '#3498DB',
              mediaType: 'photo',
              includeBase64: true
            })
              .then((image) => {
                // setBase64(image.data)
                // setProfileImage(image.path)
                setBackSideDNI(image.path)
                setBackSideDNIBase64(image.data)

              })
              .catch((e) => {
                //Toast.show("Failed")
              });
          }
        },
        {
          text: 'Cámara', onPress: () => {
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
              mediaType: 'photo',
              includeBase64: true
            }).then(image => {

              // setBase64(image.data)
              // setProfileImage(image.path)
              setBackSideDNI(image.path)
              setBackSideDNIBase64(image.data)


            });
          }
        },
        {
          text: 'Cancelar',
          // onPress: () => Toast.show('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  }
  const BackGroundCheck = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.allFiles],

      });

      setbackgroundCheckCertificates(response);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err)
      } else {
        console.error(err)
      }
      console.warn(err);
    }
  }, []);


  const Signup = () => {

    debugger;

    setLoading(true)

console.log("test")
debugger;
    if (fullName == "") {
      setFullName("false")
      debugger;
      return
    }
    if (dni == "") {
      setDni("false")
      debugger;
      return
    }
    if (phonenumber == "") {
      setPhonenumber("false")
      debugger;
      return
    }
    if (emailAddress == "") {
      setEmailAddress("false")
      debugger;
      return
    }
    if (password == "") {
      setPassword("false")
      debugger;
      return
    }

    if (password != confirmPassword) {
      setConfirmPassword("false")
      debugger;
      return
    }

    if (address == "") {
      setAddress("false")
      debugger;
      return
    }

    if (image == null) {
      debugger;
      Alert.alert(
        '',
        'Cargue su imagen',
      );
      return
    }
    if (frontSideDNI == null) {
      debugger;
      Alert.alert(
        '',
        'Cargue la imagen de la parte frontal de Rut',
      );
      return
    }
    if (backSideDNI == null) {
      debugger;
      Alert.alert(
        '',
        'Cargue la imagen del reverso de Rut',
      );
      return
    }
    debugger;



    var formData = new FormData();
    formData.append('name', fullName);
    formData.append('dni', dni);
    formData.append('phonenumber', phonenumber);
    formData.append('email', emailAddress);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('address', address);
    formData.append('image', imageBase64);
    formData.append('front_side', frontSideDNIBase64);
    formData.append('back_side', backSideDNIBase64);
    debugger;

    axios({
      method: 'POST',
      url: api.SIGNUP_URL,
      data: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(function (response) {
        console.log(response.data)
        debugger;
        if (response.data.signup.error == 'false') {
          setLoading(false)
          Alert.alert(
            '',
            'Registro exitoso y para la seguridad de nuestros clientes y trabajadores, su cuenta está siendo revisada, espere y le informaremos cuándo estará lista para iniciar sesión en unos momentos, por favor',
          );
          navigation.navigate('LoginScreen')
        } else {
          setLoading(false)
          Alert.alert(
            '',
            'Error al registrarse',
          );
        }
      })
      .catch(function (error) {
        console.log("error1", error)
        setLoading(false)
      })
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
      <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
      <AppLoader visible={loading} />
      <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">
            <View style={{ marginHorizontal: wide * 0.07, marginVertical: wide * 0.1 }}>
              <Image
                style={{ width: wide * 0.65, height: wide * 0.25, resizeMode: 'cover', alignSelf: 'center' }}
                source={require("../../Images/logo.png")}
              />
              <Text style={{ alignSelf: 'center', fontSize: wide * 0.06, color: '#000000', fontWeight: 'bold', marginTop: wide * 0.05 }}>Crea tu cuenta</Text>
              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Nombre completo</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput placeholder='Ingrese el nombre completo' onChangeText={text => setFullName(text)} style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {fullName == "false" ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >El nombre completo no puede estar en blanco</Text>
                  </View>
                </View>
                :
                <></>
              }
              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Rut</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput placeholder='Ingresa Rut' onChangeText={text => setDni(text)} style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {dni == "false" ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >Rut no puede estar en blanco</Text>
                  </View>
                </View>
                :
                <></>
              }
              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Número de teléfono</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput placeholder='Ingresa número telefónico' onChangeText={text => setPhonenumber(text)} style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {phonenumber == "false" ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >El número de teléfono no puede estar en blanco</Text>
                  </View>
                </View>
                :
                <></>
              }
              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Dirección de correo electrónico</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput onChangeText={text => setEmailAddress(text)} placeholder='Ingrese correo electrónico' style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {emailAddress == "false" ?
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
              {password == "false" ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >La contraseña no puede estar en blanco</Text>
                  </View>
                </View>
                :
                <></>
              }
              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Confirmar Contraseña</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput secureTextEntry={true} onChangeText={text => setConfirmPassword(text)} placeholder='Ingresar Confirmar contraseña' style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {confirmPassword == "false" ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >Contraseña no coincidente</Text>
                  </View>
                </View>
                :
                <></>
              }
              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Dirección</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput placeholder='Ingresa la direccion' onChangeText={text => setAddress(text)} style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {address == "false" ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >La dirección no puede estar en blanco</Text>
                  </View>
                </View>
                :
                <></>
              }
              <View style={{ backgroundColor: Colors.main, marginTop: wide * 0.07, paddingVertical: wide * 0.017, paddingLeft: wide * 0.05, borderRadius: wide * 0.01 }}>
                <Text style={{ color: Colors.white, fontSize: wide * 0.05, fontWeight: 'bold', }}>Sube tu imagen</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wide * 0.07 }}>
                <TouchableOpacity onPress={() => UploadImage()}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {image != null ?
                      <Image
                        style={{ width: wide * 0.2, height: wide * 0.15, borderRadius: wide * 0.02, marginBottom: wide * 0.02, marginTop: wide * 0.03 }}
                        source={{ uri: image }}
                      />
                      :
                      <Entypo name='upload' size={wide * 0.15} color="#000" />
                    }
                    <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600' }}>Cargar imagen</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ backgroundColor: Colors.main, marginTop: wide * 0.07, paddingVertical: wide * 0.017, paddingLeft: wide * 0.05, borderRadius: wide * 0.01 }}>
                <Text style={{ color: Colors.white, fontSize: wide * 0.05, fontWeight: 'bold', }}>Subir Rut Imágenes</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wide * 0.07 }}>
                <TouchableOpacity onPress={() => FrontSide()}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {frontSideDNI != null ?
                      <Image
                        style={{ width: wide * 0.2, height: wide * 0.15, borderRadius: wide * 0.02, marginBottom: wide * 0.02, marginTop: wide * 0.03 }}
                        source={{ uri: frontSideDNI }}
                      />
                      :
                      <Entypo name='v-card' size={wide * 0.2} color="#000" />
                    }
                    <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600' }}>Lado delantero</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => BackSide()}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {backSideDNI != null ?
                      <Image
                        style={{ width: wide * 0.2, height: wide * 0.15, borderRadius: wide * 0.02, marginBottom: wide * 0.02, marginTop: wide * 0.03 }}
                        source={{ uri: backSideDNI }}
                      />
                      :
                      <Entypo name='v-card' size={wide * 0.2} color="#000" />
                    }
                    <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600' }}>Parte trasera</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => Signup()} style={{ marginTop: wide * 0.1, justifyContent: 'center', alignItems: 'center' }} >
                <View style={{ backgroundColor: Colors.main, height: wide * 0.14, borderRadius: wide * 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                  <View style={{ flex: 3, alignItems: 'center', }}>
                    <Text style={{ color: Colors.white, fontSize: wide * 0.04, fontWeight: 'bold' }}>INSCRIBIRSE</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: wide * 0.04 }}>
                <Text style={{ fontSize: wide * 0.039, color: '#000000', }}>Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('LoginScreen')
                }}><Text style={{ marginTop: -wide * 0.005, fontSize: wide * 0.043, marginLeft: 5, color: Colors.main, fontWeight: 'bold' }} >Acceso</Text></TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

export default SignupScreen
