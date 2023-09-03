import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, ImageBackground, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AddImg, AddImgUser, BackIcon, BgApp, CloseIcont, EmailIcon, EmailUser, ExFoto, ExTtd, EyeClose, EyeOpen2, JabatanUser, LaporProfile, LgBappeda, LogOut, NextIcont, PassProfile, PasswordIcon, Pendahuluan, imgFileTtd } from '../../assets/images';
import ReactNativeModal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker'
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { Circle } from 'react-native-animated-spinkit';
import { useIsFocused } from '@react-navigation/native';
import SignatureCapture from 'react-native-signature-capture';

const ProfileKasum = ({navigation}) => {
    
    const isFocused = useIsFocused();
    useEffect(()=>{

        if (isFocused) {
            getMyProfile()
            // getKegiatan()        
        }
        
    },[navigation, isFocused])

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

    // modal
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    

    const base_url =ApiLink+"/api";

    // profilie

    const [myProfile, setMyProfile] = useState({
        nama:null,
        jabatan:null,
        email:null,
        ttd:null
    })

    const [fileFoto, setFileFoto] = useState()
    const [imgFoto, setImgFoto] = useState()

    const [profile, setProfile] = useState()
    const [namaUser, setNamaUser] = useState()
    const [jabatanUser, setJabatanUser] = useState()
    const [emailUser, setEmailUser] = useState()
    const [imgTtd, setImgTtd] = useState()

    const getMyProfile = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.get(`${base_url}/user/profile`,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {

                setMyProfile({
                    nama:response.data.nama,
                    jabatan:response.data.jabatan,
                    foto:response.data.URL,
                    email:response.data.email,
                    ttd:response.data.ttd
                })
            }
        } catch (error) {
            console.log(error, "error get my profile")   
        }
    }
    const imgFileFoto = {uri: imgFoto}

    // select image foto profile
    const handlerUpdateFoto = async ()=>{
        setModalLoad(true)
        try{

            if (!fileFoto) {
                setModalLoad(false)
                setMyModal({fotoNoPick:true})
                return
            }
            var formData = new FormData()

            formData.append('foto',{ uri: fileFoto.uri, name: fileFoto.name, type: fileFoto.type })

            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.post(base_url+"/user/foto", formData,{headers:{
                Authorization: `Bearer ${myToken}`,
                Accept: 'application/json',
                'Content-Type': `multipart/form-data`
            }})            

        
            if (response.status===200) {
                setModalLoad(false)
                setMyModal({success:true})
            }

        } catch(error){
            console.log(error, "<= eroro")
        }
    }

    // logout
    const [modalLogout, setModalLogout] = useState()
    const [modalLoad, setModalLoad] = useState()

    const HeandleLogout = async () => {
        setModalLoad(true)
        try {
            const dataToken = await AsyncStorage.getItem('AccessToken');
      
            if (!dataToken) {
              // Token tidak ditemukan, mungkin pengguna belum login atau sudah logout sebelumnya
              navigation.replace('MainSplash');
              return;
            }
            const token_fb = await AsyncStorage.getItem('tokenDeviceFB')
  
            // Kirim permintaan logout dengan header otorisasi, {} bertujuan untuk mengecek logout sudah berhasil atau belum, jika sudah hapus token
            const response = await axios.post(ApiLink+'/api/auth/logout',{token_fb:token_fb},{
                headers: {
                  Authorization: `Bearer ${dataToken}`,
                },
              }
            );
        
            if (response.status === 200) {
              // Berhasil logout, hapus token dari AsyncStorage dan arahkan ke halaman login atau splash screen
              await AsyncStorage.removeItem('AccessToken');
              navigation.replace('MainSplash');
            } else {
              // Tangani respons yang tidak diharapkan jika diperlukan
              console.log('Logout tidak berhasil.');
            }
        } catch (error) {
          // Tangani error yang terjadi saat melakukan permintaan logout
          console.log(error.response, '<= error logout');
        }
    };

    // showcontent
    const [showContent, setShowContent] = useState(1)
    const toggleContent = (e)=>{
        setShowContent(e);
    }

    // selectimage
    const selectImageFoto = async () => {
        try{

            const doc =  await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
            })

            setFileFoto(doc)
            setImgFoto(doc.uri)


        }catch(err){
            if(DocumentPicker.isCancel(e)){

            }else{

            }
        }
    }

        // siganture ttd
    const [modalSignature, setModalSignature] = useState(false)
    const signatureRef = useRef();

    const handleSave = () => {
        if (signatureRef.current) {
        signatureRef.current.saveImage();
        setModalSignature(false)
        setModalLoad(true)
        }
    };

    const [ttdBerhasil, setTtdBerhasil] = useState(false)
    const onSaveEvent = async(result) => {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name

        try {
            
            const params ={
                ttd:result.encoded
            }

        const myToken = await AsyncStorage.getItem('AccessToken');    

        const response = await axios.post(base_url+"/user/ttd", params,{headers:{
            Authorization: `Bearer ${myToken}`,
            Accept: 'application/json',
            'Content-Type': `multipart/form-data`
        }})            

        if (response.status===200) {
            setModalLoad(false)
            setTtdBerhasil(true)
            getMyProfile()
        }        
    } catch (error) {
        console.log(error.result)       
    }
        

    }
    const onDragEvent = () => {
         // This callback will be called when the user enters signature
        console.log("dragged");
    }

    const handleClear = () => {
        if (signatureRef.current) {
        signatureRef.current.resetImage();
        }
    };

    // password
    const [formPassword, setFormPassword] = useState({
        old:null,
        new:null,
        confirm:null
    })

    
    // showEye
    const [showEye, setShowEye] = useState(1)
    const toggleEye = (e)=>{
        setShowEye(e);
    }

    const [errPass, setErrPass] = useState(false)
    const [modalPass, setModalPass] = useState(false)
    const [modalChangePass, setModalChangePass] = useState(false)

    const handlerUpdatePassword = async data =>{
        setModalChangePass(false)
        setModalLoad(true) 

        if(formPassword.old == null){
            setModalLoad(false)
            setModalPass(true)
        }
        else{
            try {

                const myToken = await AsyncStorage.getItem('AccessToken');    
                const params ={
                    password: formPassword.old,
                    newPassword: formPassword.new,
                    confirm_newPassword: formPassword.confirm
                }
    
                const target_url = base_url+`/user/changePassword`
    
                const res1 = await axios.post(target_url,params,{headers:{
                    Authorization: `Bearer ${myToken}`
                }})

                setModalLoad(false)
                
                if (!res1.data.error) {

                    const response = await axios.post(ApiLink+'/api/auth/logout',{},{
                        headers: {
                          Authorization: `Bearer ${myToken}`,
                        },
                      }
                    );
                
                    if (response.status === 200) {
                      // Berhasil logout, hapus token dari AsyncStorage dan arahkan ke halaman login atau splash screen
                      await AsyncStorage.removeItem('AccessToken');
                      navigation.replace('MainSplash');
                    } else {
                      // Tangani respons yang tidak diharapkan jika diperlukan
                      console.log('Logout tidak berhasil.');
                    }

                } else {
                    setErrPass(true)   
                }


    
            } catch (error) {
                setModalLoad(false)
                setErrPass(true)
                console.log(error,"<--- error handler update")            
            }
        }
        
    }    

    return (
        <ScrollView>
            <ImageBackground source={BgApp} style={{width:WindowWidth, height:265}}>
                <View style={styles.header}>
                    <View style={{ width: "60%" }}>
                        <TouchableOpacity onPress={()=> navigation.goBack()} style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent:"center" }}>
                                <Image source={BackIcon} style={{ width: 20, height: 20 }}/>
                            </View>
                            <View style={{ justifyContent:"center", marginHorizontal:10 }}>
                                <Image source={LgBappeda} style={styles.lgHead}/>
                            </View>
                            <View style={{justifyContent:"center"}}>
                                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>PROFILE</Text>
                                {/* <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Kehadiran</Text> */}
                            </View>
                        </TouchableOpacity>
                        {/* <SearchBar placeholder="Type Here..." /> */}
                    </View>
                    <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                        {/* <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text> */}

                        <TouchableOpacity style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}} onPress={()=> setModalLogout(true)}>
                            <Image source={LogOut} style={{width:20, height:20}}/>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700", marginLeft:5}}>LogOut</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems:"center", width:WindowWidth, height:200, }}>
                    <View style={{alignItems:"center", marginTop:20}}>
                        {myProfile.foto == null ? <Image source={ imgFileFoto } style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>:<Image source={{uri:myProfile.foto}} style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>}
                        
                        <View style={{ alignItems:"center", marginTop:15}}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:16}}>{myProfile.nama}</Text>
                            <Text style={{ fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:13, marginTop:5}}>Jabatan : {myProfile.jabatan}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            <View style={{marginTop:20, width:WindowWidth, alignItems:"center", marginBottom:50}}>
                <View style={{width:"90%", minHeight:100, alignItems:"center",}}>

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
                                    {myProfile.foto ? <Image source={{uri:myProfile.foto}} style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>:<Image source={AddImg} style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>}
                                    
                                    <TouchableOpacity style={{alignItems:"center", justifyContent:"center", height:30, width:110, marginTop:5, flexDirection:"row"}} onPress={selectImageFoto}>
                                        <Image source={AddImgUser} style={{width:25, height:25, marginTop:-3}}/>
                                        
                                        <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:5, marginLeft:5}}>Add File</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{width:"100%", alignItems:"center", marginBottom:10}}>
                                <TouchableOpacity style={{width:"50%", height:30, backgroundColor:"#39a339", borderRadius:15, marginTop:10, alignItems:"center", justifyContent:"center"}} onPress={handlerUpdateFoto}>
                                    <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Update Foto</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10}}>
                            <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:5, marginBottom:5, marginLeft:5}}>File Tanda Tangan</Text>

                            <View style={{width:"100%", alignItems:"center", marginTop:20}}>{imgTtd ? <Image source={imgFileTtd} style={{width:100, height:100 }} resizeMode='cover'/>:
                                <Image source={myProfile.ttd ? {uri:myProfile.ttd}: ExTtd} style={{width:100, height:100}}/>}
                            </View>

                            <View style={{width:"100%", alignItems:"center", marginBottom:10}}>
                                {/* <TouchableOpacity style={{width:"50%", height:30, backgroundColor:"#39a339", borderRadius:15, marginTop:10, alignItems:"center", justifyContent:"center"}} onPress={handlerUpdateTtd}> */}
                                <TouchableOpacity style={{width:"50%", height:30, backgroundColor:"#39a339", borderRadius:15, marginTop:10, alignItems:"center", justifyContent:"center"}} onPress={()=> setModalSignature(true)}>
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
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"600", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", paddingBottom:0, width:238,}}>{myProfile.nama}</Text>
                                </View>

                            </View>

                            <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={JabatanUser} style={{width:35, height:35}} />
                                </View>

                                <View style={{marginLeft:8, justifyContent:"center"}}>
                                    <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900"}}>Jabatan</Text>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"600", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", paddingBottom:0, width:238,}}>{myProfile.jabatan}</Text>
                                </View>
                            </View>

                            <View style={{marginBottom:10, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={EmailUser} style={{width:35, height:35}} />
                                </View>

                                <View style={{marginLeft:8, justifyContent:"center"}}>
                                    <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900"}}>Email</Text>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"600", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", paddingBottom:0, width:238,}}>{myProfile.email}</Text>
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
                            <View style={{flexDirection:"row", alignItems:"center"}}>
                                <View>
                                    <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:5, marginBottom:5, marginLeft:5}}>Update Password</Text>
                                    <Text style={{color: "#b5b5b5", fontSize: 11, fontFamily: "Spartan", fontWeight: "900", marginBottom:5,textTransform:"capitalize", marginLeft:5}}>note : gunakan minimal 6 karakter password</Text>
                                </View>

                                {showEye==1 ?
                                    <TouchableOpacity style={{marginLeft:"auto", justifyContent:"center", marginRight:10, padding:5}} onPress={()=>toggleEye(2)}>
                                        <Image source={EyeClose} style={{width:30, height:30}}/>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity style={{marginLeft:"auto", justifyContent:"center", marginRight:10, backgroundColor:"#39a339", padding:5, borderRadius:10}} onPress={()=>toggleEye(1)}>
                                        <Image source={EyeOpen2} style={{width:30, height:30}}/>
                                    </TouchableOpacity>
                                }
                                
                            </View>
                            

                            <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={PasswordIcon} style={{width:35, height:35}} />
                                </View>
                                <View style={{marginLeft:8, justifyContent:"center"}}>
                                    <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900", marginBottom:-15}}>Password Lama</Text>
                                    {/* <Text style={{color:"#000", fontSize:12, fontWeight:"600"}}>Muhammad Agung Sholihhudin, S.T</Text> */}
                                    {showEye==1 ?
                                        <TextInput
                                        placeholder='-'
                                        placeholderTextColor={"#000"}
                                        value={formPassword.old}
                                        onChangeText={(text) => setFormPassword({...formPassword, ['old']:text})}
                                        style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                        textContentType={'password'}
                                        secureTextEntry={true}
                                        // multiline
                                        />
                                    :
                                        <TextInput
                                            placeholder='-'
                                            placeholderTextColor={"#000"}
                                            value={formPassword.old}
                                            onChangeText={(text) => setFormPassword({...formPassword, ['old']:text})}
                                            style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                            textContentType={'password'}
                                            secureTextEntry={false}
                                            // multiline
                                        />
                                    }
                                </View>
                            </View>
                            
                            <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={PasswordIcon} style={{width:35, height:35}} />
                                </View>
                                <View style={{marginLeft:8, justifyContent:"center"}}>
                                    <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900", marginBottom:-15}}>New Password</Text>
                                    {/* <Text style={{color:"#000", fontSize:12, fontWeight:"600"}}>Muhammad Agung Sholihhudin, S.T</Text> */}
                                    {showEye==1 ?
                                        <TextInput
                                        placeholder='-'
                                        placeholderTextColor={"#000"}
                                        value={formPassword.new}
                                        onChangeText={(text) => setFormPassword({...formPassword, ['new']:text}) }
                                        style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                        textContentType={'password'}
                                        secureTextEntry={true}
                                        // multiline
                                        />
                                    :
                                        <TextInput
                                            placeholder='-'
                                            placeholderTextColor={"#000"}
                                            value={formPassword.new}
                                            onChangeText={(text) => setFormPassword({...formPassword, ['new']:text}) }
                                            style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                            textContentType={'password'}
                                            secureTextEntry={false}
                                            // multiline
                                        />
                                    }
                                </View>
                            </View>

                            <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                <View style={{justifyContent:"center"}}>
                                    <Image source={PasswordIcon} style={{width:35, height:35}} />
                                </View>
                                <View style={{marginLeft:8, justifyContent:"center"}}>
                                    <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900", marginBottom:-15}}>Confirm New Password</Text>
                                    {/* <Text style={{color:"#000", fontSize:12, fontWeight:"600"}}>Muhammad Agung Sholihhudin, S.T</Text> */}
                                    {showEye==1 ? 
                                        <TextInput
                                        placeholder='-'
                                        placeholderTextColor={"#000"}
                                        value={formPassword.confirm}
                                        onChangeText={(text) => setFormPassword({...formPassword, ['confirm']:text})}
                                        style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                        textContentType={'password'}
                                        secureTextEntry={true}
                                        // multiline
                                        />
                                    :
                                        <TextInput
                                            placeholder='-'
                                            placeholderTextColor={"#000"}
                                            value={formPassword.confirm}
                                            onChangeText={(text) => setFormPassword({...formPassword, ['confirm']:text})}
                                            style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, }}
                                            textContentType={'password'}
                                            secureTextEntry={false}
                                            // multiline
                                        />
                                    }
                                </View>
                            </View>

                            <View style={errPass==false? {display:"none"}:{width:"100%", alignItems:"center", marginBottom:20}}>
                                <View style={{width:280, alignItems:"center",}}>
                                    <Text style={{color:"red", fontSize:12, fontWeight:"bold", textTransform:"capitalize", textAlign:"center"}}>Password lama anda salah atau</Text>
                                    <Text style={{color:"red", fontSize:12, fontWeight:"bold", textTransform:"capitalize", textAlign:"center"}}>new password dan confirm password tidak sama</Text>
                                    
                                </View>
                            </View>
    
                            {/* setModalPass */}

                            <View style={{alignItems:"center"}}>
                                {formPassword.old ==null || formPassword.new == null || formPassword.confirm == null ?
                                    <TouchableOpacity style={{width:WindowWidth*0.6, minHeight:30, backgroundColor:"#0060cb", borderRadius:15, elevation:5, marginBottom:15, padding:10, alignItems:"center", justifyContent:"center"}} onPress={() => setModalPass(true)}>
                                        <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:16}}>Update Password</Text>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity style={{width:WindowWidth*0.6, minHeight:30, backgroundColor:"#0060cb", borderRadius:15, elevation:5, marginBottom:15, padding:10, alignItems:"center", justifyContent:"center"}} onPress={() => setModalChangePass(true)}>
                                        <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:16}}>Update Password</Text>
                                    </TouchableOpacity>
                                }
                                
                            </View>
                        </View>
                        
                        
                    </View>


                </View>
            </View>

            {/* modal succes */}
            <ReactNativeModal isVisible={modalLogout} onBackdropPress={() => setModalLogout(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModalLogout(false)}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Apakah anda yakin untuk keluar ?</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={() => setModalLogout(false)}>
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tidak</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={HeandleLogout}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Keluar</Text>
                            </TouchableOpacity>
                        </View>     
                    </View>
                </View>
            </ReactNativeModal>

            <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <Circle size={100} color="white"/>
            </ReactNativeModal>

            {/* modal signature */}
            <ReactNativeModal isVisible={modalSignature} onBackdropPress={() => setModalSignature(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "70%", backgroundColor: "#d9dcdf", borderRadius: 10,  padding:10,  }}>
                    <TouchableOpacity  style={{alignItems:'flex-end', marginTop:10}} onPress={() => setModalSignature(false)} >
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%",  alignItems:"center", marginBottom:20, marginTop:-20}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Update Tanda Tangan</Text>
                    </View>

                    <SignatureCapture
                        style={{ width:300, height:300}}
                        ref={signatureRef}
                        // saveImageFileInExtStorage={true}
                        showNativeButtons={false}
                        backgroundColor="#ffffff"
                        onSaveEvent={onSaveEvent}
                        onDragEvent={onDragEvent}
                        // strokeColor="red"
                        minStrokeWidth={13}
                        maxStrokeWidth={13}
                    />
                        
                    
                    <View style={{width:"100%", flexDirection:"row",  justifyContent:"center", marginTop:20 }}>
                        <TouchableOpacity style={{width:"40%", height:40, alignItems:"center", justifyContent:"center", backgroundColor:"#0060cb", borderRadius:10, marginRight:15}} onPress={handleClear}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Clear</Text> 
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:"40%", height:40, alignItems:"center", justifyContent:"center", backgroundColor:"#39a339", borderRadius:10}} onPress={handleSave}>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Simpan</Text> 
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>

            {/* modal alert pass */}
            <ReactNativeModal isVisible={modalChangePass} onBackdropPress={() => setModalChangePass(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModalChangePass(false)}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Apakah anda yakin merubah password ?</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={() => setModalChangePass(false)}>
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Tidak</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={handlerUpdatePassword}>
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Ya</Text>
                            </TouchableOpacity>
                        </View>     
                    </View>
                </View>
            </ReactNativeModal>

            {/* modal Jika password Belum dipilih */}
            <ReactNativeModal isVisible={modalPass} onBackdropPress={() => setModalPass(false)} style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setModalPass(false)} >
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Silakan lengkapi seluruh form yang ada</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={() => setModalPass(false)} >
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ok</Text>                                        
                        </TouchableOpacity>      
                    </View>
                </View>
            </ReactNativeModal>  

            {/* succes ttd */}
            <ReactNativeModal isVisible={ttdBerhasil} onBackdropPress={() => setTtdBerhasil(false)} style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10 }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={() => setTtdBerhasil(false)} >
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textAlign:"center"}}>Tanda Tangan Anda Berhasil Diupdate.</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={() => setTtdBerhasil(false)} >
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ok</Text>                                        
                        </TouchableOpacity>      
                    </View>
                </View>
            </ReactNativeModal>
            
        </ScrollView>
    )
}

export default ProfileKasum

const styles = StyleSheet.create({
    header: {
        // backgroundColor: "#39a339",
        height: 65,
        padding: 10,
        flexDirection: 'row'
    },
    lgHead: {
        height: 45,
        width: 45
    },
})