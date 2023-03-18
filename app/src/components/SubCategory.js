import { View, Text, FlatList, Modal, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import Colors from '../constants/Colors';
import Layout from '../constants/Dimensions';
import AppLoader from '../components/Apploader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../../apis/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image';
const SubCategory = ({ cat_id, navigation }) => {

    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState(null)
    const [categoryData, setCategoryData] = useState(null)
    const [categories1, setCategories1] = useState(null)
    const navigation1 = useNavigation();
    const [categoriesIndex, setCategoriesIndex] = useState()
    const [showCategoryDropDown, setShowCategoryrDropDown] = useState(false)
    const [categoryDetailsDropdown, setCategoryDetailsDropdown] = useState(false)
    const [categoryValue, setCategoryValue] = useState('Select Category')
    const [subCategoryValue, setSubCategoryValue] = useState('Select Sub Category')
    const [professionCertificates, setProfessionCertificates] = useState(null)
    let wide = Layout.width;
    let high = Layout.height;



    useEffect(() => {

        async function check() {
            const data = await AsyncStorage.getItem('user')
            const userData = JSON.parse(data)
            var formData = new FormData();

            formData.append('id', userData.login.data.id);
            formData.append('category_id', cat_id);
            setLoading(true)
            axios({
                method: 'POST',
                url: api.USERSUBCATEGORIES_URL,
                data: formData,

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(function (response) {


                    setCategories(response.data.sub_categories)
                    // setUserDetails(response.data[0])
                    setLoading(false)
                })
                .catch(function (error) {
                    console.log("error1", error)
                    //setLoading(false)
                })
                var formData = new FormData();

              
                formData.append('cat_id', cat_id);

            axios({
                method: 'POST',
                url: api.SUBCATEGORY_URL,
                data:formData,
                


                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(function (response) {


                    setCategories1(response.data.categories)
                    // setUserDetails(response.data[0])
                    setLoading(false)
                })
                .catch(function (error) {
                    console.log("error1", error)
                    //setLoading(false)
                })


        }

        check()




    }, [])


    const addSubCategory = async (id) => {

        const data = await AsyncStorage.getItem('user')
        const userData = JSON.parse(data)
        var formData = new FormData();

        formData.append('user_id', userData.login.data.id);
        formData.append('sub_cat_id', id);
        formData.append('cat_id', cat_id);



        setLoading(true)
        axios({
            method: 'POST',
            url: api.ADDSUBCATEGORY_URL,
            data: formData,

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {


                if (response.data.categories[0].error != 'true') {
                    navigation1.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                    setShowCategoryrDropDown(false)
                    setLoading(false)
                    Alert.alert(
                        '',
                        response.data.categories[0].message,
                    );
                } else {
                    setShowCategoryrDropDown(false)
                    setLoading(false)
                    Alert.alert(
                        '',
                        response.data.categories[0].message,
                    );
                }
            })
            .catch(function (error) {
                console.log("error1", error)
                //setLoading(false)
            })



    }
    const uploadDocument = (item) => {



        if (professionCertificates == null) {
            Alert.alert(
                '',
                'Please Upload Profession Certificate',
            );
            return
        }




        var formData = new FormData();
        formData.append('service_cat_id', item.service_cat_id);




        professionCertificates.map((file, index) => (
            formData.append('profession', {
                uri: file.uri,
                type: file.type,
                name: file.name,
            })
        ))
        setLoading(true)
        axios({
            method: 'POST',
            url: api.UPLOADEXPERIENCE_URL,
            data: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                if (response.data.signup.error == 'false') {
                    setLoading(false)
                    Alert.alert(
                        '',
                        'Certificate Upload Successful',
                    );
                    navigation1.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                    // navigation.navigate('LoginScreen')     
                } else {
                    setLoading(false)
                    Alert.alert(
                        '',
                        'Failed To Upload Certificate',
                    );
                }
            })
            .catch(function (error) {
                console.log("error1", error)
                setLoading(false)
            })
    }
    const Profession = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.allFiles],

            });
            setProfessionCertificates(response);

        } catch (err) {
            console.warn(err);
        }
    }, []);

    const categoryDetails = (item) => {

        setCategoryData(item)
        setCategoryDetailsDropdown(true)
    }
    return (
        <View>

            {showCategoryDropDown === true ?
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showCategoryDropDown}
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
                            width: '65%', height: wide * 0.6, backgroundColor: '#ffffff',
                            marginTop: 20, borderRadius: 20, alignItems: 'center',
                        }}>
                            <View style={{
                                width: '100%', height: '30%',
                                alignItems: 'center', justifyContent: 'center',
                                backgroundColor: Colors.main,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                flexDirection: 'row',
                                // borderBottomColor: Colors.newGrayFontColor, borderBottomWidth: 1
                            }}>
                                <Text style={{
                                    marginLeft: wide * 0.03, flex: 1, color: Colors.white, fontSize: 18, fontWeight: '700', marginTop: wide * 0.01,
                                }}>Select Sub Category</Text>
                                <Ionicons name="ios-close" onPress={() => setShowCategoryrDropDown(false)} style={{ marginRight: wide * 0.02 }} size={34} color="#fff" />
                            </View>
                            <View style={{ width: '100%', height: '70%', }}>
                                <FlatList
                                    data={categories1}
                                    bounce={false}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={item => item.id}
                                    renderItem={(item, index) =>
                                        <TouchableOpacity
                                            style={{
                                                justifyContent: 'center', alignItems: 'center',
                                                height: wide * 0.13, marginTop: wide * 0.01,
                                                borderBottomColor: 'grey', borderBottomWidth: 1
                                            }}


                                            onPress={() => {

                                                addSubCategory(item.item.id)

                                            }}

                                        >

                                            <Text style={{
                                                color: '#000000', fontSize: 15, lineHeight: 16,
                                            }}>{item.item.name}</Text>
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                        </View>
                        {/* </BlurView>  */}
                    </View>
                </Modal>
                : null
            }

            <FlatList
                data={categories}
                bounce={false}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: wide * 0.03 }}
                horizontal={true}
                alwaysBounceHorizontal={false}

                keyExtractor={item => item.service_cat_id}
                ListFooterComponent={() =>
                    <View>
                    <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems: 'center', width: wide * 0.15, height: wide * 0.15, borderColor: Colors.main, borderWidth: 4, borderRadius: wide * 0.03, backgroundColor: Colors.main }}
                        onPress={() => {
                            setShowCategoryrDropDown(true)
                        }}
                    >
                        <Ionicons name="add" size={wide * 0.13} color='#ffffff' />
                    </TouchableOpacity>
                    
                    </View>
                    
                }
                renderItem={(item, index, arr) => {

                    return (
                        <>

                            {categoryDetailsDropdown === true ?
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={categoryDetailsDropdown}
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
                                                }}>{categoryData.name} Details</Text>
                                                <Ionicons name="ios-close" onPress={() => setCategoryDetailsDropdown(false)} style={{ marginRight: wide * 0.02 }} size={34} color="#fff" />
                                            </View>
                                            <View style={{ width: '100%', height: '80%', }}>

                                                <Text style={{
                                                    color: categoryData.document_status == 'Rejected'? 'red': categoryData.document_status == 'Approved'? 'green': 'orange',
                                                    fontSize: wide * 0.045,
                                                    fontWeight: 'bold',
                                                    alignSelf: 'flex-end',
                                                    marginTop: wide * 0.03,
                                                    marginRight: wide * 0.03

                                                }}>
                                                    {categoryData.document_status}</Text>




                                                <TouchableOpacity style={{ marginTop: wide * 0.05 }} onPress={() => Profession()}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                                        {professionCertificates != null ?
                                                            <MaterialCommunityIcons name='certificate' size={wide * 0.23} color="#0000FF" />
                                                            :
                                                            <MaterialCommunityIcons name='certificate' size={wide * 0.23} color="#000" />
                                                        }

                                                        <Text style={{ color: '#2C3A4B', fontSize: 16, fontWeight: '600' }}>Upload Profession Certificate</Text>

                                                    </View>
                                                </TouchableOpacity>
                                                {categoryData.document_status == 'Pending' ?
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            uploadDocument(item.item)
                                                        }}
                                                        style={{ marginVertical: wide * 0.1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.main, width: wide * 0.4, height: wide * 0.08, borderRadius: wide * 0.1 }}>
                                                        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: wide * 0.045 }}>Upload</Text></TouchableOpacity>
                                                    :
                                                    <></>
                                                }

                                            </View>
                                        </View>
                                        {/* </BlurView>  */}
                                    </View>
                                </Modal>
                                : null
                            }



                            {item.item.name != null ?
                                <TouchableOpacity
                                    onPress={() => {

                                        categoryDetails(item.item)
                                    }}
                                    style={{ marginRight: wide * 0.06, width: wide * 0.15, }} >
{item.item.document_status=="Approved"?
                                    <View style={{ marginRight: -wide * 0.006, zIndex: 1, marginBottom: -wide * 0.035, alignSelf: 'flex-end', width: wide * 0.05, height: wide * 0.05, borderRadius: wide * 0.5, backgroundColor: '#4BB543', justifyContent: 'center', alignItems: 'center' }}>
                                        <Entypo name="check" size={wide * 0.04} color='#ffffff' />
                                    </View>
                                    :
                                    <></>
                                }
                                    <FastImage
                                    resizeMode={FastImage.resizeMode.stretch}
                                        style={{ width: wide * 0.15, height: wide * 0.15,  borderRadius: wide * 0.03 }}
                                        source={{ uri: api.Image_Admin_URL + item.item.image }} />
                                    <Text style={{ alignSelf: 'center', marginTop: wide * 0.005, fontSize: wide * 0.04, color: '#000000' }}>{item.item.name}</Text>

                                </TouchableOpacity>
                                :
                                <></>
                            }
                        </>
                    )
                }} />


        </View>
    )
}

export default SubCategory