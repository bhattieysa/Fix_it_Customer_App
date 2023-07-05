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
  // getting params

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
  4
  const [fullName, setFullName] = useState(null)
  const [dni, setDni] = useState(null)
  const [phonenumber, setPhonenumber] = useState(null)
  const [emailAddress, setEmailAddress] = useState(null)
  const [password, setPassword] = useState(null)
  const [experience, setExperience] = useState(null)
  const [address, setAddress] = useState(null)
  const [accountHolderName, setAccountHolderName] = useState(null)
  const [typeOfAccount, setTypeOfAccount] = useState(null)
  const [accountNumber, setAccountNumber] = useState(null)
  const [bankName, setBankName] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  

  let wide = Layout.width;
  let high = Layout.height;



  const UploadImage = () => {
    Alert.alert(
      "Upload Your Image",
      'Select Pic From',
      [
        {
          text: 'Gallery',
          onPress: () => {
            ImagePicker.openPicker({

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
          text: 'Camera', onPress: () => {
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
          text: 'Cancel',
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


    if (fullName == null) {
      setFullName(false)
      return
    }
    if (dni == null) {
      setDni(false)
      return
    }
    if (phonenumber == null) {
      setPhonenumber(false)
      return
    }
    if (emailAddress == null) {
      setEmailAddress(false)
      return
    }
    if (password == null) {
      setPassword(false)
      return
    }

    if (password !=confirmPassword) {
      setConfirmPassword(false)
      return
    }
    if (experience == null) {
      setExperience(false)
      return
    }
    if (address == null) {
      setAddress(false)
      return
    }

    if (image == null) {
      Alert.alert(
        '',
        'Please Upload Your Image',
      );
      return
    }

    // if (backgroundCheckCertificates == null) {
    //   Alert.alert(
    //     '',
    //     'Please Upload Background Check Certificate',
    //   );
    //   return
    // }
    // if (professionCertificates == null) {
    //   Alert.alert(
    //     '',
    //     'Please Upload Profession Certificate',
    //   );
    //   return
    // }


    setLoading(true)


    var formData = new FormData();
    formData.append('name', fullName);
    formData.append('dni', dni);
    formData.append('phonenumber', phonenumber);
    formData.append('email', emailAddress);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('address', address);
    formData.append('image', imageBase64);
    // backgroundCheckCertificates.map((file, index) => (
    //   formData.append('background', {
    //     uri: file.uri,
    //     type: file.type,
    //     name: file.name,
    //   })
    // ))
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

        if (response.data.signup.error == 'false') {
          setLoading(false)
          Alert.alert(
            '',
            'Signup Successful & for security of our clients and workers, your account is being review, please wait and we will let you know when it will be ready to log in in a few moment please',
          );
          navigation.navigate('LoginScreen')

        } else {
          setLoading(false)
          Alert.alert(
            '',
            'Failed To Signup',
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
              <Text style={{ alignSelf: 'center', fontSize: wide * 0.06, color: '#000000', fontWeight: 'bold' }}>Create Your Account</Text>
              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Full Name</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput placeholder='Enter Full Name' onChangeText={text => setFullName(text)} style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {fullName == false ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >Full Name Can't Be Blank</Text>
                  </View>
                </View>
                :
                <></>
              }
              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>DNI</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput placeholder='Enter DNI' onChangeText={text => setDni(text)} style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {dni == false ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >DNI Can't Be Blank</Text>
                  </View>
                </View>
                :
                <></>
              }
              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Phonenumber</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput placeholder='Enter Phonenumber' onChangeText={text => setPhonenumber(text)} style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {phonenumber == false ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >Phonenumber Can't Be Blank</Text>
                  </View>
                </View>
                :
                <></>
              }

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
                            <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Confirm Password</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput secureTextEntry={true} onChangeText={text => setConfirmPassword(text)} placeholder='Enter Confirm Password' style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {confirmPassword==false ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >Password Not Matched</Text>
                  </View>
                </View>
                :
                <></>
              }

              <View style={{ marginTop: wide * 0.05 }} >
                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Address</Text>
                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                  <TextInput placeholder='Enter Address' onChangeText={text => setAddress(text)} style={{ marginHorizontal: wide * 0.05 }} />
                </View>
              </View>
              {address == false ?
                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >Address Can't Be Blank</Text>
                  </View>
                </View>
                :
                <></>
              }

              <View style={{ backgroundColor: Colors.main, marginTop: wide * 0.07, paddingVertical: wide * 0.017, paddingLeft: wide * 0.05, borderRadius: wide * 0.01 }}>
                <Text style={{ color: Colors.white, fontSize: wide * 0.05, fontWeight: 'bold', }}>Upload Your Image</Text>
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
                    <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600' }}>Upload Image</Text>

                  </View>
                </TouchableOpacity>


              </View>


              {/* <View style={{ backgroundColor: Colors.main, marginTop: wide * 0.07, paddingVertical: wide * 0.017, paddingLeft: wide * 0.05, borderRadius: wide * 0.01 }}>
                <Text style={{ color: Colors.white, fontSize: wide * 0.05, fontWeight: 'bold', }}>Certificates</Text>
              </View> */}

              {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wide * 0.07 }}>

                <TouchableOpacity onPress={() => BackGroundCheck()}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                    {backgroundCheckCertificates != null ?
                      <MaterialCommunityIcons name='certificate' size={wide * 0.23} color="#0000FF" />
                      :
                      <MaterialCommunityIcons name='certificate' size={wide * 0.23} color="#000" />
                    }
                    <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', alignSelf: 'center' }}>Background Check</Text>
                  </View>
                </TouchableOpacity>
              </View> */}
              <TouchableOpacity onPress={() => Signup()} style={{ marginTop: wide * 0.1, justifyContent: 'center', alignItems: 'center' }} >
                <View style={{ backgroundColor: Colors.main, height: wide * 0.14, borderRadius: wide * 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                  <View style={{ flex: 3, alignItems: 'center', }}>
                    <Text style={{ color: Colors.white, fontSize: wide * 0.04, fontWeight: 'bold' }}>SIGN UP</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: wide * 0.04 }}>
                <Text style={{ fontSize: wide * 0.039, color: '#000000', }}>Already have a Account?</Text>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('LoginScreen')
                }}><Text style={{ marginTop: -wide * 0.005, fontSize: wide * 0.043, marginLeft: 5, color: Colors.main, fontWeight: 'bold' }} >Login</Text></TouchableOpacity>
              </View>

            </View>


          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

export default SignupScreen
