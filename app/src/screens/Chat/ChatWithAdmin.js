import { View, Text, Button, SafeAreaView, StatusBar, Alert, KeyboardAvoidingView, FlatList, Share,Image, TouchableOpacity, TextInput, ScrollView, Modal ,Linking} from 'react-native'
import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Dimensions';
import { BlurView } from "@react-native-community/blur";
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppLoader from '../../components/Apploader';
import axios from 'axios';
import * as api from '../../../apis/api';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker'
import { NavigationActions, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, AirbnbRating } from 'react-native-ratings';
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

const ChatWithAdmin = ({ route, navigation }) => {
    // getting params
    const services_data = route.params?.services_data


    const [loading, setLoading] = useState(false)
    const [id, setID] = useState(null)
    const [ratingsData, setRatingsData] = useState(null)
    const [message, setMessage] = useState(null)
    const [chat, setChat] = useState(null)
    const [image, setImage] = useState(null)
    const [imageBase64, setImageBase64] = useState(null)

    const [dealDoneDialog, setDealDoneDialog] = useState(false)

    let wide = Layout.width;
    let high = Layout.height;

    useEffect(() => {



        async function check() {
            const data = await AsyncStorage.getItem('user')
            const userData = JSON.parse(data)

            var formData = new FormData();
            formData.append('id', userData.login.data.id);
           



            axios({
                method: 'POST',
                url: api.GETADMINCHAT_URL,
                data: formData,

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(function (response) {

console.log(response.data.data)
                    if (response.data.data[0].error == 'true') {
                        setLoading(false)
                    } else {
                        setLoading(false)
                        setChat(response.data.data)
                    }
                })
                .catch(function (error) {
                    console.log("error1", error)
                    setLoading(false)
                })

        }
        setLoading(true)
        check()
        setInterval(
            () => {
                check()
            },
            15000
        );
        // async function check1() {

        //     const data = await AsyncStorage.getItem('user')
        //     const userData = JSON.parse(data)

        //     var formData1 = new FormData();

        //     formData1.append('id', userData.login.data.id);
           
        //     axios({
        //         method: 'POST',
        //         url: api.UPDATECHATSEEN_URL,
        //         data: formData1,

        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })
        //         .then(function (response) {

        //             console.log(response.data.data)
        //             if (response.data.data[0].error == 'true') {
        //                 setLoading(false)
        //             } else {
        //                 setLoading(false)

        //             }
        //         })
        //         .catch(function (error) {
        //             console.log("error1", error)
        //             setLoading(false)
        //         })


        // }
        // check1()

    }, [])
    const UploadImage = () => {
        Alert.alert(
            "Upload Image",
            'Select Image From',
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
                            .then(async (image) => {

                                setImage(image.path)
                                setImageBase64(image.data)

                                const data = await AsyncStorage.getItem('user')
                                const userData = JSON.parse(data)
                                var formData = new FormData();
                                formData.append('id', userData.login.data.id);
                                formData.append('customer_id', services_data.customer_id);
                                formData.append('image', image.data);



                                axios({
                                    method: 'POST',
                                    url: api.UPLOADCHATIMAGR_URL,
                                    data: formData,

                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'multipart/form-data'
                                    }
                                })
                                    .then(function (response) {
                                        console.log(response.data.data)

                                        if (response.data.data[0].error == 'true') {
                                            setLoading(false)
                                        } else {
                                            setLoading(false)

                                        }
                                    })
                                    .catch(function (error) {
                                        console.log("error1", error)
                                        setLoading(false)
                                    })



                            })
                            .catch((e) => {
                                //Toast.show("Failed")
                            });
                    }
                },
                {
                    text: 'Camera', onPress: () => {
                        ImagePicker.openCamera({
                            width: 500,
                            height: 500,
                            cropping: true,
                            mediaType: 'photo',
                            includeBase64: true
                        }).then(image => {

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


    const sendSms = async () => {
        const data = await AsyncStorage.getItem('user')
        const userData = JSON.parse(data)


        var formData = new FormData();




        formData.append('id', userData.login.data.id);
       
        formData.append('message', message);
        setLoading(true)
        axios({
            method: 'POST',
            url: api.CHATADMIN_URL,
            data: formData,

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
              

                if (response.data.data[0].error == 'true') {
                    setLoading(false)
                } else {
                    setLoading(false)
                    setChat(response.data.data)
                    setMessage("hi")
                }
            })
            .catch(function (error) {
                console.log("error1", error)
                setLoading(false)
            })
    }

    const finalize=async()=>{

       
       if(price<services_data.min_price){
        Alert.alert(
            '',
            'Price can not be less than minimum pr',
          );
        return
       }

        var formData1 = new FormData();
        formData1.append('services_id', services_data.id);
        formData1.append('price', price);

        axios({
            method: 'POST',
            url: api.FINALIZE_URL,
            data: formData1,

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {

                console.log(response.data.data)
                if (response.data.data[0].error == 'true') {
                    setLoading(false)
                } else {
                    setLoading(false)
                    

                }
            })
            .catch(function (error) {
                console.log("error1", error)
                setLoading(false)
            })

    }
    return (
        <View style={{ flex: 1, }} >
            <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
            <AppLoader visible={loading} />
            {dealDoneDialog === true ?
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={dealDoneDialog}
                    >
                        <View
                            // onPress={() => setShowGenderDropDown(false)}
                            style={{
                                width: wide,
                                height: high,
                                justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <BlurView style={{
                                width: wide,
                                height: high,
                                position: 'absolute',
                                // justifyContent: 'center', alignItems: 'center'
                            }}
                                blurAmount={10}
                                blurRadius={10}
                            />
                            <View style={{
                                width: '90%', height: wide * 1.3, backgroundColor: '#ffffff',
                                marginTop: 20, borderRadius: 20, alignItems: 'center',
                            }}>
                                <View style={{
                                    width: '100%', height: '15%',
                                    alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: Colors.main,
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    flexDirection: 'row',
                                    // borderBottomColor: Colors.newGrayFontColor, borderBottomWidth: 1
                                }}>
                                    <Text style={{
                                        marginLeft: wide * 0.03, flex: 1, color: Colors.white, fontSize: wide * 0.055, fontWeight: '700', marginTop: wide * 0.01,
                                    }}>Finalize The Deal</Text>
                                    <Ionicons name="ios-close" onPress={() => setDealDoneDialog(false)} style={{ marginRight: wide * 0.02 }} size={34} color="#fff" />
                                </View>
                                <View style={{ width: '100%', height: '85%' }}>
                                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                                        <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">
                                            <View style={{ marginHorizontal: wide * 0.05, marginVertical: wide * 0.05 }}>
                                            <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600',marginTop:wide*0.08 }}>Address: {services_data.customer_address}</Text>
                                                <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600',marginTop:wide*0.03 }}>Category: {services_data.category}</Text>
                                                <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600',marginTop:wide*0.03 }}>Sub Category: {services_data.sub_category}</Text>
                                                <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600',marginTop:wide*0.03 }}>Minimum Price: {services_data.min_price}</Text>
                                                <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600',marginTop:wide*0.1 }}>Enter Price</Text>
                                              
                                                <TextInput
                                                    multiline={true}
                                                    placeholder='Enter Price'
                                                    fontSize={wide * 0.05}
                                                    style={{
                                                        borderWidth: 1,
                                                        height: wide * 0.1,
                                                        paddingTop: wide * 0.02,
                                                        paddingLeft: wide * 0.02,
                                                        paddingRight: wide * 0.02,
                                                        borderColor: Colors.main,
                                                        borderRadius: wide * 0.03,
                                                        marginTop:wide*0.03
                                                    }}
                                                    onChangeText={text => setPrice(text)}
                                                    value={price}
                                                />
                                            </View>

                                            <TouchableOpacity
                                                // onPress={() => {
                                                //     finalize()
                                                // }}
                                                onPress={() => {


                                                    // Linking.openURL(
                                                    //     Platform.OS === 'ios'
                                                    //     ?'maps://app?saddr=N135BN&daddr=NW42DX'
                                                    //     :'https://waze.com/ul?ll=%f,%f&navigate=yes&utm_source=%s'
                                                    //     :'google.navigation:q=NW42DX'
                                                    //     )

                                                }}


//                                                 Linking.canOpenURL('comgooglemaps://?center=40.765819,-73.975866')
// .then((canOpen) => {
//     if (canOpen) { console.log('open google maps'); } else { console.log('open apple maps'); }
// });
// Linking.openURL(
//     Platform.OS === 'ios'
//       ? 'googleMaps://app?saddr=N135BN&daddr=N135BN'
//       : 'google.navigation:q=NW42DX',
//   )




                                                style={{
                                                    backgroundColor: Colors.main,
                                                    width: wide * 0.45,
                                                    height: wide * 0.1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    borderRadius: wide * 0.1,
                                                    marginTop:wide*0.1

                                                }}
                                            ><Text style={{ color: 'white', fontSize: wide * 0.055, fontWeight: 'bold' }}>Finalize</Text></TouchableOpacity>
                                        </ScrollView>
                                    </KeyboardAvoidingView>
                                </View>

                            </View>
                            {/* </BlurView>  */}
                        </View>
                    </Modal>
                    : null
                }
            <SafeAreaView style={{ flex: 1 }}>
                {/* <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled"> */}
                <View style={{ flexDirection: 'row', marginHorizontal: wide * 0.07 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M19 11H7.82998L12.71 6.11997C13.1 5.72997 13.1 5.08997 12.71 4.69997C12.32 4.30997 11.69 4.30997 11.3 4.69997L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" fill={Colors.main} />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', height: wide * 0.15 }}>
                        <Text style={{ fontSize: 20, color: '#09101D', fontWeight: '600', marginLeft: wide * 0.05 }}>Admin</Text>
                    </View>

                </View>
                <FlatList
                    data={chat}
                    bounce={false}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    style={{ marginBottom: wide * 0.05 }}
                    inverted
                    keyExtractor={item => item.id
                    }
                    ListFooterComponent={() => <View style={{ marginBottom: high * 0.06 }}></View>}
                    renderItem={(item, index, arr) => {
                        return (
                            <View style={{ marginHorizontal: wide * 0.05 }}>
                               
                                    <View>
                                        <Text style={{ marginTop: wide * 0.05, alignSelf: 'center' }}> {item.item.time}</Text>
                                        <View style={{ width: '80%', alignSelf: item.item.sender == 'ServiceMan' ? 'flex-end' : 'flex-start', marginTop: wide * 0.025 }}>
                                            <Text style={{ overflow: "hidden", alignSelf: item.item.sender == 'ServiceMan' ? 'flex-end' : 'flex-start', borderRadius: wide * 0.03, backgroundColor: Colors.main, fontSize: wide * 0.05, color: 'white', padding: wide * 0.02, }}>{item.item.message}</Text>
                                        </View>
                                    </View>
                          
                            </View>
                        )
                    }} />




                {/* </ScrollView> */}

            </SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={{ backgroundColor: 'white', height: wide * 0.18 }}>
                    <View style={{ flexDirection: 'row', marginHorizontal: wide * 0.02, marginVertical: wide * 0.03 }}>
                        {/* <TouchableOpacity onPress={() => UploadImage()}>
                            <MaterialCommunityIcons name='add' size={wide * 0.09} color={Colors.main} />
                        </TouchableOpacity> */}
                        <TextInput placeholder='Enter Message' value={message} onChangeText={text => setMessage(text)} style={{ flex: 1, marginHorizontal: wide * 0.02, borderColor: Colors.main, borderWidth: 1, borderRadius: wide * 0.1, padding: wide * 0.02 }} />
                        <TouchableOpacity
                            onPress={() => {
                                sendSms()
                            }}
                        >
                            <MaterialCommunityIcons name='send' size={wide * 0.08} color={Colors.main} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </View>
    )
}

export default ChatWithAdmin
