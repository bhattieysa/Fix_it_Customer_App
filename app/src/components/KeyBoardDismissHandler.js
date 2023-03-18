import React from 'react'
import { Pressable, Keyboard } from 'react-native';


const KeyBoardDismissHandler = ({ action = () => { }, ...props }) => <Pressable activeOpacity={1} style={{ flex: 1, backgroundColor:'#ffffff' }}
    onPress={() => { Keyboard.dismiss(); action() }}>
    {props.children}
</Pressable>

export default KeyBoardDismissHandler