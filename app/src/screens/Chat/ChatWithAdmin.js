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

                    if (response.data.data[0].error == 'true') {
                        setLoading(false)
                    } else {
                        setLoading(false)
                        setChat(response.data.data)
                    }
                })
                .catch(function (error) {
                    console.log("error11", error)
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
     

    }, [])


    const sendSms = async () => {
        const data = await AsyncStorage.getItem('user')
        const userData = JSON.parse(data)
        var formData = new FormData();
        if (message != null || message != "") {


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
                        setMessage("")
                    }
                })
                .catch(function (error) {
                    console.log("error1111", error)
                    setLoading(false)
                })
        }
    }
    return (
        <View style={{ flex: 1, }} >
            <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
            <AppLoader visible={loading} />
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
                        <Text style={{ fontSize: 20, color: '#09101D', fontWeight: '600', marginLeft: wide * 0.05 }}>Administradora</Text>
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
                        <TextInput placeholder='Ingresar mensaje' value={message} onChangeText={text => setMessage(text)} style={{ flex: 1, marginHorizontal: wide * 0.02, borderColor: Colors.main, borderWidth: 1, borderRadius: wide * 0.1, padding: wide * 0.02 }} />
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
