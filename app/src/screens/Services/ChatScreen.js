import { View, Text, Button, SafeAreaView, StatusBar, Alert, KeyboardAvoidingView, FlatList, Share, Image, TouchableOpacity, TextInput, ScrollView, Modal, Linking } from 'react-native'
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

const ChatScreen = ({ route, navigation }) => {
    // getting params
    const customer_id = route.params?.customer_id
    const service_id = route.params?.service_id
    const min_price = route.params?.min_price
    const name = route.params?.name


    const [loading, setLoading] = useState(false)
    const [id, setID] = useState(null)
    const [ratingsData, setRatingsData] = useState(null)
    const [message, setMessage] = useState(null)
    const [chat, setChat] = useState(null)
    const [image, setImage] = useState(null)
    const [imageBase64, setImageBase64] = useState(null)
    const [price, setPrice] = useState(min_price)
    const [dealDoneDialog, setDealDoneDialog] = useState(false)


    let wide = Layout.width;
    let high = Layout.height;

    useEffect(() => {



        async function check() {
            const data = await AsyncStorage.getItem('user')
            const userData = JSON.parse(data)

            var formData = new FormData();
            formData.append('id', userData.login.data.id);
            formData.append('customer_id', customer_id);



            axios({
                method: 'POST',
                url: api.GETCHAT_URL,
                data: formData,

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(function (response) {

console.log(response.data)
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
        async function check1() {

            const data = await AsyncStorage.getItem('user')
            const userData = JSON.parse(data)

            var formData1 = new FormData();

            formData1.append('id', userData.login.data.id);
            formData1.append('customer_id', customer_id);
            axios({
                method: 'POST',
                url: api.UPDATECHATSEEN_URL,
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
        check1()

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
setLoading(true)
                                const data = await AsyncStorage.getItem('user')
                                const userData = JSON.parse(data)
                                var formData = new FormData();
                                formData.append('id', userData.login.data.id);
                                formData.append('customer_id', customer_id);
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
                                        console.log(response.data)

                                        if (response.data.data[0].error == 'true') {
                                            setLoading(false)
                                        } else {
                                            setLoading(false)

                                        }
                                    })
                                    .catch(function (error) {
                                        console.log("error111", error)
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
                           
                            mediaType: 'photo',
                            includeBase64: true
                        }).then(async (image) => {

                            setImage(image.path)
                            setImageBase64(image.data)
                            setLoading(true)
                                const data = await AsyncStorage.getItem('user')
                                const userData = JSON.parse(data)
                                var formData = new FormData();
                                formData.append('id', userData.login.data.id);
                                formData.append('customer_id', customer_id);
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
                                        console.log(response.data)

                                        if (response.data.data[0].error == 'true') {
                                            setLoading(false)
                                        } else {
                                            setLoading(false)

                                        }
                                    })
                                    .catch(function (error) {
                                        console.log("error111", error)
                                        setLoading(false)
                                    })

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
        formData.append('customer_id',customer_id);
        formData.append('message', message);
        setLoading(true)
        axios({
            method: 'POST',
            url: api.CHAT_URL,
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
                    setMessage("")
                }
            })
            .catch(function (error) {
                console.log("error1", error)
                setLoading(false)
            })
    }

    const finalize = async () => {


        if (price < min_price) {
            Alert.alert(
                '',
                'Price can not be less than minimum pr',
            );
            return
        }

        var formData1 = new FormData();
        formData1.append('services_id', service_id);
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
                                            <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600', marginTop: wide * 0.08 }}>Address: {services_data.customer_address}</Text>
                                            <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600', marginTop: wide * 0.03 }}>Category: {services_data.category}</Text>
                                            <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600', marginTop: wide * 0.03 }}>Sub Category: {services_data.sub_category}</Text>
                                            <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600', marginTop: wide * 0.03 }}>Minimum Price: {services_data.min_price}</Text>
                                            <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600', marginTop: wide * 0.1 }}>Enter Price</Text>

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
                                                    marginTop: wide * 0.03
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


                                                Linking.openURL(
                                                    Platform.OS === 'ios'
                                                        ? 'maps://app?saddr=N135BN&daddr=NW42DX'
                                                        : 'https://waze.com/ul?ll=%f,%f&navigate=yes&utm_source=%s'
                                                    // :'google.navigation:q=NW42DX'
                                                )

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
                                                marginTop: wide * 0.1

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
                <View style={{ flexDirection: 'row', marginHorizontal: wide * 0.07}}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M19 11H7.82998L12.71 6.11997C13.1 5.72997 13.1 5.08997 12.71 4.69997C12.32 4.30997 11.69 4.30997 11.3 4.69997L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" fill={Colors.main} />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', height: wide * 0.15 }}>
                        <Text style={{ fontSize: 20, color: '#09101D', fontWeight: '600', marginLeft: wide * 0.05 }}>{name}</Text>
                    </View>
                    {/* {min_price != null ?
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    setDealDoneDialog(true)
                                }}
                            >
                                <Svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
                                    preserveAspectRatio="xMidYMid meet">

                                    <G transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                        fill={Colors.main} stroke="none">
                                        <Path d="M548 403 c-28 -10 -48 -23 -51 -35 -3 -10 -14 -18 -25 -18 -12 0 -24
-5 -28 -12 -5 -8 3 -9 29 -5 40 6 37 11 63 -97 l7 -29 -47 6 c-46 7 -64 -6
-26 -18 21 -7 28 -35 9 -35 -7 0 -34 14 -61 31 -28 16 -55 28 -61 26 -7 -2 12
-19 41 -37 81 -51 63 -72 -22 -24 -25 14 -46 21 -46 15 0 -6 18 -21 40 -33 22
-13 40 -29 40 -35 0 -18 -14 -16 -54 8 -20 11 -41 19 -48 17 -7 -3 6 -16 30
-29 42 -24 56 -49 27 -49 -8 0 -15 -4 -15 -10 0 -5 5 -10 11 -10 13 0 149 137
149 150 0 14 37 13 42 -1 3 -8 15 -9 36 -4 39 8 43 28 5 23 -26 -3 -27 0 -49
85 -12 48 -19 89 -15 91 3 2 25 9 49 15 23 7 42 16 42 21 0 13 -15 11 -72 -7z"/>
                                        <Path d="M20 392 c0 -5 21 -15 48 -24 26 -8 46 -19 46 -24 -1 -5 -4 -21 -8
-36 -4 -16 -2 -28 4 -28 5 0 12 11 16 24 5 21 9 23 35 16 16 -5 44 -6 63 -3
48 8 55 -13 12 -34 -42 -20 -47 -48 -11 -65 19 -8 29 -8 47 3 15 9 47 14 91
13 53 -1 65 1 57 11 -13 16 -126 13 -159 -4 -18 -10 -26 -10 -35 -1 -8 9 -8
14 1 17 7 2 31 17 55 33 33 23 55 30 91 30 30 0 46 4 42 10 -8 13 -102 13
-110 0 -4 -7 -13 -6 -27 1 -11 6 -35 9 -52 6 -42 -7 -86 2 -86 17 0 7 -24 20
-53 29 -61 19 -67 20 -67 9z"/>
                                        <Path d="M84 218 c-8 -39 -12 -43 -37 -40 -37 5 -34 -15 4 -23 20 -5 34 -3 39
4 12 20 42 1 36 -22 -5 -22 48 -87 71 -87 7 0 33 -7 58 -16 36 -12 50 -13 61
-3 22 18 17 41 -15 72 -38 35 -55 34 -82 -4 -15 -22 -25 -27 -32 -20 -13 13
24 68 43 63 7 -1 10 3 8 10 -3 7 -11 13 -19 14 -8 0 -21 4 -30 8 -10 4 -23 6
-30 5 -8 -2 -24 1 -37 5 -20 6 -22 12 -16 42 9 50 -11 42 -22 -8z m99 -64 c10
-10 -12 -44 -28 -44 -18 0 -18 5 -5 31 11 19 22 24 33 13z m87 -53 c0 -21 -13
-41 -26 -41 -17 0 -18 22 -2 38 14 14 28 16 28 3z m40 -35 c0 -16 -18 -31 -27
-22 -8 8 5 36 17 36 5 0 10 -6 10 -14z"/>
                                    </G>
                                </Svg>

                            </TouchableOpacity>
                            <Text style={{ alignSelf: 'center', color: Colors.main, fontSize: wide * 0.045, fontWeight: 'bold' }}>Deal</Text>
                        </View>
                        :
                        <></>
                    } */}
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
                                {item.item.image == null ?
                                    <View>
                                        <Text style={{ marginTop: wide * 0.05, alignSelf: 'center' }}> {item.item.time}</Text>
                                        <View style={{ width: '80%', alignSelf: item.item.sender == 'ServiceMan' ? 'flex-start' : 'flex-end', marginTop: wide * 0.025 }}>
                                            <Text style={{ overflow: "hidden", alignSelf: item.item.sender == 'ServiceMan' ? 'flex-start' : 'flex-end', borderRadius: wide * 0.03, backgroundColor: Colors.main, fontSize: wide * 0.05, color: 'white', padding: wide * 0.02, }}>{item.item.message}</Text>
                                        </View>
                                    </View>
                                    :
                                    <View>
                                        <Text style={{ marginTop: wide * 0.05, alignSelf: 'center' }}> {item.item.time}</Text>
                                        <FastImage
                                            style={{ alignSelf: item.item.sender == 'ServiceMan' ? 'flex-start' : 'flex-end', width: wide * 0.5, height: wide * 0.5, borderRadius: wide * 0.02, marginBottom: wide * 0.02, marginTop: wide * 0.03 }}
                                            source={{ uri: api.Image_URL + item.item.image }}
                                        />

                                    </View>
                                }
                            </View>
                        )
                    }} />




                {/* </ScrollView> */}

            </SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={{ backgroundColor: 'white', height: wide * 0.18 }}>
                    <View style={{ flexDirection: 'row', marginHorizontal: wide * 0.02, marginVertical: wide * 0.03 }}>
                        <TouchableOpacity onPress={() => UploadImage()}>
                            <MaterialCommunityIcons name='add' size={wide * 0.09} color={Colors.main} />
                        </TouchableOpacity>
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

export default ChatScreen
