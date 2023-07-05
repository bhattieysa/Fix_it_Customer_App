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
import { NavigationActions, StackActions } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
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

const PaymentScreenWebView = ({ route, navigation }) => {
    // getting params
    const service_id = route.params?.service_id
    const min_price = route.params?.price
    const services_name = route.params?.services_name
    const user_id = route.params?.user_id
    const person_name = route.params?.person_name
    const person_id = route.params?.person_id



    const [loading, setLoading] = useState(false)
    const [serviceMan, setServiceMan] = useState(null)



    let wide = Layout.width;
    let high = Layout.height;

    useEffect(() => {



        async function check() {



            // var formData = new FormData();

            // formData.append('service_id', service_id);
            // setLoading(true)
            // axios({
            //     method: 'POST',
            //     url: api.SERVICEOFFER_URL,
            //     data: formData,
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            //     .then(function (response) {


            //         if (response.data.data[0].error == 'true') {
            //             setLoading(false)

            //         } else {
            //             setLoading(false)

            //             setServiceMan(response.data.data)
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log("error1", error)
            //         setLoading(false)
            //     })




        }

        check()




    }, [])

    async function AcceptOffer(id) {


        const data = await AsyncStorage.getItem('user')
        const userData = JSON.parse(data)


        var formData = new FormData();

        formData.append('id', userData.login.data.id);
        formData.append('service_apply_id', id);

        setLoading(true)
        axios({
            method: 'POST',
            url: api.SERVICEACCEPTOFFER_URL,
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

                }
            })
            .catch(function (error) {
                console.log("error1", error)
                setLoading(false)
            })

    }


    return (
        <View style={{ flex: 1 }} >
            <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />

            <SafeAreaView>
                <View>
                    <View style={{ flexDirection: 'row', marginHorizontal: wide * 0.04 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M19 11H7.82998L12.71 6.11997C13.1 5.72997 13.1 5.08997 12.71 4.69997C12.32 4.30997 11.69 4.30997 11.3 4.69997L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" fill={Colors.main} />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3, justifyContent: 'center', height: wide * 0.15 }}>
                            <Text style={{ fontSize: 20, color: '#09101D', fontWeight: '600', marginLeft: wide * 0.03 }}>Payment Screen</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("ChatScreen", 
                                            {
                                                customer_id:person_id,
                                                // service_id:service_id,
                                                // min_price:min_price,
                                                name:person_name
                                            
                                        })}

                            style={{ borderRadius: wide * 0.02, justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: Colors.main, height: wide * 0.085, alignSelf: 'center', }}>
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: wide * 0.04 }}>Finish</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: wide * 0.045, height: '92%' }}>


                        <WebView
                            source={{ uri: `https://fixitchile.com/CustomerApp/payment/text.php?price=${min_price}&name=${services_name}&service_id=${service_id}&user_id=${user_id}` }}
                            onLoadStart={() => {
                                setLoading(true)
                            }}
                            originWhitelist={['*']}
                            onLoadEnd={() => {
                                setLoading(false)
                            }}
                            scalesPageToFit={true}
                            bounces={false}
                            style={{ height: '92%' }}



                        />
                        <AppLoader visible={loading} />


                    </View>
                </View>
            </SafeAreaView >
        </View >
    )
}

export default PaymentScreenWebView
