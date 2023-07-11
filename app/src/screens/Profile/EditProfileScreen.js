import { View, Text, Button, SafeAreaView, StatusBar, Alert, KeyboardAvoidingView, FlatList, Image, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native'
import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Dimensions';
import { BlurView } from "@react-native-community/blur";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppLoader from '../../components/Apploader';
import axios from 'axios';
import * as api from '../../../apis/api';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker'
import { NavigationActions,StackActions } from '@react-navigation/native';
import Svg, {
    Circle,
    Ellipse,
    G,

    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,

    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';
import FastImage from 'react-native-fast-image';

const EditProfileScreen = ({ route, navigation }) => {
    // getting params
    const data = route.params?.data
  
    const [showCategoryDropDown, setShowCategoryrDropDown] = useState(false)
    const [showSubCategoryDropDown, setShowSubCategoryrDropDown] = useState(false)
    const [categoryValue, setCategoryValue] = useState('Select Category')
    const [subCategoryValue, setSubCategoryValue] = useState('Select Sub Category')
    const [loading, setLoading] = useState(false)
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
    const [professionCertificates, setProfessionCertificates] = useState(null)
    const [fullName, setFullName] = useState(data.name)
    const [dni, setDni] = useState(data.dni)
    const [phonenumber, setPhonenumber] = useState(data.phone)
    const [emailAddress, setEmailAddress] = useState(data.email)
    const [password, setPassword] = useState(data.password)
    const [experience, setExperience] = useState(data.brief_experience)
    const [address, setAddress] = useState(data.address)
    const [accountHolderName, setAccountHolderName] = useState(data.account_holder_name)
    const [typeOfAccount, setTypeOfAccount] = useState(data.type_of_account)
    const [accountNumber, setAccountNumber] = useState(data.account_number)
    const [bankName, setBankName] = useState(data.bank_name)


    let wide = Layout.width;
    let high = Layout.height;

    useEffect(() => {
        // setLoading(true)
        axios({
            method: 'POST',
            url: api.CATEGORY_URL,

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                // console.log(response.data.categories)
                setCategories(response.data.categories)
                setLoading(false)

            })
            .catch(function (error) {
                console.log("error", error)
            })





    }, [])

    const UploadImage = () => {
        Alert.alert(
            "Sube tu imagen",
            'Seleccionar foto de',
            [
                {
                    text: 'Galería',
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
    const FrontSide = () => {
        Alert.alert(
            "DNI Front Side Picture",
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
                                setFrontSideDNI(image.path)
                                setFrontSideDNIBase64(image.data)

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
                            setFrontSideDNI(image.path)
                            setFrontSideDNIBase64(image.data)


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
    const BackSide = () => {
        Alert.alert(
            "DNI Back Side Picture",
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
                                setBackSideDNI(image.path)
                                setBackSideDNIBase64(image.data)

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
                            setBackSideDNI(image.path)
                            setBackSideDNIBase64(image.data)


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
    const Profession = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.allFiles],

            });
            setProfessionCertificates(response);

        } catch (err) {
            console.warn(err);
        }
    }, []);

    const Update = () => {

        setLoading(true)
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
        if (experience == null) {
            setExperience(false)
            return
        }
        if (address == null) {
            setAddress(false)
            return
        }
        // if (categoryValue == 'Select Category') {
        //     setCategoryValue(false)
        //     return
        // }
        // if (subCategoryValue == 'Select Category') {
        //     setSubCategoryValue(false)
        //     return
        // }
        if (accountHolderName == null) {
            setAccountHolderName(false)
            return
        }
        if (typeOfAccount == null) {
            setTypeOfAccount(false)
            return
        }
        if (accountNumber == null) {
            setAccountNumber(false)
            return
        }
        if (bankName == null) {
            setBankName(false)
            return
        }
        // if (image == null) {
        //     Alert.alert(
        //         '',
        //         'Please Upload Your Image',
        //     );
        //     return
        // }
        // if (frontSideDNI == null) {
        //     Alert.alert(
        //         '',
        //         'Please Upload DNI Front Side Image',
        //     );
        //     return
        // }
        // if (backSideDNI == null) {
        //     Alert.alert(
        //         '',
        //         'Please Upload DNI Back Side Image',
        //     );
        //     return
        // }
        // if (backgroundCheckCertificates == null) {
        //     Alert.alert(
        //         '',
        //         'Please Upload Background Check Certificate',
        //     );
        //     return
        // }
        // if (professionCertificates == null) {
        //     Alert.alert(
        //         '',
        //         'Please Upload Profession Certificate',
        //     );
        //     return
        // }
        var formData = new FormData();
        formData.append('id', data.id);
        formData.append('name', fullName);
        formData.append('dni', dni);
        formData.append('phonenumber', phonenumber);
        formData.append('email', emailAddress);
        formData.append('password', password);
        formData.append('experience', experience);
        formData.append('address', address);
        // formData.append('category', categoriesId);
        // formData.append('sub_category', subCategoriesId);
        formData.append('account_name', accountHolderName);
        formData.append('type_of_account', typeOfAccount);
        formData.append('account_number', accountNumber);
        formData.append('bank_name', bankName);
        // formData.append('front_side', frontSideDNIBase64);
        // formData.append('back_side', backSideDNIBase64);
      
        if(image!=null){
        formData.append('image', imageBase64)
        formData.append('imageStatus', 'New')
        }
        else{
        formData.append('image', data.image)
        formData.append('imageStatus', 'Old')
        }
        // backgroundCheckCertificates.map((file, index) => (
        //     formData.append('background', {
        //         uri: file.uri,
        //         type: file.type,
        //         name: file.name,
        //     })
        // ))
        // professionCertificates.map((file, index) => (
        //     formData.append('profession', {
        //         uri: file.uri,
        //         type: file.type,
        //         name: file.name,
        //     })
        // ))

       
        axios({
            method: 'POST',
            url: api.EDITPROFILE_URL,
            data: formData,

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {

               
                if (response.data.update.error == 'false') {
                    setLoading(false)
                    Alert.alert(
                        '',
                        'Profile Edit Successful',
                    );
                    // navigation.navigate("ProfileScreen")
                    navigation.dispatch(
                        StackActions.replace('ProfileScreen')
                      );
                  
                } else {
                    setLoading(false)
                    Alert.alert(
                        '',
                        'Failed To Edit',
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

                        <View style={{ flexDirection: 'row', marginHorizontal: wide * 0.04 }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M19 11H7.82998L12.71 6.11997C13.1 5.72997 13.1 5.08997 12.71 4.69997C12.32 4.30997 11.69 4.30997 11.3 4.69997L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" fill={Colors.main} />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', height: wide * 0.15 }}>
                                <Text style={{ fontSize: 20, color: '#09101D', fontWeight: '600', marginLeft: wide * 0.05 }}>Editar perfil</Text>
                            </View>

                        </View>


                        <View style={{ marginHorizontal: wide * 0.07 }}>

                            <View style={{ marginTop: wide * 0.05 }} >
                                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Nombre completo</Text>
                                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                                    <TextInput placeholder='Ingrese el nombre completo' value={fullName} onChangeText={text => setFullName(text)} style={{ marginHorizontal: wide * 0.05 }} />
                                </View>
                            </View>
                            {fullName == false ?
                                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                        <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >El nombre completo no puede estar en blanco</Text>
                                    </View>
                                </View>
                                :
                                <></>
                            }
                            <View style={{ marginTop: wide * 0.05 }} >
                                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>DNI</Text>
                                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                                    <TextInput placeholder='Enter DNI' value={dni} onChangeText={text => setDni(text)} style={{ marginHorizontal: wide * 0.05 }} />
                                </View>
                            </View>
                            {dni == false ?
                                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                        <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >DNI no puede estar en blanco</Text>
                                    </View>
                                </View>
                                :
                                <></>
                            }
                            <View style={{ marginTop: wide * 0.05 }} >
                                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Número de teléfono</Text>
                                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                                    <TextInput placeholder='Ingresa número telefónico' value={phonenumber} onChangeText={text => setPhonenumber(text)} style={{ marginHorizontal: wide * 0.05 }} />
                                </View>
                            </View>
                            {phonenumber == false ?
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
                                    <TextInput value={emailAddress} onChangeText={text => setEmailAddress(text)} placeholder='Ingrese correo electrónico' style={{ marginHorizontal: wide * 0.05 }} />
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
                                    <TextInput value={password} secureTextEntry={true} onChangeText={text => setPassword(text)} placeholder='Introducir la contraseña' style={{ marginHorizontal: wide * 0.05 }} />
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
                            <View style={{ marginTop: wide * 0.05 }} >
                                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Breve Experiencia</Text>
                                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                                    <TextInput value={experience} placeholder='Ingrese Breve Experiencia' onChangeText={text => setExperience(text)} style={{ marginHorizontal: wide * 0.05 }} />
                                </View>
                            </View>
                            {experience == false ?
                                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                        <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >La breve experiencia no puede estar en blanco</Text>
                                    </View>
                                </View>
                                :
                                <></>
                            }
                            <View style={{ marginTop: wide * 0.05 }} >
                                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>DIRECCIÓN</Text>
                                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                                    <TextInput value={address} placeholder='Ingresa la direccion' onChangeText={text => setAddress(text)} style={{ marginHorizontal: wide * 0.05 }} />
                                </View>
                            </View>
                            {address == false ?
                                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                        <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >La dirección no puede estar en blanco</Text>
                                    </View>
                                </View>
                                :
                                <></>
                            }
                            <View style={{ backgroundColor: Colors.main, marginTop: wide * 0.07, paddingVertical: wide * 0.017, paddingLeft: wide * 0.05, borderRadius: wide * 0.01 }}>
                                <Text style={{ color: Colors.white, fontSize: wide * 0.05, fontWeight: 'bold', }}>Detalles del banco</Text>
                            </View>

                            <View style={{ marginTop: wide * 0.07 }} >
                                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>nombre del titular de la cuenta</Text>
                                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                                    <TextInput value={accountHolderName} placeholder='Ingrese el nombre del titular de la cuenta' onChangeText={text => setAccountHolderName(text)} style={{ marginHorizontal: wide * 0.05 }} />
                                </View>
                            </View>
                            {accountHolderName == false ?
                                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                        <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >El nombre del titular de la cuenta no puede estar en blanco</Text>
                                    </View>
                                </View>
                                :
                                <></>
                            }
                            <View style={{ marginTop: wide * 0.07 }} >
                                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Tipo de cuenta</Text>
                                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                                    <TextInput value={typeOfAccount} placeholder='Ingrese el tipo de cuenta' onChangeText={text => setTypeOfAccount(text)} style={{ marginHorizontal: wide * 0.05 }} />
                                </View>
                            </View>
                            {typeOfAccount == false ?
                                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                        <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >El tipo de cuenta no puede estar en blanco</Text>
                                    </View>
                                </View>
                                :
                                <></>
                            }
                            <View style={{ marginTop: wide * 0.07 }} >
                                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Número de cuenta</Text>
                                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                                    <TextInput value={accountNumber} placeholder='Ingrese el número de cuenta' onChangeText={text => setAccountNumber(text)} style={{ marginHorizontal: wide * 0.05 }} />
                                </View>
                            </View>
                            {accountNumber == false ?
                                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                        <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >El número de cuenta no puede estar en blanco</Text>
                                    </View>
                                </View>
                                :
                                <></>
                            }
                            <View style={{ marginTop: wide * 0.07 }} >
                                <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02 }}>Nombre del banco</Text>
                                <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                                    <TextInput value={bankName} placeholder='Ingrese el nombre del banco' onChangeText={text => setBankName(text)} style={{ marginHorizontal: wide * 0.05 }} />
                                </View>
                            </View>

                            {bankName == false ?
                                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                        <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >El nombre del banco no puede estar en blanco</Text>
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
                                            <FastImage
                                                style={{ width: wide * 0.3, height: wide * 0.3, borderRadius: wide * 0.02, marginBottom: wide * 0.02, marginTop: wide * 0.03 }}
                                                source={{ uri: image }}
                                            />
                                            :
                                            <FastImage
                                                style={{ width: wide * 0.3, height: wide * 0.3, borderRadius: wide * 0.02, marginBottom: wide * 0.02, marginTop: wide * 0.03 }}
                                                source={{ uri:api.Image_URL+data.image }}
                                            />
                                        }
                                      
                                    </View>
                                </TouchableOpacity>


                            </View>

                            {/* <View style={{ backgroundColor: Colors.main, marginTop: wide * 0.07, paddingVertical: wide * 0.017, paddingLeft: wide * 0.05, borderRadius: wide * 0.01 }}>
                                <Text style={{ color: Colors.white, fontSize: wide * 0.05, fontWeight: 'bold', }}>Upload DNI Images</Text>
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
                                        <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600' }}>Front Side</Text>

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


                                        <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600' }}>Back Side</Text>

                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={{ backgroundColor: Colors.main, marginTop: wide * 0.07, paddingVertical: wide * 0.017, paddingLeft: wide * 0.05, borderRadius: wide * 0.01 }}>
                                <Text style={{ color: Colors.white, fontSize: wide * 0.05, fontWeight: 'bold', }}>Certificates</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wide * 0.07 }}>

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
                                <TouchableOpacity onPress={() => Profession()}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                        {professionCertificates != null ?
                                            <MaterialCommunityIcons name='certificate' size={wide * 0.23} color="#0000FF" />
                                            :
                                            <MaterialCommunityIcons name='certificate' size={wide * 0.23} color="#000" />
                                        }

                                        <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600' }}>Profession</Text>

                                    </View>
                                </TouchableOpacity>

                            </View> */}


                            <TouchableOpacity onPress={() => Update()} style={{ marginTop: wide * 0.1, justifyContent: 'center', alignItems: 'center' }} >
                                <View style={{ backgroundColor: Colors.main, height: wide * 0.14, borderRadius: wide * 0.1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <View style={{ flex: 3, alignItems: 'center', }}>
                                        <Text style={{ color: Colors.white, fontSize: wide * 0.05, fontWeight: 'bold' }}>Actualizar</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>


                        </View>


                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

export default EditProfileScreen
