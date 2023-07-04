import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { BgMain, LgBappeda } from '../../../assets/images'

const MainSplash = ({navigation}) => {
    useEffect(()=>{
        setTimeout(() => {
            navigation.replace('AppScreen')
        },3000)
    },[navigation])

    return (
        <ImageBackground source={BgMain} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Image source={LgBappeda} style={{width:250, height:250}}/>
        </ImageBackground>
    )
}

export default MainSplash

const styles = StyleSheet.create({})