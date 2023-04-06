import { View, FlatList, Text, Button, BackHandler, KeyboardAvoidingView, ScrollView, TextInput, SafeAreaView, StatusBar, Modal, Alert, Image, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'

import Colors from '../../constants/Colors';
import Layout from '../../constants/Dimensions';
import AppLoader from '../../components/Apploader';
import { BlurView } from "@react-native-community/blur";
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const HomeScreen = ({ navigation }) => {
  // const handleBackPress = () => {
  //   BackHandler.exitApp()
  // }
  // BackHandler.addEventListener("hardwareBackPress", handleBackPress)

  const [selectedDay, setSelectedDay] = useState(1)

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState(null)
  const [sub_categories, setSubCategories] = useState(null)
  const [categories1, setCategories1] = useState(null)
  const [categoriesIndex, setCategoriesIndex] = useState()
  const [showCategoryDropDown, setShowCategoryrDropDown] = useState(false)
  const [showSubCategoryDropDown, setShowSubCategoryrDropDown] = useState(false)
  const [categoryValue, setCategoryValue] = useState('Select Category')
  const [subCategoryValue, setSubCategoryValue] = useState('Select Sub Category')
  const [userName, setUserName] = useState(null)
  const [ratings, setRatings] = useState(null)









  useEffect(() => {
    async function check() {
      const data = await AsyncStorage.getItem('user')
      const userData = JSON.parse(data)

      setUserName(userData.login.data.name)
      // var formData = new FormData();

      // formData.append('id', userData.login.data.id);
      setLoading(true)
      axios({
        method: 'POST',
        url: api.USERCATEGORIES_URL,
        // data: formData,

        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(function (response) {
          console.log(response.data)
          if (response.data.categories[0].error != 'true') {
            setCategories(response.data.categories)
            setSubCategories(response.data.sub_categories)
          }
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









  let wide = Layout.width;
  let high = Layout.height;

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS == 'ios' ?
        <StatusBar barStyle="dark-content" backgroundColor={Colors.main} />
        :
        <StatusBar barStyle="light-content" backgroundColor={Colors.main} />
      }
      <AppLoader visible={loading} />
      <SafeAreaView style={{ flex: 1 }} >
        <View style={{ marginHorizontal: wide * 0.045, marginTop: wide * 0.025 }}>
          {/* <ScrollView showsVerticalScrollIndicator={false} bounces={false}> */}


          <View >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1, color: Colors.main, fontWeight: 'bold', fontSize: wide * 0.08 }}>Hi, {userName}</Text>
              <View style={{}}>
                <Image
                  style={{ width: wide * 0.45, height: wide * 0.22, resizeMode: 'stretch', alignSelf: 'center' }}
                  source={require('../../../Images/logo.png')} />
              </View>
            </View>
<Text style={{ color: Colors.main, fontWeight: 'bold',fontSize:wide*0.07,marginTop:wide*0.04,}}>What do you need?</Text>
            {categories != null ?
              <FlatList
                data={categories}
                bounce={false}
                numColumns={3}                 
        columnWrapperStyle={{
        flex:1,
         
       
          
        }}

                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                style={{ marginTop: wide * 0.03,marginHorizontal:wide*0.02, }}
                keyExtractor={item => item.id}
                ListFooterComponent={() => <View style={{ marginBottom: high * 0.3 }}></View>}
                renderItem={(item, index, arr) => {
                  const lastItem = index === item.length - 1;
                  return (
                    <View style={{ marginVertical: wide * 0.04, marginRight:lastItem?0:wide*0.065}}>
                      <TouchableOpacity
                        onPress={() => {

                          navigation.navigate("SubCategoryScreen",{
                            "data":sub_categories,
                            "name":item.item.name,
                            "id":item.item.id,
                          })
                        }}
                        style={{ marginRight: wide * 0.06, width: wide * 0.20}} >
                       
                        <FastImage
                          resizeMode={FastImage.resizeMode.stretch}
                          style={{ width: wide * 0.20, height: wide * 0.20, borderRadius: wide * 0.03 }}
                          source={{ uri: api.Image_Admin_URL + item.item.image }} />
                        <Text style={{ alignSelf: 'center', marginTop: wide * 0.025, fontSize: wide * 0.045, color: '#000000' }}>{item.item.name}</Text>

                      </TouchableOpacity>



                      {/* <SubCategory cat_id={item.item.id} navigation={navigation} /> */}

                    </View>

                  )
                }} />

              :
              <></>
            }





          </View>

        </View>
      </SafeAreaView>
      <View style={{}}>
        <BottomNavigation navigation={navigation} checked='Home' />
      </View>


    </View>
  )
}

export default HomeScreen