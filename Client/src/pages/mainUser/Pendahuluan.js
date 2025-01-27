import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image, TextInput, BackHandler, Alert  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BackIcon, DotAksi,CloseIcont, EmailIcon, LgBappeda, PasswordIcon } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';
import ReactNativeModal from 'react-native-modal'
import { Circle } from 'react-native-animated-spinkit';

const Pendahuluan = ({navigation}) => {
    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    
    // date time tanggal
    const cekTgl = new Date
    const localeTime = cekTgl.toLocaleTimeString()
    
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
    const getStrDay = namaHari[cekTgl.getDay()]
    const getDay = cekTgl.getDate()

    const [monthUsed, setMonthUsed] = useState(cekTgl.getMonth()+1)
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "November", "Desember"]
    const getStrMonth = namaBulan[monthUsed]

    const getYear = cekTgl.getFullYear()

    const [myError, setMyError] = useState([])    
    const base_url =ApiLink+"/api";

    // const [profile, setProfile] = useState({
    //     latarBelakang:'-',
    //     maksudTujuan:'-',
    //     ruangLingkup:[],
    //     id:0
    // })

    const [myModal, setMyModal] = useState({
        success:false,
        
    })

    const [arrRuangLingkup, setArrRuangLingkup] = useState([])
    const [latarBelakangUser, setLatarBelakangUser] = useState()
    const [maksudTujuanUser, setMaksudTujuanUser] = useState()

    const [updatedData, setUpdatedData] = useState(false)
    const [modalUpdateData, setmodalUpdateData] = useState(false)
    // console.log(modalUpdateData, "<<<<<< modal data")

    const isFocused = useIsFocused();

    useEffect(() => {
        

        if (isFocused) {
            getMyProfile()

            const onBackPress = () => {
                
                // if(updatedData==true){
                //     setmodalUpdateData(true)
                // }
                return (updatedData==true?setmodalUpdateData(true):console.log("haiiiii"))
                
              };
          
              BackHandler.addEventListener(
                'hardwareBackPress', onBackPress
              );
          
              return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress', onBackPress
                );
        }
        

    }, [navigation, isFocused])
    

    const getMyProfile = async data =>{


        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    


            const response = await axios.get(`${base_url}/user/profile`,{headers:{
                Authorization: `Bearer ${myToken}`
            }})

            if (response.status === 200) {

                // setProfile({
                //     latarBelakang:response.data.latar_belakang,
                //     maksudTujuan:response.data.tujuan,
                //     id:response.data.id
                // })      

                // ------------- latar belakang
                if(response.data.latar_belakang){
                    setLatarBelakangUser(response.data.latar_belakang)
                }
                var cekLatar = await AsyncStorage.getItem("LatarBelakang")
                if(!cekLatar){
                    let tmpLatar = response.data.latar_belakang
                    await AsyncStorage.setItem("LatarBelakang", tmpLatar)
                }else{
                    setLatarBelakangUser(cekLatar)
                }

                // ----------- maksud tujuan

                if(response.data.tujuan){
                    setMaksudTujuanUser(response.data.tujuan)
                }
                
                var cekMaksudTujuan = await AsyncStorage.getItem("MaksudTujuan")
                if(!cekMaksudTujuan){
                    let tmpMaksudTujuan = response.data.tujuan
                    await AsyncStorage.setItem("MaksudTujuan", tmpMaksudTujuan)
                }else{
                    setMaksudTujuanUser(cekMaksudTujuan)
                }


                // ----------- latar belakang
                if (response.data.ruang_lingkup) {
                    setArrRuangLingkup(JSON.parse(response.data.ruang_lingkup))
                }

                var checkTmpRL = await AsyncStorage.getItem('tmpRuangLingkup')

                if (!checkTmpRL) {

                    let tmp = JSON.parse(response.data.ruang_lingkup).join("%ry%")
                    await AsyncStorage.setItem('tmpRuangLingkup',tmp)

                } else{

                    setArrRuangLingkup(checkTmpRL.split("%ry%"))
                }

            }        


        } catch (error) {
            console.log(error, "error get my profile")   
        }
    }    


    // const handlerChange = (key, value) => {
    //     setProfile(prevState => ({
    //         ...prevState, 
    //         [key]:value
    //     }))
    // };
    const [modalLoad, setModalLoad] = useState(false)
    const handlerUpdate = async data=>{
        setModalLoad(true)
        setMyError([])
        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    
            var checkTmpRL = await AsyncStorage.getItem('tmpRuangLingkup')
            var checkTmpLatarBelakang = await AsyncStorage.getItem("LatarBelakang")
            var checkTmpMaksudTujuan = await AsyncStorage.getItem("MaksudTujuan")

            var paramsRL =''
            var paramsLatarBelakang =''
            var paramsMaksudTujuan =''

            if (checkTmpRL) {

                paramsRL =JSON.stringify(checkTmpRL.split("%ry%"))
            }


            const params ={
                latar_belakang: latarBelakangUser,
                tujuan: maksudTujuanUser,
                ruang_lingkup: paramsRL
            }

            const response = await axios.post(base_url+"/user/update",params,{headers:{
                Authorization: `Bearer ${myToken}`
            }})

            if (response.data.error) {

                const tmpArr =[]
                Object.keys(response.data.error).forEach(key => {
                    tmpArr.push(response.data.error[key])
                })
                setModalLoad(false)
                setMyError(tmpArr)

            }else{
                await AsyncStorage.removeItem('tmpRuangLingkup');
                setModalLoad(false)              
                setMyModal({success:true})  
            }

        } catch (error) {
            console.log(error, "error update pendahuluan")   
        }
        
    }
    
    // showcontent
    const [showContent, setShowContent] = useState(0)
    const toggleContent = (e)=>{

        setShowContent(e);
    }

    const rowRuangLingkup =(item, index) =>{

        return(
                <View key={index} style={{width:"100%", minHeight:50, alignItems:"center" }}>
                    <View style={{flexDirection:"row", width:"90%"}}>
                        <View style={{width:"10%", minHeight:20, alignItems:"center", }}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"500", textTransform:"capitalize"}}>
                                {index+1}.
                            </Text>
                        </View>
                        <View style={{width:"80%", minHeight:20, }}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"500", textTransform:"capitalize"}} multiline>{item}</Text>
                        </View>
                        <View style={{width:"10%", minHeight:20, alignItems:"center", }}>
                            {/* <TouchableOpacity onPress={ () => navigation.navigate("EditLingkup", {indexData:index}) } > */}
                            {showContent==index+1?
                                <TouchableOpacity onPress={() => toggleContent(0)}>
                                    <Image source={DotAksi} style={{width:20, height:20}} />
                                </TouchableOpacity>
                            :
                                <TouchableOpacity onPress={() => toggleContent(index+1)}>
                                    <Image source={DotAksi} style={{width:20, height:20}} />
                                </TouchableOpacity>
                            }
                            
                            <View style={showContent==index+1?{width:50, height:50, marginTop:-20, marginLeft:-70, alignItems:"center"}:{display:"none"}}>
                                <TouchableOpacity style={{width:50, height:20, backgroundColor:"#fcc419", borderRadius:10, marginBottom:5, alignItems:"center", justifyContent:"center"}} onPress={ () => navigation.navigate("EditLingkup", {indexData:index}) }>
                                    <Text style={{fontWeight:'700', color:"black", fontSize:10}}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:50, height:20, backgroundColor:"red", borderRadius:10, alignItems:"center", justifyContent:"center"}} onPress={()=>{ deleteItemArr(index)}}>
                                    <Text style={{fontWeight:'700', color:"white", fontSize:10}}>Hapus</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>   
        )
    }

    const customBackNavigation = async data =>{
        await AsyncStorage.removeItem('LatarBelakang');
        await AsyncStorage.removeItem('MaksudTujuan');
        await AsyncStorage.removeItem('tmpRuangLingkup');
        if(updatedData==true){
            setmodalUpdateData(true)
        }else(
            navigation.navigate('MainUser')
        )
                
    }

    const deleteItemArr = async (id)=>{
        toggleContent(0)

        let tmpData = arrRuangLingkup
        tmpData.splice(id,1)
        let saveNew = await AsyncStorage.setItem('tmpRuangLingkup', tmpData.join("(%ry%)"))
        
    }

    const addAsync = async data=> {
        await AsyncStorage.setItem("LatarBelakang", latarBelakangUser)
        await AsyncStorage.setItem("MaksudTujuan", maksudTujuanUser)
        navigation.navigate("TambahLingkup")
    }

    const backPendahuluan = async data => {
        await AsyncStorage.removeItem('LatarBelakang')
        await AsyncStorage.removeItem('MaksudTujuan')
        navigation.navigate("MainUser")
    }
    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={{ width: "60%" }}>
                    <TouchableOpacity onPress={customBackNavigation} style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent:"center" }}>
                            <Image source={BackIcon} style={{ width: 20, height: 20 }}/>
                        </View>
                        <View style={{ justifyContent:"center", marginHorizontal:10 }}>
                            <Image source={LgBappeda} style={styles.lgHead}/>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>PROFILE</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Pendahuluan Laporan</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>
            <View style={{alignItems:"center", marginBottom:30}}>
                <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10, }}>
                    <Text style={{ color: "#000", fontSize: 15, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Update Pendahuluan Laporan</Text>

                    <View style={{marginBottom:25, marginTop:20}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Latar Belakang :</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", minHeight:50, borderBottomWidth:0.5, borderColor:"black",}}>
                                <TextInput
                                        placeholder='-'
                                        placeholderTextColor={"#000"}
                                        value={latarBelakangUser}
                                        keyboardType= "default"
                                        onChangeText={(text) => {setUpdatedData(true),setLatarBelakangUser(text) }}
                                        style={{ color: "#000" }}
                                        multiline
                                    />
                            </View>
                        </View>
                    </View>

                    <View style={{marginBottom:25}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Maksud dan Tujuan :</Text>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:"90%", minHeight:50, borderBottomWidth:0.5, borderColor:"black",}}>
                                <TextInput
                                        placeholder='-'
                                        placeholderTextColor={"#000"}
                                        value={maksudTujuanUser}
                                        keyboardType= "default"
                                        onChangeText={(text) => {setUpdatedData(true), setMaksudTujuanUser(text)}}
                                        style={{ color: "#000" }}
                                        multiline
                                    />
                            </View>
                        </View>
                    </View>

                    <View style={{marginBottom:25}}>
                        
                        <View style={{flexDirection:"row", marginBottom:10, marginLeft:15, alignItems:"center", marginBottom:15 }}>
                            <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15}}>Ruang Lingkup :</Text>
                            <TouchableOpacity style={{width:70, height:20, backgroundColor:"#0060cb", alignItems:"center", justifyContent:"center", borderRadius:15, marginLeft:10, marginTop:-5}} onPress={addAsync}>
                                <Text style={{fontWeight:'700', color:"white", fontSize:12}}>Tambah</Text>
                            </TouchableOpacity>                            
                        </View>
                        {
                            arrRuangLingkup.length > 0 &&
                            arrRuangLingkup.map((item, index)=>(
                              rowRuangLingkup(item, index)
                            ))
                        }

                        <View style={{alignItems:'center'}} >
                        {
                        myError.length > 0 &&
                        myError.map((item,index)=>(
                            <View style={{marginTop:20, display:"flex"}}>
                            <Text style={{color:"red", fontSize:14, fontWeight:"bold", textTransform:"capitalize"}}>{item}</Text>
                            </View>
                        ))                            
                        }                            
                        </View>
                    </View>
                    
                </View>


                <ReactNativeModal isVisible={myModal.success} onBackdropPress={backPendahuluan}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                        <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                            <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={backPendahuluan}>
                                <Image source={CloseIcont} style={{width:30, height:30}}/>
                            </TouchableOpacity>
                            <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Selamat ! Data Berhasil Diupdate.</Text>
                            </View>
                            <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                                <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={backPendahuluan}>
                                    <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ok</Text>                                        
                                </TouchableOpacity>      
                            </View>
                        </View>
                </ReactNativeModal>  

                <ReactNativeModal isVisible={modalUpdateData} onBackdropPress={()=>setmodalUpdateData(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                        <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={()=>setmodalUpdateData(false)}>
                            <Image source={CloseIcont} style={{width:30, height:30}}/>
                        </TouchableOpacity>
                        <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                            <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Harap Simpan Perubahan Anda</Text>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"center", marginTop:20}}>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={()=> navigation.goBack()}>
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tidak</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#39a339", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={()=>setmodalUpdateData(false)}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Ya</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ReactNativeModal>  

                <View style={{width:WindowWidth,marginBottom:15, padding:10, alignItems:"center" }}>
                    <TouchableOpacity style={{flexDirection:"row", marginBottom:25, width:"95%", minHeight:50, backgroundColor:"#39a339", borderRadius:15, elevation:10, alignItems:"center", justifyContent:"center"}} onPress={handlerUpdate}>
                        <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:16, marginTop:5}}>Update</Text>
                    </TouchableOpacity>
                </View>

                <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <Circle size={100} color="white"/>
                </ReactNativeModal>
                
            </View>
        </ScrollView>
    )
}

export default Pendahuluan

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#39a339",
        height: 65,
        padding: 10,
        marginBottom: 30,
        flexDirection: 'row'
    },
    lgHead: {
        height: 45,
        width: 45
    },
})