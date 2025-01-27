import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { AddImg, AddImgUser, BackIcon, CloseIcont, EmailIcon, EmailUser, ExFoto, ExSakit, ExTtd, EyeClose, EyeOpen2, JabatanUser, LgBappeda, PasFoto, PasswordIcon } from '../../assets/images';
import ReactNativeModal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiLink from '../../assets/ApiHelper/ApiLink';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { Circle } from 'react-native-animated-spinkit';


const DetailAsn = ({route, navigation}) => {

    const {idUser} = route.params

    // width heigh
    const WindowWidth = Dimensions.get('window').width;
    const WindowHeight = Dimensions.get('window').height;

    // input
    const [detail, setDetail] = useState("Saya mengalami sakit diare, sehingga disarankan dokter untuk beristirahat selama tiga hari")

    // date time tanggal
    const cekTgl = new Date
    const localeTime = cekTgl.toLocaleTimeString()
    
    const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
    const getStrDay = namaHari[cekTgl.getDay()]
    const getDay = cekTgl.getDate()

    const [monthUsed, setMonthUsed] = useState(cekTgl.getMonth()+1)
    const namaBulan = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September","Oktober", "November", "Desember"]
    const getStrMonth = namaBulan[monthUsed]

    const getYear = cekTgl.getFullYear()

    // modal
    const [modalLoad, setModalLoad] = useState(false)    
    const [modalSuccess, setModalSuccess] = useState(false)
    const [modalChangePass, setModalChangePass] = useState(false)

    const [showContent, setShowContent] = useState(1)
    const toggleContent = (e)=>{
        setShowContent(e);
    }

    // showEye
    const [showEye, setShowEye] = useState(1)
    const toggleEye = (e)=>{
        setShowEye(e);
    }
    const base_url =ApiLink+"/api";
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getProfile()
        }
    }, [navigation, isFocused])    


    // profile
    const [myProfile, setMyProfile] = useState({
        nama:null,
        jabatan:null,
        fotoProfile: null,
        ttd:null,
        email:null,
    })

    const [formProfile, setFormProfile] = useState({
        nama:null,
        jabatan:null,
        email:null,
    })

    const getProfile = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    

            const target_url = `${base_url}/user/profile?id=${idUser}`

            await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }}).then((res)=>{     

                setMyProfile({
                    nama:res.data.nama,
                    jabatan:res.data.jabatan,
                    fotoProfile: res.data.URL,
                    ttd:res.data.ttd,
                    email:res.data.email,                    
                })

                setFormProfile({
                    nama:res.data.nama,
                    jabatan:res.data.jabatan,
                    email:res.data.email,                    
                })
            }) 
            

        } catch (error) {
            console.log(error, "error get profile")   
        }
    }        

    // password
    const [formPassword, setFormPassword] = useState({
        old:null,
        new:null,
        confirm:null
    })

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

            }else{

            }
        }
    } 

    const imgFileFoto = {uri: imgFoto}

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

            const response = await axios.post(base_url+`/user/foto?id=${idUser}`, formData,{headers:{
                Authorization: `Bearer ${myToken}`,
                Accept: 'application/json',
                'Content-Type': `multipart/form-data`
            }})            

            
            if (response.status==200) {
                setModalLoad(false)
                setModalSuccess(true)
            }

        } catch(error){
            console.log(error.response.data, "<= eroro")
        }
    }     


    const handlerChangeData = (key, value) => {

        setMyProfile( prevState => ({
            ...prevState, 
            [key]:value
        }))
    };

    const handlerUpdateProfile = async ()=>{

        setModalLoad(true)

        try{

            let formData = {
                email: formProfile.email,
                name: formProfile.nama,
                jabatan: formProfile.jabatan
            }

            const myToken = await AsyncStorage.getItem('AccessToken');    

            const response = await axios.post(base_url+`/user/updateAccount/${idUser}`, formData,{headers:{
                Authorization: `Bearer ${myToken}`,
                Accept: 'application/json',
            }})            

        
            if (response.status===201) {
                setModalLoad(false)
                setModalSuccess(true)
            }


            console.log(response.data)
        } catch(error){
            console.log(error.response.data, "<= error update profile")
        }
    }     

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
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>DETAIL ASN</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Detail Data ASN</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <SearchBar placeholder="Type Here..." /> */}
                </View>
                <View style={{ width: "35%", alignItems: 'flex-end', justifyContent:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}}>{getStrDay}, {getDay} {getStrMonth} {getYear}</Text>
                </View>
            </View>
            <View style={{alignItems:"center", marginBottom:30}}>
                <View style={{width:WindowWidth*0.9, minHeight:WindowHeight*0.3, backgroundColor:"white", borderRadius:15, elevation:5, marginBottom:15, padding:10 }}>


                    <Text style={{ color: "#000", fontSize: 18, marginTop: -5, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Detail Data ASN</Text>

                    <View style={{alignItems:"center"}}>
                        <View style={{flexDirection:"row", marginBottom:15}}>
                            <View style={{width:"35%", minHeight:25, justifyContent:"center", marginRight:10}}>
                                <Image source={myProfile.fotoProfile ? {uri:myProfile.fotoProfile}:PasFoto} style={{width:"100%", height:190}}/>
                            </View>
                            
                            <View style={{width:"55%", minHeight:25, marginVertical:20}}>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Nama :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{myProfile.nama}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Jabatan :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{myProfile.jabatan}</Text>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Email :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{myProfile.email}</Text>
                                </View>
                                <View>
                                    <Text style={{color:"#000", fontSize:12, fontWeight:"900"}}>Password :</Text>
                                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>******</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{marginTop:15}}>
                        <Text style={{color:"#000", fontSize:12, fontWeight:"900", marginBottom:10, marginLeft:15, alignSelf:'center'}}>Update Data ASN </Text>


                        <View style={{flexDirection:"row", marginBottom:20, justifyContent:"center"}}>
                            <TouchableOpacity style={showContent===1? {backgroundColor:"#39a339", width:130, height:35, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"} : {backgroundColor:"#d9dcdf", width:130, height:35, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center", }} onPress={() => toggleContent(1)}>
                                <Text style={showContent===1?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Profile</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={showContent===2?{backgroundColor:"#0060cb", width:130, height:35, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}:{backgroundColor:"#d9dcdf", width:130, height:35, borderRadius:15, elevation:5, margin:10, alignItems:"center", justifyContent:"center"}} onPress={() => toggleContent(2)}>
                                <Text style={showContent===2?{ color: "#fff", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"700"}:{ color: "#000", fontSize: 15, fontFamily: "Spartan", textShadowColor: '#000',textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, fontWeight:"500"}}>Password</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={showContent===1 ? {display:"flex"} : {display:"none"}}>

                            <View style={{width:"100%", minHeight:WindowHeight*0.3, marginBottom:15, padding:10}}>
                                <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:5, marginBottom:5, marginLeft:5}}>Foto Profile</Text>

                                <View style={{width:"100%", alignItems:"center"}}>
                                    <View style={{marginTop:10, alignItems:"center"}}>
                                        {imgFoto ? <Image source={imgFileFoto} style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>:<Image source={AddImg} style={{width:100, height:100, borderRadius:50,}} resizeMode='cover'/>}
                                        
                                        <TouchableOpacity style={{alignItems:"center", justifyContent:"center", height:30, width:110, marginTop:5, flexDirection:"row"}} onPress={selectImageFoto}>
                                            <Image source={AddImgUser} style={{width:25, height:25, marginTop:-3}}/>
                                            
                                            <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:0, marginBottom:5, marginLeft:5}}>Add File</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{width:"100%", alignItems:"center", marginBottom:10}}>
                                    <TouchableOpacity style={{width:"50%", height:30, backgroundColor:"#39a339", borderRadius:15, marginTop:10, alignItems:"center", justifyContent:"center"}} onPress={handlerUpdateFoto} >
                                        <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Update Foto</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View style={{width:"100%", minHeight:WindowHeight*0.3,  marginBottom:15, padding:10}}>

                                <Text style={{ color: "#000", fontSize: 13, fontFamily: "Spartan", fontWeight: "900", marginTop:5, marginBottom:5, marginLeft:5}}>Data Pengguna</Text>

                                <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                    <View style={{justifyContent:"center"}}>
                                        <Image source={EmailIcon} style={{width:35, height:35}} />
                                    </View>
                                    
                                    <View style={{marginLeft:8, justifyContent:"center"}}>
                                        <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900"}}>Nama</Text>
                                        <TextInput
                                            placeholder='-'
                                            placeholderTextColor={"#000"}
                                            value={formProfile.nama}
                                            onChangeText={(text) => setFormProfile({...formProfile, ['nama']:text})}
                                            style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, marginTop:-15 }}
                                            textContentType={'name'}
                                            // multiline
                                        />
                                    </View>

                                </View>

                                <View style={{marginBottom:25, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                    <View style={{justifyContent:"center"}}>
                                        <Image source={JabatanUser} style={{width:35, height:35}} />
                                    </View>

                                    <View style={{marginLeft:8, justifyContent:"center"}}>
                                        <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900"}}>Jabatan</Text>
                                        <TextInput
                                            placeholder='-'
                                            placeholderTextColor={"#000"}
                                            value={formProfile.jabatan}
                                            onChangeText={(text) => setFormProfile({...formProfile, ['jabatan']:text})}
                                            style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, marginTop:-15 }}
                                            textContentType={'name'}
                                            // multiline
                                        />
                                    </View>
                                </View>

                                <View style={{marginBottom:10, flexDirection:"row",marginTop:15, marginLeft:15}}>
                                    <View style={{justifyContent:"center"}}>
                                        <Image source={EmailUser} style={{width:35, height:35}} />
                                    </View>

                                    <View style={{marginLeft:8, justifyContent:"center"}}>
                                        <Text style={{color:"#b5b5b5", fontSize:10, fontWeight:"900"}}>Email</Text>
                                        <TextInput
                                            placeholder='-'
                                            placeholderTextColor={"#000"}
                                            value={formProfile.email}
                                            onChangeText={(text) => setFormProfile({...formProfile, ['email']:text})}
                                            style={{ color: "#000", borderBottomColor: "#000",borderBottomWidth: 1, borderStyle:"dashed", marginLeft:-3, paddingBottom:0, width:238, marginTop:-15 }}
                                            textContentType={'name'}
                                            // multiline
                                        />
                                    </View>
                                </View>

                                <View style={{width:"100%", alignItems:"center", marginTop:20}}>
                                    <TouchableOpacity style={{width:WindowWidth*0.6, minHeight:30, backgroundColor:"#39a339", borderRadius:15, elevation:5, marginBottom:15, padding:10, alignItems:"center", justifyContent:"center"}} onPress={handlerUpdateProfile}>
                                        <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:16}}>Update Profile</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>

                        <View style={showContent===2 ? {display:"flex"} : {display:"none"}}>
                            <View style={{width:"100%", minHeight:WindowHeight*0.3, marginBottom:15, padding:10}}>
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
        
                                {/* setModalPass */}
                                <View style={{alignItems:"center"}}>
                                        <TouchableOpacity style={{width:WindowWidth*0.6, minHeight:30, backgroundColor:"#0060cb", borderRadius:15, elevation:5, marginBottom:15, padding:10, alignItems:"center", justifyContent:"center"}} onPress={() => setModalChangePass(true)}>
                                            <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:16}}>Update Password</Text>
                                        </TouchableOpacity>                                    
                                </View>
                            </View>                                                    
                        </View>
                    </View>                    
                </View>
            </View>
            {/* modal loading */}
            <ReactNativeModal isVisible={modalLoad} style={{ alignItems: 'center', justifyContent:"center"  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                    <Circle size={100} color="white"/>
            </ReactNativeModal>  

            {/*  modal success */}
            <ReactNativeModal isVisible={modalSuccess} onBackdropPress={() => setModalSuccess(false)}  style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, alignItems:"center", justifyContent:"center" }}>

                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15}}>Selamat ! Data Berhasil Diupdate.</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <TouchableOpacity style= {{width:"80%", height:40, backgroundColor:"#39a339", alignItems:"center", justifyContent:"center", borderRadius:10} } onPress={() => navigation.goBack() }>
                            <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", fontSize:15}}>Ok</Text>                                        
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


        </ScrollView>
    )
}

export default DetailAsn

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