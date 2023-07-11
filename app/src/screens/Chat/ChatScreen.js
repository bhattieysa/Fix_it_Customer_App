import { View, FlatList, Text, Button, BackHandler, KeyboardAvoidingView, ScrollView, TextInput, SafeAreaView, StatusBar, Modal, Alert, Image, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'

import Colors from '../../constants/Colors';
import Layout from '../../constants/Dimensions';
import AppLoader from '../../components/Apploader';
import { BlurView } from "@react-native-community/blur";
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as api from '../../../apis/api';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'
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
import BottomNavigation from '../../components/BottomNavigation';
import SubCategory from '../../components/SubCategory';


const ChatScreen = ({ navigation }) => {
    // const handleBackPress = () => {
    //   BackHandler.exitApp()
    // }
    // BackHandler.addEventListener("hardwareBackPress", handleBackPress)

    const [selectedDay, setSelectedDay] = useState(1)

    const [loading, setLoading] = useState(false)
    const [ratings, setRatings] = useState(null)
    const [chatList, setChatList] = useState(null)










    useEffect(() => {



        async function check() {
            const data = await AsyncStorage.getItem('user')
            const userData = JSON.parse(data)
            var formData = new FormData();
            formData.append('id', userData.login.data.id);    
            axios({
                method: 'POST',
                url: api.GETCHATLIST_URL,
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
                        setChatList(response.data.data)
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
            5000
        );
    }, [])









    let wide = Layout.width;
    let high = Layout.height;

    return (
        <View style={{ flex: 1 }}>
            {Platform.OS == 'ios' ?
                <StatusBar barStyle="dark-content" backgroundColor={Colors.main} />
                :
                <StatusBar barStyle="light-content" backgroundColor={Colors.main} />
            }

            <SafeAreaView style={{ flex: 1 }} >
                <View style={{ marginHorizontal: wide * 0.045, marginTop: wide * 0.025 }}>
                    {/* <ScrollView showsVerticalScrollIndicator={false} bounces={false}> */}
                    <AppLoader visible={loading} />
                    <View>



                        <TouchableOpacity style={{
                            backgroundColor: Colors.main,
                            width: wide * 0.6,
                            alignSelf: 'flex-end',
                            justifyContent: "center",
                            alignItems: 'center',
                            height: wide * 0.07,
                            borderRadius: wide * 0.01,
                        }}
                            onPress={() => {
                            navigation.navigate("ChatWithAdmin")
                            }}
                        ><Text
                            style={{
                                color: '#ffffff',
                                fontWeight: 'bold',
                                fontSize: wide * 0.04
                            }}
                        >Chatear con el administrador</Text>
                        </TouchableOpacity>

                        {chatList != null ?

                            <FlatList
                                data={chatList}
                                bounce={false}
                                showsVerticalScrollIndicator={false}
                                alwaysBounceVertical={false}
                                style={{ marginTop: wide * 0.03 }}
                                keyExtractor={item => item.id}
                                ListFooterComponent={() => <View style={{ marginBottom: high * 0.15 }}></View>}
                                renderItem={(item, index, arr) => {
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate("ChatScreen", 
                                            {
                                                customer_id:item.item.id,
                                                // service_id:service_id,
                                                // min_price:min_price,
                                                name:item.item.customer_name
                                            
                                        })}>
                                            <View style={{ borderColor: Colors.main, borderTopWidth: 0.4, marginTop: wide * 0.04 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: wide * 0.03 }}>
                                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                        <FastImage style={{ width: wide * 0.13, resizeMode: 'stretch', height: wide * 0.13, borderRadius: wide * 0.1, }} source={{ uri: api.Image_URL + item.item.customer_image }} />
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ fontSize: wide * 0.05, fontWeight: 'bold', marginLeft: wide * 0.03 }}>{item.item.customer_name}</Text>
                                                            <Text style={{ fontSize: wide * 0.04, marginLeft: wide * 0.03 }}>{item.item.address}</Text>
                                                        </View>
                                                        {item.item.unseen != 0 ?
                                                            <View style={{ marginRight: wide * 0.05, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.main, borderRadius: wide * 0.5, width: wide * 0.085, height: wide * 0.085 }}>
                                                                <Text style={{ color: '#ffffff', fontSize: wide * 0.05, fontWeight: '600' }}>{item.item.unseen}</Text>
                                                            </View>
                                                            :
                                                            <></>
                                                        }
                                                    </View>

                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }} />


                            :
                            <View style={{ height: '80%', alignItems: 'center', justifyContent: "center" }}>
                                <Text style={{ color: Colors.main, fontSize: wide * 0.055, marginTop: wide * 0.01, fontWeight: "500" }}>No Services Available</Text>


                            </View>
                        }
                    </View>

                </View>
            </SafeAreaView >
            <View style={{}}>
                <BottomNavigation navigation={navigation} checked='Chat' />
            </View>


        </View >
    )
}

export default ChatScreen