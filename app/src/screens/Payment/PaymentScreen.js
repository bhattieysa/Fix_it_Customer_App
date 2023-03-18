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
import { useNavigation } from '@react-navigation/native';


const PaymentScreen = ({ navigation }) => {


    const [selectedDay, setSelectedDay] = useState(1)
    const [loading, setLoading] = useState(false)
    const [ratings, setRatings] = useState(null)
    const [servicesData, setServicesData] = useState(null)
    const [notDone, setNotDone] = useState(false)
    const [done, setDone] = useState(false)
    const [reason, setReason] = useState(null)
    const [servicesID, setServicesID] = useState(null)
    const [totalIncome, setTotalIncome] = useState(null)
    const [totalIncomeMonthly, settotalIncomeMonthly] = useState(null)
    const [moreInfo, setMoreInfo] = useState(false)
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
                url: api.PAYMENT_URL,
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
                        settotalIncomeMonthly(response.data.data[0].monthly)
                        setTotalIncome(response.data.data[0].earning)
                    }
                })
                .catch(function (error) {
                    console.log("error1", error)
                    setLoading(false)
                })





        }

        check()




    }, [])


    const sendNotDone = async () => {





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



    const doneService = async () => {





        var formData = new FormData();



        formData.append('services_id', servicesID);
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
                <AppLoader visible={loading} />
                <View style={{ flex: 1, marginHorizontal: wide * 0.045, alignItems: 'center', justifyContent: 'center' }}>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginBottom: wide * 0.1 }}>
                            <Text style={{ fontSize: wide * 0.065, fontWeight: '600', alignSelf: 'center' }}>Total Income</Text>
                            <View style={{ marginTop: wide * 0.03, borderRadius: wide * 0.1, alignItems: 'center', justifyContent: 'center', width: wide * 0.45, height: wide * 0.13 }}>
                                <Text style={{ fontSize: wide * 0.06, color: Colors.main, fontWeight: 'bold' }}>{totalIncome}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: wide * 0.065, fontWeight: '600', alignSelf: 'center' }}>Monthly Income</Text>
                            <View style={{ marginTop: wide * 0.03, borderRadius: wide * 0.1, alignItems: 'center', justifyContent: 'center', width: wide * 0.45, height: wide * 0.13 }}>
                                <Text style={{ fontSize: wide * 0.06, color: Colors.main, fontWeight: 'bold' }}>{totalIncomeMonthly}</Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: wide * 0.1 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("HistoryScreen")
                                }}
                                style={{ marginTop: wide * 0.03, borderRadius: wide * 0.1, backgroundColor: Colors.main, color: '#ffffff', alignItems: 'center', justifyContent: 'center', width: wide * 0.7, height: wide * 0.13 }}>
                                <Text style={{ fontSize: wide * 0.06, color: '#ffffff', }}>History Of Payments</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                        {moreInfo === true ?
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={moreInfo}
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
                            width: '85%', height: wide * 0.9, backgroundColor: '#ffffff',
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
                                    marginLeft: wide * 0.03, flex: 1, color: Colors.white, fontSize: 18, fontWeight: '700', marginTop: wide * 0.01,
                                }}>More Info</Text>
                                <Ionicons name="ios-close" onPress={() => setMoreInfo(false)} style={{ marginRight: wide * 0.02 }} size={34} color="#fff" />
                            </View>
                            <View style={{ width: '100%', height: '80%',alignItems:'center' }}>
                                <Text style={{fontSize:wide*0.045,color:Colors.main,fontWeight:'700',margin:wide*0.05,lineHeight:wide*0.065}}>
                                “El dinero que es transferido a tu cuenta es neto, es decir, del precio que acordaron con el cliente, se descuenta un pequeño cargo por usar la aplicación, y por utilizar la pasarela de pagos respectiva, para luego liberar el dinero restante hacia tu cuenta”
                                </Text>
                                
                            </View>
                        </View>
                        {/* </BlurView>  */}
                    </View>
                </Modal>
                : null
            }
                            <TouchableOpacity onPress={()=>setMoreInfo(true)} style={{ marginTop: wide * 0.03, borderRadius: wide * 0.1, backgroundColor: Colors.main, color: '#ffffff', alignItems: 'center', justifyContent: 'center', width: wide * 0.55, height: wide * 0.13 }}>
                                <Text style={{ fontSize: wide * 0.06, color: '#ffffff', }}>More Info</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </SafeAreaView >
            <View style={{}}>
                <BottomNavigation navigation={navigation} checked='Payment' />
            </View>


        </View >
    )
}

export default PaymentScreen