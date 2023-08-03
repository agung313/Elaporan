import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image, TextInput  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AddImgUser, BackIcon, CloseIcont, EmailIcon, EmailUser, ExFoto, ExTtd, JabatanUser, LgBappeda, PasswordIcon } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { useIsFocused } from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker'

const PassUsr = ({navigation}) => {
    const isFocused = useIsFocused();
    useEffect(()=>{

        if (isFocused) {
            getMyProfile()        
        }
        
    },[navigation, isFocused])

    const [password, setPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // input
    const [detail, setDetail] = useState()

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

    // my data
    const [namaUser, setNamaUser] = useState('')
    const [jabatanUser, setJabatanUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const base_url =ApiLink+"/api";
    const getMyProfile = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${base_url}/user/profile`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        
            console.log(response.data, "<==== my profile")
            if (response.status == 200) {
                setNamaUser(response.data.nama)
                setJabatanUser(response.data.jabatan)
                setEmailUser(response.data.email)
            }

        } catch (error) {
            console.log(error, "error get my profile")   
        }
    }

    const handlerUpdateFoto = async data=>{
        
    }
    // showcontent
    const [showContent, setShowContent] = useState(1)
    console.log(showContent, "<====== showwwww")
    const toggleContent = (e)=>{
        setShowContent(e);
    }

    // modal
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    // select image foto profile
    const [fileFoto, setFileFoto] = useState()
    const [imgFoto, setImgFoto] = useState()

    const selectImageFoto = async () => {
        try{

            const doc =  await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
            })

            setFileFoto(doc)
            setImgFoto(doc.uri)

        }catch(err){
            if(DocumentPicker.isCancel(e)){
                console.log(e, "<---- user canceled file")
            }else{
                console.log(err)
            }
        }
    } 

    const imgFileFoto = {uri: imgFoto}

    // select image foto ttd
    const [fileTtd, setFileTtd] = useState()
    const [imgTtd, setImgTtd] = useState()

    const selectImageTtd = async () => {
        try{

            const doc =  await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
            })

            setFileTtd(doc)
            setImgTtd(doc.uri)

        }catch(err){
            if(DocumentPicker.isCancel(e)){
                console.log(e, "<---- user canceled file")
            }else{
                console.log(err)
            }
        }
    } 

    const imgFileTtd = {uri: imgTtd}

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={{ width: "60%" }}>
                    <TouchableOpacity onPress={()=> navigation.goBack()} style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent:"center" }}>
                            <Image source={BackIcon} style={{ width: 20, height: 20 }}/>
                        </View>
                        <View style={{ justifyContent:"center", marginHorizontal:10 }}>
                            <Image source={LgBappeda} style={styles.lgHead}/>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>PROFILE</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Profile Pengguna</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>
            <View style={{marginBottom:50}}>
                <View style={{alignItems:"center", }}>
                    <View style={{flexDirection:"row", marginBottom:20}}>
                        <TouchableOpacity style={showContent===1? {backgroundColor:"#39a339", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"} : {backgroundColor:"#d9dcdf", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center", }} onPress={() => toggleContent(1)}>
                            <Text style={showContent===1?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={showContent===2?{backgroundColor:"#0060cb", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}:{backgroundColor:"#d9dcdf", width:150, height:40, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}} onPress={() => toggleContent(2)}>
                            <Text style={showContent===2?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Password</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={showContent===1 ? {display:"flex"} : {display:"none"}}>

                        <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10}}>
                            <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:5, marginBottom:5, marginLeft:5}}>Foto Profile</Text>

                            <View style={{width:"100%", alignItems:"center"}}>
                                <View style={{marginTop:10, alignItems:"center"}}>
                                    {imgFoto ? <Image source={imgFileFoto} style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>:<Image source={ExFoto} style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>}
                                    
                                    <TouchableOpacity style={{alignItems:"center", justifyContent:"center", height:30, width:110, marginTop:5, flexDirection:"row"}} onPress={selectImageFoto}>
                                        <Image source={AddImgUser} style={{width:25, height:25, marginTop:-3}}/>
                                        
                                        <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:5, marginLeft:5}}>Add File</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{width:"100%", alignItems:"center", marginBottom:10}}>
                                <TouchableOpacity style={{width:"50%", height:30, backgroundColor:"#39a339", borderRadius:15, marginTop:10, alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Update Foto</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10}}>
                            <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:5, marginBottom:5, marginLeft:5}}>File Tanda Tangan</Text>

                            <View style={{width:"100%", flexDirection:"row"}}>
                                <View style={{marginTop:10, alignItems:"center", marginRight:10}}>

                                    {imgTtd ? <Image source={imgFileTtd} style={{width:100, height:100, borderRadius:5,}} resizeMode='cover'/>:<Image source={ExFoto} style={{width:100, height:100, borderRadius:5,}} resizeMode='cover'/>}

                                    <TouchableOpacity style={{alignItems:"center", justifyContent:"center", height:30, width:110, marginTop:5, flexDirection:"row"}} onPress={selectImageTtd}>
                                        <Image source={AddImgUser} style={{width:25, height:25, marginTop:-3}}/>
                                        
                                        <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:5, marginLeft:5}}>Add File</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop:10, width:"60%"}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"600", textTransform:"capitalize", marginBottom:10}}>1. File Tanda tangan dalam bentuk image (png, jpg, jpeg)</Text>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"600", textTransform:"capitalize", marginBottom:5}}>2. background tanda tangan putih atau tanpa background</Text>

                                    <TouchableOpacity style={{width:140, height:23, backgroundColor:"#0060cb", marginTop:5, borderRadius:15, alignItems:"center", justifyContent:"center"}} onPress={toggleModal}>
                                        <Text style={{ color: "#fff", fontSize: 12, fontFamily: "Spartan", fontWeight: "900", marginTop:0}}>Contoh Tanda Tangan</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{width:"100%", alignItems:"center", marginBottom:10}}>
                                <TouchableOpacity style={{width:"50%", height:30, backgroundColor:"#39a339", borderRadius:15, marginTop:10, alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Update Tanda Tangan</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10}}>

                            <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:5, marginBottom:5, marginLeft:5}}>Data Pengguna</Text>

                            <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={EmailIcon} style={{width:35, height:35}} />
                                </View>
                                
                                <View style={{marginLeft:8, justifyContent:"center"}}>
                                    <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900"}}>Nama</Text>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"600", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", paddingBottom:0, width:238,}}>{namaUser}</Text>
                                </View>

                            </View>

                            <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={JabatanUser} style={{width:35, height:35}} />
                                </View>

                                <View style={{marginLeft:8, justifyContent:"center"}}>
                                    <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900"}}>Jabatan</Text>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"600", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", paddingBottom:0, width:238,}}>{jabatanUser}</Text>
                                </View>
                            </View>

                            <View style={{marginBottom:10, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={EmailUser} style={{width:35, height:35}} />
                                </View>

                                <View style={{marginLeft:8, justifyContent:"center"}}>
                                    <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900"}}>Email</Text>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"600", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", paddingBottom:0, width:238,}}>{emailUser}</Text>
                                </View>
                            </View>

                            <View style={{width:"100%", alignItems:"center"}}>
                                <View style={{width:"75%"}}>
                                    <Text style={{ color: "#b5b5b5", fontSize: 11, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:5, textAlign:"center"}}>Note : Harap menghubungi admin untuk merubah nama, jabatan, dan email anda.</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={showContent===2 ? {display:"flex"} : {display:"none"}}>
                        <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10}}>
                            <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:5, marginBottom:5, marginLeft:5}}>Update Password</Text>

                            <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={PasswordIcon} style={{width:35, height:35}} />
                                </View>
                                <View style={{marginLeft:8, justifyContent:"center"}}>
                                    <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900", marginBottom:-15}}>Password Lama</Text>
                                    {/* <Text style={{color:"#000", fontSize:12, fontWeight:"600"}}>Muhammad Agung Sholihhudin, S.T</Text> */}
                                    <TextInput
                                        placeholder='*******'
                                        placeholderTextColor={"#000"}
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                        style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                        textContentType={'password'}
                                        secureTextEntry
                                        // multiline
                                    />
                                </View>
                            </View>
                            
                            <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={PasswordIcon} style={{width:35, height:35}} />
                                </View>
                                <View style={{marginLeft:8, justifyContent:"center"}}>
                                    <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900", marginBottom:-15}}>New Password</Text>
                                    {/* <Text style={{color:"#000", fontSize:12, fontWeight:"600"}}>Muhammad Agung Sholihhudin, S.T</Text> */}
                                    <TextInput
                                        placeholder='*******'
                                        placeholderTextColor={"#000"}
                                        value={newPassword}
                                        onChangeText={(text) => setNewPassword(text)}
                                        style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                        textContentType={'password'}
                                        secureTextEntry
                                        // multiline
                                    />
                                </View>
                            </View>

                            <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={PasswordIcon} style={{width:35, height:35}} />
                                </View>
                                <View style={{marginLeft:8, justifyContent:"center"}}>
                                    <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900", marginBottom:-15}}>Confirm New Password</Text>
                                    {/* <Text style={{color:"#000", fontSize:12, fontWeight:"600"}}>Muhammad Agung Sholihhudin, S.T</Text> */}
                                    <TextInput
                                        placeholder='*******'
                                        placeholderTextColor={"#000"}
                                        value={confirmPassword}
                                        onChangeText={(text) => setConfirmPassword(text)}
                                        style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                        textContentType={'password'}
                                        secureTextEntry
                                        // multiline
                                    />
                                </View>
                            </View>
    
                            

                            <View style={{alignItems:"center"}}>
                                <TouchableOpacity style={{width:WindowWidth*0.6, minHeight:30, backgroundColor:"#0060cb", borderRadius:15, elevation:5, marginBottom:15, padding:10, alignItems:"center", justifyContent:"center"}}>
                                    <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:16}}>Update Password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        
                    </View>
                </View>
                
            </View>

            {/* modal exTTD */}
            <ReactNativeModal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "30%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={toggleModal}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>

                    <View style={{width:"100%", marginTop:-20, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Contoh Tanda Tangan</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25, justifyContent:"center"}}>
                        <Image source={ExTtd} style={{width:100, height:100}}/>      
                    </View>
                </View>
            </ReactNativeModal>

        </ScrollView>
    )
}

export default PassUsr

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