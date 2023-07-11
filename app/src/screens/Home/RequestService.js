import { View, Text, Button, SafeAreaView, StatusBar, Alert, KeyboardAvoidingView, FlatList, Image, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native'
import React from 'react'
import { useState, useEffect, useCallback,useRef } from 'react';
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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import FastImage from 'react-native-fast-image';


const RequestService = ({ route, navigation }) => {
    // getting params
    const sub_category_id = route.params?.id
    const sub_category_name = route.params?.name
    const category_id = route.params?.category_id
    //console.log("hello",filteredName)
    const [loading, setLoading] = useState(false)
    const [nameOfServices, setNameOfServices] = useState(null)
    const [problem, setProblem] = useState(null)
    const [where, setWhere] = useState(null)
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const navigation1 = useNavigation();

    // const [
    //     currentLongitude,
    //     setCurrentLongitude
    // ] = useState('...');
    // const [
    //     currentLatitude,
    //     setCurrentLatitude
    // ] = useState('...');
    // const [
    //     locationStatus,
    //     setLocationStatus
    // ] = useState('');
    let wide = Layout.width;
    let high = Layout.height;
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    // useEffect(() => {
    //     const requestLocationPermission = async () => {
    //         if (Platform.OS === 'ios') {
    //             getOneTimeLocation();
    //             subscribeLocationLocation();
    //         } else {
    //             try {
    //                 const granted = await PermissionsAndroid.request(
    //                     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //                     {
    //                         title: 'Location Access Required',
    //                         message: 'This App needs to Access your location',
    //                     },
    //                 );
    //                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                     //To Check, If Permission is granted
    //                     getOneTimeLocation();
    //                     subscribeLocationLocation();
    //                 } else {
    //                     setLocationStatus('Permission Denied');
    //                 }
    //             } catch (err) {
    //                 console.warn(err);
    //             }
    //         }
    //     };
    //     requestLocationPermission();
    //     return () => {
    //         Geolocation.clearWatch(watchID);
    //     };
    // }, []);

    // const getOneTimeLocation = () => {
    //     setLocationStatus('Getting Location ...');
    //     Geolocation.getCurrentPosition(
    //         //Will give you the current location
    //         (position) => {
    //             setLocationStatus('You are Here');

    //             //getting the Longitude from the location json
    //             const currentLongitude =
    //                 JSON.stringify(position.coords.longitude);

    //             //getting the Latitude from the location json
    //             const currentLatitude =
    //                 JSON.stringify(position.coords.latitude);

    //             //Setting Longitude state
    //             setCurrentLongitude(currentLongitude);

    //             //Setting Longitude state
    //             setCurrentLatitude(currentLatitude);
    //         },
    //         (error) => {
    //             setLocationStatus(error.message);
    //         },
    //         {
    //             enableHighAccuracy: false,
    //             timeout: 30000,
    //             maximumAge: 1000
    //         },
    //     );
    // };
    // const subscribeLocationLocation = () => {
    //     watchID = Geolocation.watchPosition(
    //         (position) => {
    //             //Will give you the location on location change

    //             setLocationStatus('You are Here');
    //             console.log(position);

    //             //getting the Longitude from the location json        
    //             const currentLongitude =
    //                 JSON.stringify(position.coords.longitude);

    //             //getting the Latitude from the location json
    //             const currentLatitude =
    //                 JSON.stringify(position.coords.latitude);

    //             //Setting Longitude state
    //             setCurrentLongitude(currentLongitude);

    //             //Setting Latitude state
    //             setCurrentLatitude(currentLatitude);
    //         },
    //         (error) => {
    //             setLocationStatus(error.message);
    //         },
    //         {
    //             enableHighAccuracy: false,
    //             maximumAge: 1000
    //         },
    //     );
    // };

    const Next =async () => {
       


// navigation.navigate("SearchScreen", {
    
//     "category_id": category_id,
//     "sub_category":sub_category_id,
//     "name":nameOfServices,
//     "problem":problem,
//     "lat":lat,
//     "lng":lng,
//     "where":where
    
// })



const data = await AsyncStorage.getItem('user')
            const userData = JSON.parse(data)
            var formData = new FormData();
            formData.append('id', userData.login.data.id);  
            formData.append("category_id", category_id); 
            formData.append("sub_category",sub_category_id); 
            formData.append("name",nameOfServices); 
            formData.append("problem",problem); 
            formData.append("lat",lat); 
            formData.append("lng",lng); 
            formData.append("where",where); 

// formData.append('id', userData.login.data.id);
setLoading(true)
axios({
  method: 'POST',
  url: api.REQUESTSERVICES_URL,
   data: formData,

  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
})
  .then(function (response) {
    console.log(response.data)
    if(response.data.data.error){
        Alert.alert(
            '',
            'Solicitud de servicio exitosa',
          );
          navigation1.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });

    }else{
        Alert.alert(
            '',
            'No se pudo solicitar el servicio',
          );
    }

    setLoading(false)
  })
  .catch(function (error) {
    console.log("error1", error)
    //setLoading(false)
  })


      };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
            <AppLoader visible={loading} />
            <SafeAreaView >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView style={{height:'100%'}} showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">


                    <View style={{ flexDirection: 'row', marginHorizontal: wide * 0.04 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M19 11H7.82998L12.71 6.11997C13.1 5.72997 13.1 5.08997 12.71 4.69997C12.32 4.30997 11.69 4.30997 11.3 4.69997L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" fill={Colors.main} />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', height: wide * 0.15 }}>
                            <Text style={{ fontSize: 20, color: '#09101D', fontWeight: '600', marginLeft: wide * 0.05 }}>Solicitar servicio</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: wide * 0.045, marginVertical: wide * 0.05 }} >
                        <Text style={{ alignSelf: 'center', color: Colors.main, fontWeight: '600', fontSize: wide * 0.08 }}>{sub_category_name}</Text>
                        <View>
                            <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02, marginTop: wide * 0.06 }}>Nombre de los servicios</Text>
                            <View style={{ height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1, justifyContent: 'center' }}>
                                <TextInput onChangeText={text => setNameOfServices(text)} placeholder='Ingrese el nombre de los servicios' style={{ marginHorizontal: wide * 0.05 }} />
                            </View>
                            <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02, marginTop: wide * 0.06 }}>Describe tu problema</Text>
                            <View style={{ height: wide * 0.5, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.03 }}>
                                <TextInput multiline={true} onChangeText={text => setProblem(text)} placeholder='Describe tu problemam' 
                                style={{ lineHeight: wide * 0.05, marginHorizontal: wide * 0.05, marginTop: wide * 0.04 }} />
                            </View>
                            <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600', marginLeft: wide * 0.03, marginBottom: wide * 0.02, marginTop: wide * 0.06 }}>Dónde?</Text>
                         

                                <GooglePlacesAutocomplete
                                    placeholder="Seleccione su dirección"
                                    onPress={(data, details = null) => {
                                      
                                       setWhere(data.description)
                                        setLat(details.geometry.location.lat)
                                        setLng(details.geometry.location.lng)
                                    }}
                                    query={{ key: 'AIzaSyDjqfCle1OgQWLg9O5iefwfbOx7bYP7WW0' }}
                                    fetchDetails={true}
                                    onFail={error => console.log(error)}
                                    onNotFound={() => console.log('no results')}
                                
                                   
                                    styles={{
                                        container: {
                                            flex: 0,
                                           
                                          
                                          },
                                          description: {
                                            color: '#000',
                                            fontSize: 16,
                                           
                                          },
                                          predefinedPlacesDescription: {
                                            color: '#3caf50',
                                          },
                                          textInput: {
                                            height: wide * 0.125, borderColor: '#EBEEF2', borderWidth: 2, borderRadius: wide * 0.1,justifyContent:'center'
                                            ,paddingHorizontal: wide * 0.05,
                                          }
                                    }}
                                />

                                
                           
                            <TouchableOpacity
                            onPress={()=>{
                                Next()
                            }}
                                style={{ marginTop: wide * 0.06, alignSelf: 'center', backgroundColor: Colors.main, width: wide * 0.3, height: wide * 0.1, borderRadius: wide * 0.02, justifyContent: 'center', alignItems: 'center' }}
                            ><Text style={{ color: 'white', fontSize: wide * 0.045, fontWeight: '600' }}>Pedido</Text></TouchableOpacity>
                        </View>
                    </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

export default RequestService
