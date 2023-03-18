import * as React from 'react';
import {
  Button, View, SafeAreaView,

  StyleSheet,
  Image,
  Text,
  TouchableOpacity

} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from '../../../routes/HomeStack'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Layout from '../../constants/Dimensions';
import Colors from "../../constants/Colors";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
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
  parse,
} from 'react-native-svg';







let wide = Layout.width;
const Draw = createDrawerNavigator();

const CustomSidebarMenu = (props) => {

  const [user, setUser] = React.useState("")
  const [version, setVersion] = React.useState()

//   const logoutUser = async () => {
//     await AsyncStorage.removeItem('user')
//     await AsyncStorage.removeItem('event')
//     await AsyncStorage.removeItem('events')
//     if(user.login_with == 'Gmail')
//       await GoogleSignin.signOut();
//     Toast.show('Logged Out');
//     props.navigation.navigate('LoginScreen')
//   }

//   React.useEffect(() => {

//     const getData = async () => {
//       setVersion(await getVersion())
//       const userData = await AsyncStorage.getItem("user")
//       let parsedUser = JSON.parse(userData)
//       setUser(parsedUser.user)


//     }

//     getData()
//   }, [])




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/*Top Large Image */}

      <View style={{ flexDirection: 'row', marginLeft: wide * 0.03, marginTop: wide * 0.1 }}>
        <Image
          source={{ uri: user.image }}
          style={{ width: wide*0.13, height: wide*0.13, borderRadius: wide*0.14/2 }}
        />
        <View style={{ marginRight: wide * 0.015,marginLeft:wide*0.04, justifyContent: 'center' }} >

          <Text style={{ color: '#222222', fontWeight: '600', fontSize: 16, width: wide * 0.5, }}>{user.first_name} {user.last_name}  <MaterialCommunityIcons onPress={() => props.navigation.navigate("EditProfileScreen")} style={{marginLeft:wide*0.005}} name="account-edit-outline" size={20} color="#356BF8" /></Text>

          <Text style={{ color: '#222222', fontWeight: '400', fontSize: 11, width: wide * 0.5,marginTop:wide*0.01 }}>{user.email}</Text>
        </View>
      </View>

     
      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }} {...props} bounces={false}>


        <View style={{marginTop:wide*0.15}}>
          <TouchableOpacity onPress={() => props.navigation.navigate("HomeScreen")} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{marginLeft: wide * 0.05,justifyContent:'center',alignItems:'center'}}>
              <Svg
                
                width={25}
                height={25}
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"

              >
                <Path
                  d="M23.566 10.633c.288.246.288.656.041.943-.205.287-.615.287-.902.041l-1.517-1.353v8.08a3.265 3.265 0 01-3.282 3.281H6.094c-1.846 0-3.282-1.436-3.282-3.281v-8.08l-1.558 1.353c-.287.246-.697.246-.902-.04-.247-.288-.247-.698.04-.944L11.55.83a.595.595 0 01.861 0l11.156 9.803zm-17.472 9.68h2.625V13.75c0-.697.574-1.313 1.312-1.313h3.938c.697 0 1.312.616 1.312 1.313v6.563h2.625a1.97 1.97 0 001.969-1.97V9.116L12 2.184 4.125 9.115v9.229c0 1.107.861 1.968 1.969 1.968zm3.937 0h3.938V13.75H10.03v6.563z"
                  fill="#C4C7CC"
                />
              </Svg>
              {/* <Ionicons  style={{marginLeft:wide*0.005}} name="home-outline" size={25} color="#C4C7CC" /> */}
            </View>
            <Text style={{ fontSize: 14, fontWeight: '600',  color: 'black',marginLeft:wide*0.08 }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("AllEventsScreen")} style={{ flexDirection: 'row', alignItems: 'center', marginTop: wide * 0.1 }}>
          <View style={{marginLeft: wide * 0.05,justifyContent:'center',alignItems:'center'}}>
          <Svg
      width={25}
      height={25}
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
     
    >
      <Path
        d="M11.264 11.986l2.01.287c.82.123 1.148 1.108.574 1.682L12.37 15.35l.328 2.01c.164.82-.697 1.435-1.394 1.066l-1.846-.944-1.805.944c-.697.369-1.558-.246-1.394-1.067l.328-2.01-1.477-1.394c-.574-.574-.246-1.559.575-1.682l2.01-.287.902-1.845a.979.979 0 011.763 0l.903 1.845zm-2.707 1.19l-2.051.287 1.476 1.435-.328 2.051 1.805-.984 1.846.984-.328-2.05 1.476-1.436-2.05-.287-.944-1.846-.902 1.846zM5.562 3.25h7.875V1.281c0-.328.288-.656.657-.656.328 0 .656.328.656.656V3.25h1.313a2.643 2.643 0 012.625 2.625V19a2.617 2.617 0 01-2.625 2.625H2.938A2.591 2.591 0 01.312 19V5.875A2.617 2.617 0 012.938 3.25H4.25V1.281c0-.328.287-.656.656-.656.328 0 .657.328.657.656V3.25zM1.626 19c0 .738.574 1.313 1.313 1.313h13.124c.698 0 1.313-.575 1.313-1.313V8.5H1.625V19zm0-13.125v1.313h15.75V5.875c0-.697-.615-1.313-1.313-1.313H2.938c-.738 0-1.312.616-1.312 1.313z"
        fill="#C4C7CC"
      />
    </Svg>
      {/* <MaterialIcons  style={{marginLeft:wide*0.005}} name="event-available" size={25} color="#C4C7CC" /> */}

            </View>
            <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: wide * 0.08, color: 'black' ,}}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("MySessionScreen")} style={{ flexDirection: 'row', alignItems: 'center', marginTop: wide * 0.1 }}>
          <View style={{marginLeft: wide * 0.05,justifyContent:'center',alignItems:'center'}}>
          <Svg
      width={25}
      height={25}
      viewBox="0 0 27 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
     
    >
      <Path
        d="M5.133 17.688h-1.64c-1.723 0-3.118 1.476-3.118 3.28 0 .37.287.657.656.657a.675.675 0 00.657-.656c0-1.067.779-1.969 1.804-1.969h1.64c.985 0 1.806.902 1.806 1.969 0 .369.287.656.656.656a.675.675 0 00.656-.656c0-1.805-1.436-3.282-3.117-3.282zm18.375 0h-1.64c-1.723 0-3.118 1.476-3.118 3.28 0 .37.287.657.656.657a.675.675 0 00.657-.656c0-1.067.779-1.969 1.804-1.969h1.64c.985 0 1.805.902 1.805 1.969 0 .369.288.656.657.656a.674.674 0 00.656-.656c0-1.805-1.436-3.282-3.117-3.282zm-9.188 0h-1.64c-1.723 0-3.117 1.476-3.117 3.28 0 .37.287.657.656.657a.674.674 0 00.656-.656c0-1.067.78-1.969 1.805-1.969h1.64c.985 0 1.805.902 1.805 1.969 0 .369.287.656.656.656a.675.675 0 00.657-.656c0-1.805-1.436-3.282-3.118-3.282zm-3.445-3.938c0 1.477 1.148 2.625 2.584 2.625a2.591 2.591 0 002.625-2.625c0-1.435-1.149-2.625-2.584-2.625a2.617 2.617 0 00-2.625 2.625zm3.938 0c0 .738-.616 1.313-1.313 1.313a1.296 1.296 0 01-1.313-1.313c0-.697.575-1.313 1.313-1.313.697 0 1.313.616 1.313 1.313zm7.874-2.625a2.617 2.617 0 00-2.625 2.625 2.591 2.591 0 002.625 2.625c1.436 0 2.584-1.148 2.584-2.625 0-1.435-1.148-2.625-2.584-2.625zm0 3.938a1.296 1.296 0 01-1.312-1.313c0-.697.574-1.313 1.313-1.313.697 0 1.312.616 1.312 1.313 0 .738-.615 1.313-1.313 1.313zM4.313 16.375c1.436 0 2.584-1.19 2.584-2.625 0-1.477-1.148-2.625-2.583-2.625a2.617 2.617 0 00-2.625 2.625 2.591 2.591 0 002.625 2.625zm0-3.938c.698 0 1.313.616 1.313 1.313 0 .738-.615 1.313-1.313 1.313A1.296 1.296 0 013 13.75c0-.697.574-1.313 1.313-1.313zM2.345 10.47A.675.675 0 003 9.813v-7.22c0-.327.287-.655.656-.655h19.688c.328 0 .656.328.656.656v7.219c0 .369.287.656.656.656a.675.675 0 00.657-.656v-7.22c0-1.066-.903-1.927-1.97-1.927H3.657C2.55.625 1.687 1.527 1.687 2.594v7.219c0 .369.288.656.657.656z"
        fill="#C4C7CC"
      />
    </Svg>
            </View>
            <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: wide * 0.08, color: 'black' }}>My Sessions</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={()=>props.navigation.navigate("SpeakersListScreen", { speakers: eventParticipants?.participants })}style={{ flexDirection: 'row',alignItems:'center' ,marginTop:wide*0.1}}>
            <Image
            style={{marginLeft:wide*0.05}}
              source={require("../../../../Images/speakers.png")}
            />
            <Text style={{fontSize:14,fontWeight:'600',marginLeft:wide*0.03, color: 'black'}}>Speakers</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => props.navigation.navigate("SponsorsScreen")} style={{ flexDirection: 'row', alignItems: 'center', marginTop: wide * 0.1 }}>
          <View style={{marginLeft: wide * 0.05,justifyContent:'center',alignItems:'center'}}>
          <Svg
      width={25}
      height={25}
      viewBox="0 0 27 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    
    >
      <Path
        d="M26.625 14.031c0 .37-.328.656-.656.656H24c-.861 0-1.6-.533-1.887-1.312h-1.271a2.21 2.21 0 01-.287.533l-.37.492c-.574.698-1.558.862-2.337.493l-.862 1.025c-.738.861-2.05 1.025-2.953.287L13.787 16a2.915 2.915 0 01-1.64.656h-.329a3.232 3.232 0 01-2.01-.697l-3.322-2.584h-1.64c-.287.78-1.026 1.313-1.846 1.313H1.687a.648.648 0 01-.656-.657c0-.328.287-.656.657-.656H3a.675.675 0 00.656-.656V4.188H1.031a.648.648 0 01-.656-.657c0-.328.287-.656.656-.656h4.676C7.102 1.521 8.865.619 10.752.373c.37-.082.697.205.738.533a.6.6 0 01-.533.739c-1.682.246-3.281 1.107-4.47 2.337l-.206.205H4.97v7.875h1.968l3.692 2.872c.41.328.861.45 1.353.41a1.752 1.752 0 001.23-.656l.452-.452.533.37.698.574c.287.287.82.246 1.066-.123l1.64-2.01.739.615a.558.558 0 00.82-.123l.37-.451a.585.585 0 00-.083-.82l-4.43-3.61a.704.704 0 01-.122-.943c.246-.246.656-.328.943-.082l4.43 3.61c.287.245.45.532.574.82h1.19V4.186h-1.354l-.205-.164c-1.477-1.558-3.528-2.46-5.537-2.46h-.329c-.164 0-.287.082-.41.164l-3.814 3.609a.918.918 0 00-.041 1.312c.082.082.328.288.656.288a.81.81 0 00.574-.247l.041.041c.328-.369 1.149-1.148 3.117-2.953.247-.246.657-.205.903.041.246.287.246.698-.041.944l-3.117 2.912c-.41.369-.903.574-1.436.574h-.123a2.336 2.336 0 01-1.559-.738c-.82-.903-.779-2.215.082-3.076v-.041l3.856-3.61c.37-.328.82-.533 1.312-.533h.329c2.296 0 4.552.984 6.275 2.625h4.758c.328 0 .656.328.656.656 0 .37-.328.656-.656.656h-2.625v8.532c0 .369.287.697.615.697l2.01-.041c.328 0 .656.328.656.656z"
        fill="#C4C7CC"
      />
    </Svg>
            </View>
            <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: wide * 0.08, color: 'black' }}>Sponsors</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("NotificationsScreen")} style={{ flexDirection: 'row', alignItems: 'center', marginTop: wide * 0.1 }}>
          <View style={{marginLeft: wide * 0.05,justifyContent:'center',alignItems:'center'}}>
          <Svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M12.5 1.8125V2.62109C15.7344 3.16016 18.25 5.99023 18.25 9.35938V10.8867C18.25 12.9082 18.9238 14.8848 20.1816 16.502L20.8555 17.3105C21.125 17.6699 21.1699 18.1191 20.9902 18.4785C20.8105 18.8379 20.4512 19.0625 20.0469 19.0625H2.07812C1.62891 19.0625 1.26953 18.8379 1.08984 18.4785C0.910156 18.1191 0.955078 17.6699 1.22461 17.3105L1.89844 16.502C3.15625 14.8848 3.875 12.9082 3.875 10.8867V9.35938C3.875 5.99023 6.3457 3.16016 9.625 2.62109V1.8125C9.625 1.04883 10.2539 0.375 11.0625 0.375C11.8262 0.375 12.5 1.04883 12.5 1.8125ZM10.7031 4.6875C8.09766 4.6875 6.03125 6.79883 6.03125 9.35938V10.8867C6.03125 13.043 5.40234 15.1094 4.23438 16.9062H17.8457C16.6777 15.1094 16.0938 13.043 16.0938 10.8867V9.35938C16.0938 6.79883 13.9824 4.6875 11.4219 4.6875H10.7031ZM13.9375 20.5C13.9375 21.2637 13.623 22.0273 13.084 22.5664C12.5449 23.1055 11.7812 23.375 11.0625 23.375C10.2988 23.375 9.53516 23.1055 8.99609 22.5664C8.45703 22.0273 8.1875 21.2637 8.1875 20.5H13.9375Z" fill="#C4C7CC"/>
</Svg>
            </View>
            <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: wide * 0.08, color: 'black' }}>Notifications</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => props.navigation.navigate("EditProfileScreen")} style={{ flexDirection: 'row', alignItems: 'center', marginTop: wide * 0.1 }}>
          <View style={{backgroundColor:Colors.mainColor,width:33,height:33,marginLeft: wide * 0.05,borderRadius:35/2,justifyContent:'center',alignItems:'center'}}>
          <MaterialCommunityIcons style={{marginLeft:wide*0.005}} name="account-edit-outline" size={20} color="#fff" />
            </View>
            <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: wide * 0.03, color: 'black' }}>Edit Profile</Text>
          </TouchableOpacity> */}

<View style={{ borderColor: 'rgba(70, 70, 70, 0.2)', borderTopWidth: 1, marginTop: wide * 0.1, marginHorizontal: wide * 0.05 }}></View>

          <TouchableOpacity onPress={() => logoutUser()} style={{ flexDirection: 'row', alignItems: 'center', marginTop: wide * 0.1 ,justifyContent:'center'}}>
          <View style={{ marginLeft:-wide*0.05,justifyContent:'center',alignItems:'center'}}>
          <Svg
      width={23}
      height={23}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.795 9.674l-5.906-5.906a.695.695 0 00-.944 0 .695.695 0 000 .943l4.8 4.758H7.218a.675.675 0 00-.657.656c0 .37.288.656.657.656h11.525l-4.799 4.8a.695.695 0 000 .942.695.695 0 00.944 0l5.906-5.906a.68.68 0 00.205-.492.658.658 0 00-.205-.451zM7.219 18H3.28a1.944 1.944 0 01-1.969-1.969V4.22a1.97 1.97 0 011.97-1.969h3.937a.675.675 0 00.656-.656c0-.328-.328-.657-.656-.657H3.28A3.265 3.265 0 000 4.22V16.03c0 1.846 1.436 3.282 3.281 3.282H7.22a.675.675 0 00.656-.657c0-.328-.328-.656-.656-.656z"
        fill="rgba(231, 65, 51, 1)"
      />
    </Svg>
            </View>
            <Text style={{ fontSize: 15, fontWeight: '800', marginLeft: wide * 0.03, color: 'rgba(231, 65, 51, 1)' }}>Logout</Text>
          </TouchableOpacity>


        </View>
      </DrawerContentScrollView>
      <Text style={{ color: 'rgba(34, 34, 34, 1)', fontWeight: '900', fontSize: 12, marginLeft: wide * 0.05, marginBottom: wide * 0.02 }}>App Version - V{version}</Text>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default function Drawer() {
  return (

    <Draw.Navigator drawerS screenOptions={{
      headerShown: false, drawerStyle: {
        backgroundColor: '#c6cbef',
        width: wide * 0.77,
      },
    }} initialRouteName="HomeStack" drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Draw.Screen name="HomeStack" component={HomeStack} />

    </Draw.Navigator>


  );
}