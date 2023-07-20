import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { BgMain, LgBappeda } from '../../../assets/images'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MainSplash = ({navigation}) => {
    useEffect(()=>{

        setTimeout(() => {            
            checkAccess()
        },3000)
    },[navigation])

    const checkAccess = async ()=>{

        let myToken =await AsyncStorage.getItem('AccessToken');        
        
        if (myToken != null) {

            navigation.replace('AppScreen')
            
        }else{
            navigation.replace('LoginSide')

        }
    }
    return (
        <ImageBackground source={BgMain} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Image source={LgBappeda} style={{width:250, height:250}}/>
        </ImageBackground>
    )
}

export default MainSplash

const styles = StyleSheet.create({})