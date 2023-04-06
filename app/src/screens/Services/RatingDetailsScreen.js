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
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const RatingDetailsScreen = ({ route, navigation }) => {
  // getting params
  const id = route.params?.id

  const [loading, setLoading] = useState(false)
  const [ratingsData, setRatingsData] = useState(null)


  let wide = Layout.width;
  let high = Layout.height;

  useEffect(() => {



    async function check() {
      const data = await AsyncStorage.getItem('user')
      const userData = JSON.parse(data)


      var formData = new FormData();

      formData.append('id', id);
      setLoading(true)
      axios({
        method: 'POST',
        url: api.GETRATINGDETAILS_URL,
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
            setRatingsData(response.data.data)

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
    <View style={{ flex: 1, }} >
      <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
      <AppLoader visible={loading} />
      <SafeAreaView>



        <View style={{ flexDirection: 'row', marginHorizontal: wide * 0.04 }}>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M19 11H7.82998L12.71 6.11997C13.1 5.72997 13.1 5.08997 12.71 4.69997C12.32 4.30997 11.69 4.30997 11.3 4.69997L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" fill={Colors.main} />
              </Svg>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', height: wide * 0.15 }}>
            <Text style={{ fontSize: 20, color: '#09101D', fontWeight: '600', marginLeft: wide * 0.05 }}>Customer Valoration</Text>
          </View>

        </View>
        {ratingsData == null ?

          <View style={{ height: '85%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: Colors.main, fontSize: wide * 0.055, marginTop: wide * 0.01, fontWeight: "500" }}>No Valoration Available</Text>
          </View>
          :
          <View>
            <FlatList
              data={ratingsData}
              bounce={false}
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
              style={{ marginTop: wide * 0.03 }}
              keyExtractor={item => item.id}
              ListFooterComponent={() => <View style={{ marginBottom: high * 0.15 }}></View>}
              renderItem={(item, index, arr) => {
                return (
                  <View style={{ marginTop: wide * 0.04,backgroundColor:'white',marginHorizontal:wide*0.08,borderRadius:wide*0.02 }}>
                    <View style={{  paddingVertical: wide * 0.03,marginHorizontal:wide*0.03 }}>
                    <View style={{ alignItems: 'center', paddingVertical: wide * 0.03, backgroundColor: 'white', borderRadius: wide * 0.02 }}>

                                            <View style={{ flexDirection: 'row', marginVertical: wide * 0.02, marginHorizontal: wide * 0.05 }}>
                                                <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600', flex: 1.5 }}>Category</Text>
                                                <Text style={{ fontSize: wide * 0.05, color: 'black', fontWeight: '400', flex: 1 }}>{item.item.category}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: wide * 0.02, marginHorizontal: wide * 0.05 }}>
                                                <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600', flex: 1.5 }}>Sub Category</Text>
                                                <Text style={{ fontSize: wide * 0.05, color: 'black', fontWeight: '400', flex: 1 }}>{item.item.sub_category}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: wide * 0.02, marginHorizontal: wide * 0.05 }}>
                                                <Text style={{ fontSize: wide * 0.05, color: Colors.main, fontWeight: '600', flex: 1.5 }}>Service Name</Text>
                                                <Text style={{ fontSize: wide * 0.05, color: 'black', fontWeight: '400', flex: 1 }}>{item.item.name}</Text>
                                            </View>

                                            <Rating
                            readonly={true}
                            imageSize={25}
                            style={{justifyContent:'flex-start',alignItems:'flex-start',marginVertical:wide*0.03 }}
                            startingValue={item.item.ratings}
                          />
                           <Text style={{fontSize:wide*0.05}}>{item.item.comments}</Text>
                                        </View>
           
                     

                    </View>
                  </View>
                )
              }} />

          </View>
        }





      </SafeAreaView>
    </View>
  )
}

export default RatingDetailsScreen
