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

const MoreDetailsScreen = ({ route, navigation }) => {
    // getting params
    const service_id = route.params?.service_id
    const min_price = route.params?.min_price


    const [loading, setLoading] = useState(false)
    const [serviceMan, setServiceMan] = useState(null)



    let wide = Layout.width;
    let high = Layout.height;

    useEffect(() => {



        async function check() {



            var formData = new FormData();

            formData.append('service_id', service_id);
            setLoading(true)
            axios({
                method: 'POST',
                url: api.SERVICEAPPLY_URL,
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

                        setServiceMan(response.data.data)
                    }
                })
                .catch(function (error) {
                    console.log("error1", error)
                    setLoading(false)
                })




        }

        check()




    }, [])


    return (
        <View style={{ flex: 1 }} >
            <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
            <AppLoader visible={loading} />
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
                        <View style={{ flex: 1, justifyContent: 'center', height: wide * 0.15 }}>
                            <Text style={{ fontSize: 20, color: '#09101D', fontWeight: '600', marginLeft: wide * 0.05 }}>Lista de trabajadores</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: wide * 0.045, height: '98%' }}>

                        {serviceMan != null ?
                            <FlatList
                                data={serviceMan}
                                bounce={false}
                                showsVerticalScrollIndicator={false}
                                alwaysBounceVertical={false}
                                style={{ marginTop: wide * 0.03 }}
                                keyExtractor={item => item.id}
                                ListFooterComponent={() => <View style={{ marginBottom: high * 0.15 }}></View>}
                                renderItem={(item, index, arr) => {
                                    return (
                                        <TouchableOpacity onPress={()=>{
                                            navigation.navigate("RatingDetailsScreen",{
                                                id:item.item.id
                                            })
                                        }}>
                                        <View style={{  flexDirection: 'row' ,backgroundColor:'white',borderRadius:wide*0.02}}>
                                           
                                            <FastImage style={{ marginVertical:wide*0.025,marginLeft:wide*0.03,width: wide * 0.13, resizeMode: 'stretch', height: wide * 0.13, borderRadius: wide * 0.1, }} source={{ uri: api.Image_URL + item.item.image }} />
                                            <View style={{ marginLeft: wide * 0.03 ,flex:2,marginVertical:wide*0.02}}>
                                                <Text style={{ fontSize: wide * 0.05, fontWeight: 'bold', }}>{item.item.name}</Text>
                                                <Rating
                                                    readonly={true}
                                                    imageSize={20}
                                                    style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: wide * 0.02 }}
                                                    startingValue={item.item.ratings}
                                                />
                                               
                                              

                                            </View>
                                            <TouchableOpacity
                                            onPress={()=>{
                                                navigation.navigate("ChatScreen",
                                                {
                                                    customer_id:item.item.id,
                                                    service_id:service_id,
                                                    min_price:min_price,
                                                    name:item.item.name
                                                }
                                                )
                                            }}
                                            style={{borderRadius:wide*0.02,justifyContent:'center',alignItems:'center',width:wide*0.05,flex:0.7,backgroundColor:Colors.main,height:wide*0.08,alignSelf:'center',marginRight:wide*0.02}}>
                                                    <Text style={{color:'white',fontWeight:'600',fontSize:wide*0.035}}>Chat</Text>
                                                </TouchableOpacity>

                                        </View>
                                        </TouchableOpacity>
                                    )
                                }} />


                            :
                            <View style={{ height: '83%', alignItems: 'center', justifyContent: "center" }}>
                                <Text style={{ color: Colors.main, fontSize: wide * 0.055, marginTop: wide * 0.01, fontWeight: "500" }}>No ServiceMan Applied</Text>


                            </View>
                        }
                    </View>
                </View>
            </SafeAreaView >
        </View >
    )
}

export default MoreDetailsScreen
