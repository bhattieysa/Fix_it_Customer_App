import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import BottomNavigation from '../../components/BottomNavigation'
import Colors from '../../constants/Colors';
import Layout from '../../constants/Dimensions';
import AppLoader from '../../components/Apploader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as api from '../../../apis/api';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
const ProfileScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [userDetails, setUserDetails] = useState([])







    useEffect(() => {



        async function check() {
            const data = await AsyncStorage.getItem('user')
            const userData = JSON.parse(data)
            var formData = new FormData();

            formData.append('id', userData.login.data.id);
            setLoading(true)
            axios({
                method: 'POST',
                url: api.PROFILE_URL,
                data: formData,

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(function (response) {

console.log(response.data)
                    setUserDetails(response.data[0])
                    setLoading(false)
                })
                .catch(function (error) {
                    console.log("error1", error)
                    //setLoading(false)
                })


        }

        check()




    }, [])




    const navigation1 = useNavigation();
    const logoutUser = async () => {
        await AsyncStorage.removeItem('user');
        // navigation1.reset({
        //     index: 0,
        //     routes: [{ name: 'LoginScreen' }],
        // });
        navigation.navigate("LoginScreen")
    }

    let wide = Layout.width;
    if (loading)
        return (<AppLoader visible={loading} />)
    else
        return (
            <View style={{ flex: 1 }}>
                {Platform.OS == 'ios' ?
                    <StatusBar barStyle="dark-content" backgroundColor={Colors.main} />
                    :
                    <StatusBar barStyle="light-content" backgroundColor={Colors.main} />
                }

                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.main }} >
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled" style={{ backgroundColor: 'white', height: '100%' }}>

                            <View style={{ marginBottom: wide * 0.05 }}>
                                <View style={{ flexDirection: 'row', backgroundColor: Colors.main }}>


                                    <FastImage
                                        style={{ marginLeft: wide * 0.05, width: wide * 0.3, height: wide * 0.3, borderRadius: wide * 0.2, marginBottom: wide * 0.03, marginTop: wide * 0.03 }}
                                        source={{ uri: api.Image_URL + userDetails.image }} />
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <Text style={{ fontSize: wide * 0.08, color: '#ffffff', fontWeight: 'bold' }}>{userDetails.name}</Text>
                                        <Text style={{ fontSize: wide * 0.045, color: '#ffffff' }}>{userDetails.email}</Text>
                                        <Text style={{ fontSize: wide * 0.045, color: '#ffffff' }}>{userDetails.phone}</Text>
                                        <TouchableOpacity onPress={() => logoutUser()} style={{ marginTop: wide * 0.01, backgroundColor: 'black', paddingHorizontal: wide * 0.07, paddingVertical: wide * 0.015, borderRadius: wide * 0.015 }}><Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: wide * 0.035 }}>Cerrar sesión</Text></TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', borderColor: Colors.main, borderWidth: 2, marginTop: wide * 0.05, marginHorizontal: wide * 0.05, borderRadius: wide * 0.02, padding: wide * 0.02 }}>
                                    <Text style={{ fontSize: wide * 0.05, color: '#000000', fontWeight: 'bold', marginLeft: wide * 0.02 }} >DNI:</Text>
                                    <Text style={{ fontSize: wide * 0.05, marginLeft: wide * 0.02 }}>{userDetails.dni}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', borderColor: Colors.main, borderWidth: 2, marginTop: wide * 0.05, marginHorizontal: wide * 0.05, borderRadius: wide * 0.02, padding: wide * 0.02 }}>
                                    <Text style={{ fontSize: wide * 0.05, color: '#000000', fontWeight: 'bold', marginLeft: wide * 0.02 }} >DIRECCIÓN:</Text>
                                    <Text style={{ fontSize: wide * 0.05, marginHorizontal: wide * 0.02, flex: 1 }}>{userDetails.address}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', borderColor: Colors.main, borderWidth: 2, marginTop: wide * 0.05, marginHorizontal: wide * 0.05, borderRadius: wide * 0.02, padding: wide * 0.02 }}>
                                    <Text style={{ fontSize: wide * 0.05, color: '#000000', fontWeight: 'bold', marginLeft: wide * 0.02 }} >Experiencia:</Text>
                                    <Text style={{ fontSize: wide * 0.05, marginHorizontal: wide * 0.02, flex: 1 }}>{userDetails.brief_experience}</Text>

                                </View>
                                <Text style={{ marginLeft: wide * 0.05, fontSize: wide * 0.06, color: Colors.main, marginTop: wide * 0.04, fontWeight: 'bold' }}>Bank Details</Text>
                                <View style={{ flexDirection: 'row', borderColor: Colors.main, borderWidth: 2, marginTop: wide * 0.04, marginHorizontal: wide * 0.05, borderRadius: wide * 0.02, padding: wide * 0.02 }}>
                                    <Text style={{ fontSize: wide * 0.05, color: '#000000', fontWeight: 'bold', marginLeft: wide * 0.02 }} >Nombre del banco:</Text>
                                    <Text style={{ fontSize: wide * 0.05, marginHorizontal: wide * 0.02, flex: 1 }}>{userDetails.bank_name}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', borderColor: Colors.main, borderWidth: 2, marginTop: wide * 0.05, marginHorizontal: wide * 0.05, borderRadius: wide * 0.02, padding: wide * 0.02 }}>
                                    <Text style={{ fontSize: wide * 0.05, color: '#000000', fontWeight: 'bold', marginLeft: wide * 0.02 }} >Nombre de la cuenta:</Text>
                                    <Text style={{ fontSize: wide * 0.05, marginHorizontal: wide * 0.02, flex: 1 }}>{userDetails.account_holder_name}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', borderColor: Colors.main, borderWidth: 2, marginTop: wide * 0.05, marginHorizontal: wide * 0.05, borderRadius: wide * 0.02, padding: wide * 0.02 }}>
                                    <Text style={{ fontSize: wide * 0.05, color: '#000000', fontWeight: 'bold', marginLeft: wide * 0.02 }} >Número de cuenta:</Text>
                                    <Text style={{ fontSize: wide * 0.05, marginHorizontal: wide * 0.02, flex: 1 }}>{userDetails.account_number}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', borderColor: Colors.main, borderWidth: 2, marginTop: wide * 0.05, marginHorizontal: wide * 0.05, borderRadius: wide * 0.02, padding: wide * 0.02 }}>
                                    <Text style={{ fontSize: wide * 0.05, color: '#000000', fontWeight: 'bold', marginLeft: wide * 0.02 }} >Tipo de cuenta:</Text>
                                    <Text style={{ fontSize: wide * 0.05, marginHorizontal: wide * 0.02, flex: 1 }}>{userDetails.type_of_account}</Text>

                                </View>

                                <TouchableOpacity 
                                onPress={()=>{navigation.navigate("EditProfileScreen",
                                {
                                    data:userDetails
                                })}}
                                style={{ marginTop: wide * 0.05,alignSelf:'center',backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', width: wide * 0.4, height: wide * 0.07, borderRadius: wide * 0.02 }}>
                                    <Text
                                        style={{
                                            color: '#ffffff',
                                            fontSize: wide * 0.035,
                                            fontWeight: 'bold'
                                        }}
                                    >Editar perfil</Text>
                                </TouchableOpacity>






                            </View>

                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
                <BottomNavigation navigation={navigation} checked='Profile' />
            </View>


        )
}

export default ProfileScreen

const styles = StyleSheet.create({})