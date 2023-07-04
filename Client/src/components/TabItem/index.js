import { StyleSheet, Text, View, TouchableOpacity, Image  } from 'react-native'
import React from 'react'
import { AcountAct, AcountIcont, HomeAct, HomeIcont, LgBappeda } from '../../assets/images'

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
    const IcontItem = () =>{
        const Homee = () => {
            return (
                <View style={{alignItems:"center"}}>
                    <Image source={HomeIcont} style={{width: 25, height: 25}}/>
                </View>
            )
        }
        const HomeAC = () => {
            return (
                <View style={{alignItems:"center"}}>
                    <Image source={HomeAct} style={{width: 25, height: 25}}/>
                </View>
            )
        }
        const Acountt = () => {
            return (
                <View style={{alignItems:"center"}}>
                    <Image source={AcountIcont} style={{width: 25, height: 25}}/>
                </View>
            )
        }
        const AcountAc = () => {
            return (
                <View style={{alignItems:"center"}}>
                    <Image source={AcountAct} style={{width: 25, height: 25}}/>
                </View>
            )
        }

        if(label === "HomeScreen") return isFocused ? <HomeAC/> : <Homee/>
        if(label === " "){
            return  (
                <View style={styles.homeImg}>
                    <Image source={LgBappeda} style={styles.img}/>
                </View>
                
            );
        }
        if(label === "AcountScreen") return isFocused ? <AcountAc/> : <Acountt/>
    }

    
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1}}>

            <IcontItem />
            {/* <Text style={{ color: isFocused ? '#1B99C3' : '#222', textAlign: 'center',  fontSize: 8  }}>{label}</Text> */}
            

        </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
    homeImg:{
        // position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img:{
        height:100,
        width:100,
        marginTop: -55,
    }
})