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

const SubCategoryScreen = ({ route, navigation }) => {
    // getting params
    const sub_category = route.params?.data

    const category_name = route.params?.name
    const category_id = route.params?.id

    //const filter_sub_category =sub_category.filter(sub_category => sub_category.category_id == category_id)
    let filter_sub_category = sub_category.filter((item) => {
        return item.category_id === category_id
    })
    //console.log("hello",filteredName)
    const [loading, setLoading] = useState(false)
    let wide = Layout.width;
    let high = Layout.height;

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
            <AppLoader visible={loading} />
            <SafeAreaView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>

                    <View style={{ flexDirection: 'row', marginHorizontal: wide * 0.04 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M19 11H7.82998L12.71 6.11997C13.1 5.72997 13.1 5.08997 12.71 4.69997C12.32 4.30997 11.69 4.30997 11.3 4.69997L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" fill={Colors.main} />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', height: wide * 0.15 }}>
                            <Text style={{ fontSize: 20, color: '#09101D', fontWeight: '600', marginLeft: wide * 0.05 }}>Sub Category</Text>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: wide * 0.045 }} >

                        <Text style={{ alignSelf: 'center', color: Colors.main, fontWeight: '600', fontSize: wide * 0.08 }}>{category_name}</Text>
                        <FlatList
                            data={filter_sub_category}
                            bounce={false}
                            numColumns={3}
                            columnWrapperStyle={{
                                flex: 1,
                            }}
                            showsVerticalScrollIndicator={false}
                            alwaysBounceVertical={false}
                            style={{ marginTop: wide * 0.03 }}
                            keyExtractor={item => item.id}
                            ListFooterComponent={() => <View style={{ marginBottom: high * 0.15 }}></View>}
                            renderItem={(item, index, arr) => {
                                const lastItem = index === item.length - 1;
                                return (
                                    <View style={{ marginVertical: wide * 0.04, marginRight: lastItem ? 0 : wide * 0.065 }}>
                                        {item.item.error != 'true' ?
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate("RequestService", {
                                                        "id": item.item.id,
                                                        "name": item.item.name,
                                                        "category_id": category_id
                                                    })
                                                }}
                                                style={{ marginRight: wide * 0.06, width: wide * 0.20 }} >
                                                <FastImage
                                                    resizeMode={FastImage.resizeMode.stretch}
                                                    style={{ width: wide * 0.20, height: wide * 0.20, borderRadius: wide * 0.03 }}
                                                    source={{ uri: api.Image_Admin_URL + item.item.image }} />
                                                <Text style={{ alignSelf: 'center', marginTop: wide * 0.025, fontSize: wide * 0.045, color: '#000000' }}>{item.item.name}</Text>
                                            </TouchableOpacity>
                                            :
                                            <View style={{ height: '100%', alignItems: 'center', justifyContent: "center" }}>
                                                <Text style={{ color: Colors.main, fontSize: wide * 0.055, marginTop: wide * 0.01, fontWeight: "500" }}>No Sub Categories Available </Text>


                                            </View>
                                        }


                                        {/* <SubCategory cat_id={item.item.id} navigation={navigation} /> */}

                                    </View>

                                )
                            }} />




                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    )
}

export default SubCategoryScreen
