import { View, FlatList, Text, Button, BackHandler, KeyboardAvoidingView, ScrollView, TextInput, SafeAreaView, StatusBar, Modal, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import Layout from '../constants/Dimensions';

const BottomNavigation = ({ navigation,checked }) => {



    let wide = Layout.width;
    let high = Layout.height;
  return (
    <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
    <View

      style={{ width: wide * 1.1, height:Platform.OS === "ios"? wide * 0.185:wide*0.13, backgroundColor: Colors.main }}
    >
      <View style={{ flexDirection: 'row', justifyContent:'space-evenly' ,marginTop:wide*0.01}}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={{ justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>

            <Icon name="home" size={28} color={checked!='Home'?'#ffffff':'#000000'} />
            <Text style={{ color: checked!='Home'?'#ffffff':'#000000', fontSize: 13, fontWeight: '400',  }}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChatStack")} style={{ justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>

            <Icon name="chat" size={28} color={checked!='Chat'?'#ffffff':'#000000'} />
            <Text style={{color: checked!='Chat'?'#ffffff':'#000000', fontSize: 13, fontWeight: '400',  }}>Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ServicesStack")} style={{ justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>

            <Icon name="tools" size={28} color={checked!='Services'?'#ffffff':'#000000'} />
            <Text style={{ color: checked!='Services'?'#ffffff':'#000000', fontSize: 13, fontWeight: '400',  }}>Services</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PaymentStack")} style={{ justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center',  }}>

            <Icon name="bank" size={28} color={checked!='Payment'?'#ffffff':'#000000'}/>
            <Text style={{ color: checked!='Payment'?'#ffffff':'#000000', fontSize: 13, fontWeight: '400', }}>Payment</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileStack")} style={{ justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center',  }}>

            <Icon name="account-box" size={28} color={checked!='Profile'?'#ffffff':'#000000'} />
            <Text style={{ color: checked!='Profile'?'#ffffff':'#000000', fontSize: 13, fontWeight: '400', }}>Profile</Text>
          </View>
        </TouchableOpacity>
  




      </View>
    </View>
  </View>
  )
}

export default BottomNavigation