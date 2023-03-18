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
      var formData = new FormData();

      formData.append('id', userData.login.data.id);
      setLoading(true)
      axios({
        method: 'POST',
        url: api.USERCATEGORIES_URL,
        data: formData,

        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(function (response) {
          if (response.data.categories[0].error != 'true') {
            setCategories(response.data.categories)
          }
          // setUserDetails(response.data[0])
          setLoading(false)
        })
        .catch(function (error) {
          console.log("error1", error)
          //setLoading(false)
        })



      axios({
        method: 'POST',
        url: api.CATEGORY_URL,


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
  const addCategory = async (id) => {


    const data = await AsyncStorage.getItem('user')
    const userData = JSON.parse(data)
    var formData = new FormData();

    formData.append('user_id', userData.login.data.id);
    formData.append('cat_id', id);

    setLoading(true)
    axios({
      method: 'POST',
      url: api.ADDCATEGORY_URL,
      data: formData,

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(function (response) {

console.log(response.data)
        if (response.data.categories[0].error != "true") {
          setCategories(response.data.categories)
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
        console.log("error11", error)
        //setLoading(false)
      })





  }





  // const openDrawer = () => {

  //   navigation.openDrawer();
  // }









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
                    }}>Select Category</Text>
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

                            addCategory(item.item.id)

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
    
            <View >
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, color: Colors.main, fontWeight: 'bold', fontSize: wide * 0.08 }}>Hi, {userName}</Text>
                <View style={{}}>
                  <Image 

                   style={{ width: wide * 0.45, height: wide * 0.22, resizeMode: 'stretch', alignSelf: 'center' }}
                   source={require('../../../Images/logo.png')}/>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.main,
                    width: wide * 0.4,
                   
                    borderRadius: wide * 0.03,
                    height: wide * 0.08,
                    justifyContent:'center',

                    marginBottom: wide * 0.04
                  }}
                  onPress={() => {
                    setShowCategoryrDropDown(true)
                  }}><Text style={{
                    color: '#ffffff',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: wide * 0.035,
                   

                  }}>Add Category</Text></TouchableOpacity>
                  </View>
              </View>

{categories != null ?
                <FlatList
                  data={categories}
                  bounce={false}
                  showsVerticalScrollIndicator={false}
                  alwaysBounceVertical={false}
                  style={{ marginTop: wide * 0.03 }}
                  keyExtractor={item => item.service_cat_id}
                  ListFooterComponent={() => <View style={{ marginBottom: high * 0.15 }}></View>}
                  renderItem={(item, index, arr) => {
                    return (
                      <View style={{ marginTop: wide * 0.01 }}>
                        <Text style={{ fontSize: wide * 0.05, alignSelf: 'center', fontWeight: 'bold' }}>{item.item.name} ({item.item.commission}%)</Text>

                        <SubCategory cat_id={item.item.id} navigation={navigation} />

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