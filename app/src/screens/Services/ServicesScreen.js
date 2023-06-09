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
import { Rating, AirbnbRating } from 'react-native-ratings';
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
import { useNavigation } from '@react-navigation/native';


const ServicesScreen = ({ navigation }) => {


    const [selectedDay, setSelectedDay] = useState(1)
    const [loading, setLoading] = useState(false)
    const [ratingsValue, setRatingsValue] = useState(null)
    const [ratingsComment, setRatingsComment] = useState(null)
    const [servicesData, setServicesData] = useState(null)
    const [notDone, setNotDone] = useState(false)
    const [done, setDone] = useState(false)
    const [reason, setReason] = useState(null)
    const [servicesID, setServicesID] = useState(null)
    const [ratings, setRatings] = useState(false)
    const navigation1 = useNavigation();

    useEffect(() => {



        async function check() {
            const data = await AsyncStorage.getItem('user')
            const userData = JSON.parse(data)


            var formData = new FormData();

            formData.append('id', userData.login.data.id);
            setLoading(true)
            axios({
                method: 'POST',
                url: api.GETSERVICES_URL,
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

                        setServicesData(response.data.data)
                    }
                })
                .catch(function (error) {
                    console.log("error1", error)
                    setLoading(false)
                })




        }

        check()




    }, [])

    
    const sendRatting = async (id) => {





        var formData = new FormData();


        formData.append('comment', ratingsComment);
        formData.append('ratings', ratingsValue);
        formData.append('services_id', servicesID);
        setLoading(true)
        axios({
            method: 'POST',
            url: api.GIVERATINGS_URL,
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
                    setNotDone(false)
                    Alert.alert(
                        '',
                        'Rattings Given Successful',
                        [

                            {
                                text: 'Okay', onPress: () => {
                                   setRatings(false)
                                }
                            },
                        ],
                        { cancelable: true }
                    )

                }



            })
            .catch(function (error) {
                console.log("error1", error)
                setLoading(false)
            })


    }
    const sendNotDone = async (id) => {





        var formData = new FormData();


        formData.append('reason', reason);
        formData.append('services_id', servicesID);
        setLoading(true)
        axios({
            method: 'POST',
            url: api.NOTDONE_URL,
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
                    setNotDone(false)
                    Alert.alert(
                        '',
                        'Job Not Done Successful',
                        [

                            {
                                text: 'Okay', onPress: () => {
                                    navigation1.reset({
                                        index: 0,
                                        routes: [{ name: 'ServicesScreen' }],
                                    });
                                }
                            },
                        ],
                        { cancelable: true }
                    )

                }



            })
            .catch(function (error) {
                console.log("error1", error)
                setLoading(false)
            })


    }



    const doneService = async (id) => {





        var formData = new FormData();



        formData.append('services_id', id);
        setLoading(true)
        axios({
            method: 'POST',
            url: api.DONE_URL,
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
                    setDone(true)


                }



            })
            .catch(function (error) {
                console.log("error1", error)
                setLoading(false)
            })


    }



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





            {ratings === true ?
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={ratings}
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
                                    }}>Rating For Serviceman</Text>
                                    <Ionicons name="ios-close" onPress={() => setRatings(false)} style={{ marginRight: wide * 0.02 }} size={34} color="#fff" />
                                </View>
                                <View style={{ width: '100%', height: '85%' }}>
                                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                                        <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">
                                            <View style={{ marginHorizontal: wide * 0.05, marginVertical: wide * 0.05 }}>
                                            <Text style={{ fontSize: wide * 0.06, color: Colors.main, fontWeight: 'bold' }}>Select Ratings</Text>
                                            <Rating
                                                   
                                                   imageSize={wide*0.1}
                                                   style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: wide * 0.03 }}
                                                   startingValue={0}
                                                   onFinishRating={(rating)=>{
                                                   
                                                    setRatingsValue(rating)
                                                   }}
                                               />
                                                <TextInput
                                                    multiline={true}
                                                    placeholder='Enter Comment'
                                                    fontSize={wide * 0.05}
                                                    style={{
                                                        borderWidth: 1,
                                                        height: wide * 0.6,
                                                        paddingTop: wide * 0.05,
                                                        paddingLeft: wide * 0.05,
                                                        paddingRight: wide * 0.05,
                                                        borderColor: Colors.main,
                                                        marginTop: wide * 0.06,
                                                        borderRadius: wide * 0.03

                                                    }}
                                                    onChangeText={text => setRatingsComment(text)}

                                                />
                                            </View>
                                            {ratingsComment == false ?
                                                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                                                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                                        <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >Comment Can't Be Blank</Text>
                                                    </View>
                                                </View>
                                                :
                                                <></>
                                            }
                                            <TouchableOpacity
                                                onPress={() => {
                                                    sendRatting()
                                                }}
                                                style={{
                                                    backgroundColor: Colors.main,
                                                    width: wide * 0.45,
                                                    height: wide * 0.1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    borderRadius: wide * 0.1

                                                }}
                                            ><Text style={{ color: 'white', fontSize: wide * 0.055, fontWeight: 'bold' }}>Send</Text></TouchableOpacity>
                                        </ScrollView>
                                    </KeyboardAvoidingView>
                                </View>

                            </View>
                            {/* </BlurView>  */}
                        </View>
                    </Modal>
                    : null
                }


                {notDone === true ?
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={notDone}
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
                                    }}>This Job Is Not Done</Text>
                                    <Ionicons name="ios-close" onPress={() => setNotDone(false)} style={{ marginRight: wide * 0.02 }} size={34} color="#fff" />
                                </View>
                                <View style={{ width: '100%', height: '85%' }}>
                                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                                        <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">
                                            <View style={{ marginHorizontal: wide * 0.05, marginVertical: wide * 0.05 }}>
                                            
                                                 <Text style={{ fontSize: wide * 0.07, color: Colors.main, fontWeight: 'bold' }}>Why...?</Text>
                                                <TextInput
                                                    multiline={true}
                                                    placeholder='Enter Reason'
                                                    fontSize={wide * 0.05}
                                                    style={{
                                                        borderWidth: 1,
                                                        height: wide * 0.6,
                                                        paddingTop: wide * 0.05,
                                                        paddingLeft: wide * 0.05,
                                                        paddingRight: wide * 0.05,
                                                        borderColor: Colors.main,
                                                        marginTop: wide * 0.05,
                                                        borderRadius: wide * 0.03

                                                    }}
                                                    onChangeText={text => setReason(text)}

                                                />
                                            </View>
                                            {reason == false ?
                                                <View style={{ height: wide * 0.052, borderRadius: 15, flexDirection: 'row' }}>
                                                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                                        <Text style={{ color: 'red', fontSize: 12, fontWeight: '600' }} >Reason Can't Be Blank</Text>
                                                    </View>
                                                </View>
                                                :
                                                <></>
                                            }
                                            <TouchableOpacity
                                                onPress={() => {
                                                    sendNotDone()
                                                }}
                                                style={{
                                                    backgroundColor: Colors.main,
                                                    width: wide * 0.45,
                                                    height: wide * 0.1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    borderRadius: wide * 0.1

                                                }}
                                            ><Text style={{ color: 'white', fontSize: wide * 0.055, fontWeight: 'bold' }}>Send</Text></TouchableOpacity>
                                        </ScrollView>
                                    </KeyboardAvoidingView>
                                </View>

                            </View>
                            {/* </BlurView>  */}
                        </View>
                    </Modal>
                    : null
                }

                {done === true ?
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={done}
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
                                width: '90%', height: wide * 1, backgroundColor: '#ffffff',
                                marginTop: 20, borderRadius: 20, alignItems: 'center',
                            }}>
                                <View style={{
                                    width: '100%', height: '20%',
                                    alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: Colors.main,
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    flexDirection: 'row',
                                    // borderBottomColor: Colors.newGrayFontColor, borderBottomWidth: 1
                                }}>
                                    <Text style={{
                                        marginLeft: wide * 0.03, flex: 1, color: Colors.white, fontSize: wide * 0.055, fontWeight: '700', marginTop: wide * 0.01,
                                    }}>This Job Is Complete</Text>
                                    <Ionicons name="ios-close" onPress={() => {
                                        setDone(false)
                                        navigation1.reset({
                                            index: 0,
                                            routes: [{ name: 'ServicesScreen' }],
                                        });
                                    }
                                    } style={{ marginRight: wide * 0.02 }} size={34} color="#fff" />
                                </View>
                                <View style={{ width: '100%', height: '80%', }}>
                                    <View style={{ margin: wide * 0.05, flex: 1, marginVertical: wide * 0.15 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialCommunityIcons name='square' size={wide * 0.075} color={Colors.main} />
                                            <Text style={{ marginLeft: wide * 0.02, fontSize: wide * 0.045, color: Colors.main, fontWeight: 'bold' }}>Thanku For Use FIX IT</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: wide * 0.1 }}>
                                            <MaterialCommunityIcons name='square' size={wide * 0.075} color={Colors.main} />
                                            <Text style={{ marginLeft: wide * 0.02, fontSize: wide * 0.045, color: Colors.main, fontWeight: 'bold' }}>You Will See Your Payment In Your Account</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: wide * 0.1 }}>
                                            <MaterialCommunityIcons name='square' size={wide * 0.075} color={Colors.main} />
                                            <Text style={{ marginLeft: wide * 0.02, fontSize: wide * 0.045, color: Colors.main, fontWeight: 'bold' }}>Hope To See You Again</Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                            {/* </BlurView>  */}
                        </View>
                    </Modal>
                    : null
                }


                <View style={{ marginHorizontal: wide * 0.045, marginTop: wide * 0.025, height: '98%' }}>
                    {/* <ScrollView showsVerticalScrollIndicator={false} bounces={false}> */}


                    {/* <Text style={{ color: Colors.main, fontWeight: 'bold', fontSize: wide * 0.07, marginTop: wide * 0.05 }}>Your Valoration</Text>
                        <View style={{ flexDirection: 'row', marginHorizontal: wide * 0.07, marginVertical: wide * 0.025 }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Text style={{ fontSize: wide * 0.05, marginTop: wide * 0.02 }}>{ratings}</Text>
                                <Text style={{ fontSize: wide * 0.05, marginTop: wide * 0.02, marginHorizontal: wide * 0.05 }}>of</Text>
                                <Text style={{ fontSize: wide * 0.05, marginTop: wide * 0.02, marginRight: wide * 0.03 }}>5</Text>
                                <MaterialCommunityIcons name='star' size={wide * 0.09} color="#FFDF00" />
                            </View>
                            <TouchableOpacity style={{
                                backgroundColor: Colors.main,
                                width: wide * 0.14,
                                justifyContent: "center",
                                alignItems: 'center',
                                height: wide * 0.07,
                                borderRadius: wide * 0.01,
                            }}
                                onPress={() => {
                                    navigation.navigate("RatingDetailsScreen")
                                }}
                            ><Text
                                style={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontSize: wide * 0.04
                                }}
                            >View</Text>
                            </TouchableOpacity>
                        </View> */}

                    {servicesData != null ?
                        <FlatList
                            data={servicesData}
                            bounce={false}
                            showsVerticalScrollIndicator={false}
                            alwaysBounceVertical={false}
                            style={{ marginTop: wide * 0.03 }}
                            keyExtractor={item => item.id}
                            ListFooterComponent={() => <View style={{ marginBottom: high * 0.15 }}></View>}
                            renderItem={(item, index, arr) => {
                                return (
                                    <View style={{ marginTop: wide * 0.04 }}>
                                        <View style={{ alignItems: 'center', paddingVertical: wide * 0.02, backgroundColor: 'white', borderRadius: wide * 0.02 }}>
                                            <View style={{ flexDirection: 'row', marginVertical: wide * 0.02, marginHorizontal: wide * 0.02 }}>
                                                <Text style={{ marginLeft: wide * 0.02, alignSelf: 'flex-start', fontSize: wide * 0.045, color: item.item.status == 'Complete' ? 'green' : 'orange', flex: 1, fontWeight: '600' }}>{item.item.status}</Text>
                                                <Text style={{ marginRight: wide * 0.02, alignSelf: 'flex-end', fontSize: wide * 0.045, color: Colors.main, fontWeight: '600' }}>{item.item.date}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: wide * 0.02, marginHorizontal: wide * 0.045 }}>
                                                <Text style={{ fontSize: wide * 0.045, color: Colors.main, fontWeight: '600', flex: 1.5 }}>Categoría</Text>
                                                <Text style={{ fontSize: wide * 0.045, color: 'black', fontWeight: '400', flex: 1 }}>{item.item.category_name}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: wide * 0.02, marginHorizontal: wide * 0.05 }}>
                                                <Text style={{ fontSize: wide * 0.045, color: Colors.main, fontWeight: '600', flex: 1.5 }}>Subcategoría</Text>
                                                <Text style={{ fontSize: wide * 0.045, color: 'black', fontWeight: '400', flex: 1 }}>{item.item.sub_category}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: wide * 0.02, marginHorizontal: wide * 0.05 }}>
                                                <Text style={{ fontSize: wide * 0.045, color: Colors.main, fontWeight: '600', flex: 1.5 }}>Servicio</Text>
                                                <Text style={{ fontSize: wide * 0.045, color: 'black', fontWeight: '400', flex: 1 }}>{item.item.name}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: wide * 0.02, marginHorizontal: wide * 0.05 }}>
                                                <Text style={{ fontSize: wide * 0.045, color: Colors.main, fontWeight: '600', flex: 1.5 }}>DIRECCIÓN</Text>
                                                <Text style={{ fontSize: wide * 0.045, color: 'black', fontWeight: '400', flex: 1 }}>{item.item.location}</Text>
                                            </View>
                                            <View style={{ marginVertical: wide * 0.02, marginHorizontal: wide * 0.045, width: '100%' }}>
                                                <Text style={{ alignSelf: 'center', fontSize: wide * 0.045, color: Colors.main, fontWeight: '600', flex: 1.5 }}>Problema</Text>
                                                <Text
                                                ellipsizeMode='tail' 
                                                numberOfLines={1}
                                                style={{ marginTop: wide * 0.02, marginHorizontal: wide * 0.045, alignSelf: 'center', fontSize: wide * 0.05, color: 'black', fontWeight: '400'  }}>{item.item.problem}</Text>
                                            </View>

                                            {

                                                item.item.status != "Complete" ?
                                                item.item.status != "Not Done" ?
                                                    item.item.status == "Offer Accept" ?


                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                Alert.alert(
                                                                    '',
                                                                    'Este trabajo está hecho o no?',
                                                                    [
                                                                        {
                                                                            text: 'Cerca', onPress: () => console.log('Cancel Pressed'), style: 'destructive'
                                                                        },

                                                                        {
                                                                            text: 'No hecho', onPress: () => {
                                                                                setNotDone(true)
                                                                                setServicesID(item.item.id)

                                                                            }
                                                                        },
                                                                        {
                                                                            text: 'Hecho', onPress: () => {
                                                                                setServicesID(item.item.id)
                                                                                doneService(item.item.id)
                                                                            }
                                                                        },
                                                                        // {
                                                                        //     text: 'Cancel',
                                                                        //     onPress: () => console.log('Cancel Pressed'),
                                                                        //     style: 'destructive',
                                                                        //   },
                                                                    ],
                                                                    {
                                                                        cancelable: true,
                                                                    },
                                                                );
                                                                setServicesID(item.item.id)
                                                            }}
                                                            style={{ marginVertical: wide * 0.05, backgroundColor: Colors.main, width: wide * 0.3, height: wide * 0.09, justifyContent: 'center', alignItems: 'center', borderRadius: wide * 0.02 }}>
                                                            <Text style={{ color: 'white', fontSize: wide * 0.035, fontWeight: '600' }}>Trabajo completado</Text>
                                                        </TouchableOpacity>


                                                        :
                                                        <View style={{ flexDirection: 'row', }}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    navigation.navigate("MoreDetailsScreen", {
                                                                        service_id: item.item.id,
                                                                        min_price: item.item.min_price
                                                                    })
                                                                }}
                                                                style={{ marginRight: wide * 0.03, marginVertical: wide * 0.05, backgroundColor: Colors.main, width: wide * 0.44, height: wide * 0.09, justifyContent: 'center', alignItems: 'center', borderRadius: wide * 0.02 }}>
                                                                <Text style={{ color: 'white', fontSize: wide * 0.035, fontWeight: '600' }}>Lista de trabajadores ({item.item.apply})</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    navigation.navigate("OfferScreen", {
                                                                        service_id: item.item.id,
                                                                        min_price: item.item.min_price,
                                                                        services_name:item.item.name
                                                                    })
                                                                }}
                                                                style={{ marginVertical: wide * 0.05, backgroundColor: Colors.main, width: wide * 0.4, height: wide * 0.09, justifyContent: 'center', alignItems: 'center', borderRadius: wide * 0.02 }}>
                                                                <Text style={{ color: 'white', fontSize: wide * 0.04, fontWeight: '600' }}>Lista de ofertas ({item.item.offer})</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    :
                                                    <TouchableOpacity
                                                            onPress={() => {
                                                               setRatings(true)
                                                                setServicesID(item.item.id)
                                                            }}
                                                            style={{ marginVertical: wide * 0.05, backgroundColor: Colors.main, width: wide * 0.4, height: wide * 0.1, justifyContent: 'center', alignItems: 'center', borderRadius: wide * 0.02 }}>
                                                            <Text style={{ color: 'white', fontSize: wide * 0.04, fontWeight: '600' }}>dar calificaciones ?</Text>
                                                        </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity
                                                            onPress={() => {
                                                               setRatings(true)
                                                                setServicesID(item.item.id)
                                                            }}
                                                            style={{ marginVertical: wide * 0.05, backgroundColor: Colors.main, width: wide * 0.35, height: wide * 0.1, justifyContent: 'center', alignItems: 'center', borderRadius: wide * 0.02 }}>
                                                            <Text style={{ color: 'white', fontSize: wide * 0.04, fontWeight: '600' }}>dar calificaciones ?</Text>
                                                        </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                )
                            }} />


                        :
                        <View style={{ height: '98%', alignItems: 'center', justifyContent: "center" }}>
                            <Text style={{ color: Colors.main, fontSize: wide * 0.055, marginTop: wide * 0.01, fontWeight: "500" }}>No hay servicios disponibles</Text>


                        </View>
                    }
                </View>
                <AppLoader visible={loading} />


            </SafeAreaView >
            <View style={{}}>
                <BottomNavigation navigation={navigation} checked='Services' />
            </View>


        </View >
    )
}

export default ServicesScreen