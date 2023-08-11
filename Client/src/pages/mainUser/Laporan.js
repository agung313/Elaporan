import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BackIcon, LgBappeda, DotAksi, CloseIcont } from '../../assets/images';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import ApiLink from '../../assets/ApiHelper/ApiLink';
import ReactNativeModal from 'react-native-modal';
import Pdf from 'react-native-pdf'
import { Grid  } from 'react-native-animated-spinkit'

const Laporan = ({route, navigation}) => {

    const {bulan, tahun} = route.params

    const [cekBulan, setCekBulan] = useState(bulan)

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

    const base_url =ApiLink+"/api";
    const isFocused = useIsFocused();
    const [arrKegiatan, setArrKegiatan] = useState([])
    const [arrKendala, setArrKendala] = useState([])
    const [adaDokumen, setAdaDokumen] = useState()
    
    const [idDeleted, setIdDeleted] = useState()
    const [myModal, setMyModal] = useState({
        hapus:false,
        sukses:false,
        gagal:false
    })

    const handlerModal = (type, message=null)=>{


        switch (type) {
            case 'hapus':
                setMyModal({...myModal, hapus:true})
                break;
        
        }
    }
    // show aksi
    const [showContent, setShowContent] = useState(0)
    const toggleContent = (e)=>{

        setShowContent(e);
    }

    useEffect(() => {

        if (isFocused) {
            myLaporan()
        }

    }, [navigation, isFocused])
    
    const myLaporan = async data =>{

        try {
            const myToken = await AsyncStorage.getItem('AccessToken');    


            const target_url = `${base_url}/document?tahun=${tahun}&bulan=${bulan}`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }})

            if (response.status === 200) {

                if (response.data.length > 0) {
                    setAdaDokumen(response.data[0].URL)
                    
                }else{

                    setAdaDokumen(false)
                    getMyKegiatan()
                }

                var checkKendala = await AsyncStorage.getItem('tmpKendala')
                // if (!checkKendala && arrKendala.length == 0) {
                if (!checkKendala) {
                    console.log('tidak ada ')

                    await AsyncStorage.setItem('tmpKendala','')

                    if (adaDokumen) {
                        let tmpArr = JSON.parse(response.data[0].kendala)
                        setArrKendala(tmpArr)
                        await AsyncStorage.setItem('tmpKendala',JSON.stringify(tmpArr))
                    }

                // }else if (!checkKendala && arrKendala.length > 0) {

                //     await AsyncStorage.setItem('tmpRuangLingkup',JSON.parse(response.data.ruang_lingkup).join("%ry%"))                    
                }else{

                    if (checkKendala.includes('(%ry%)')) {
                        setArrKendala(checkKendala.split("(%ry%)"))                        
                    } else {
                        
                        setArrKendala(JSON.parse(checkKendala))
                    }

                }                    


            }        


        } catch (error) {
            console.log(error, "error get my profile")   
        }
    }        
    const getMyKegiatan = async data =>{

        try {

            const myToken = await AsyncStorage.getItem('AccessToken');    
            const target_url = `${base_url}/laporan?bulanan=true&bulan=${bulan}`

            const response = await axios.get(target_url,{headers:{
                Authorization: `Bearer ${myToken}`
            }});        

            if (response.status == 200) {
                setArrKegiatan(response.data)
            }

        } catch (error) {
            console.log(error, "error get my kegiatan")   
        }
    }       
   

    const rowKegiatan = (item,index)=>{

        return(
            <View style={{flexDirection:"row", backgroundColor:"#FFF"}}>
                <View style={{width:"7%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{index+1}</Text>
                </View>
                <View style={{width:"20%", minHeight:25, justifyContent:'center', borderWidth:0.5, borderColor:"#000", alignItems:'center'}}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{item.hari}</Text>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"500"}}>{item.tanggal}</Text>                    
                </View>
                <View style={{width:"33%", minHeight:25, borderWidth:0.5, borderColor:"#000", padding:8 }}>
                    {
                        item.kegiatan.length > 0 &&
                            item.kegiatan.map((item2, index2)=>(
                                <View style={{flexDirection:'row'}}>
                                    <View>
                                        <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}>{index2+1}.</Text>
                                    </View>
                                    <View>
                                        <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}>{item2.judul_kegiatan}</Text>
                                    </View>
                                </View>
                            ))                        
                    }
                    {
                        item.kegiatan.length == 0 &&
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}> -</Text>
                        </View>
                    }
                </View>
                <View style={{width:"40%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", paddingVertical:5, }}>
                <View style={{flexDirection:'row', paddingLeft:3, flexDirection:'column' }}>
                    {
                        item.kegiatan.map((item2, index2)=>(
                            <View style={{flexDirection:'row'}}>
                                <View>
                                    <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}>{index2+1}.</Text>
                                </View>
                                <View>
                                    <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}>{item2.uraian_kegiatan}</Text>
                                </View>
                            </View>
                        ))                        
                    }
                    {
                        item.kegiatan.length == 0 &&
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:"#000", marginBottom:5, fontSize:10, fontWeight:"500"}}> -</Text>
                        </View>
                    }                    
                    </View>
                </View>                
            </View>    
        )
    
    }

    const rowKendala = (item, index)=>{
        let tmpStr = item.split("(^*^)")

        return(
            <View style={{flexDirection:"row", }}>
                <View style={{width:"8%", minHeight:52, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>{index+1}</Text>
                </View>
                <View style={{width:"41%", minHeight:52, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, }}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>{tmpStr[0]}</Text>
                </View>
                <View style={{width:"41%", minHeight:52, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, }}>
                    <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>{tmpStr[1]}</Text>
                </View>
                <View style={{width:"10%", minHeight:52, justifyContent:"center", borderWidth:0.5, borderColor:"#000",  alignItems:"center"}}>
                        {/* <TouchableOpacity onPress={ () => navigation.navigate("EditKendala", {indexData:index}) } style={{ flexDirection: 'row' }}>
                            <Image source={DotAksi} style={{width:20, height:20, marginLeft:7}} />
                        </TouchableOpacity> */}
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
                                <TouchableOpacity style={{width:50, height:20, backgroundColor:"#fcc419", borderRadius:10, marginBottom:5, alignItems:"center", justifyContent:"center"}} onPress={ () => navigation.navigate("EditKendala", {indexData:index}) }>
                                    <Text style={{fontWeight:'700', color:"black", fontSize:10}}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:50, height:20, backgroundColor:"red", borderRadius:10, alignItems:"center", justifyContent:"center"}} onPress={()=>{ setIdDeleted(index),handlerModal('hapus')}}>
                                    <Text style={{fontWeight:'700', color:"white", fontSize:10}}>Hapus</Text>
                                </TouchableOpacity>
                            </View>                        
                </View> 
                               
                
            </View>            
        )
    }

    const tabelKegiatan = data =>{

        return(
            <View>
                <View style={{flexDirection:"row", backgroundColor:"#d9dcdf"}}>
                    <View style={{width:"7%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>#</Text>
                    </View>
                    <View style={{width:"20%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Hari/Tanggal</Text>
                    </View>
                    <View style={{width:"33%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Jenis Kegiatan</Text>
                    </View>
                    <View style={{width:"40%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                        <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Uraian</Text>
                    </View>
                </View>
                <ScrollView style={{maxHeight:WindowHeight*0.3}}>
                    <FlatList
                        data={arrKegiatan}
                        renderItem={({ item,index }) => (
                            rowKegiatan(item,index)
                        )}
                    />                            
                </ScrollView>
            </View>            
        )
    }
    const handlerDeleteKendala = async data =>{

        toggleContent(0)
        let tmpData = arrKendala
        tmpData.splice(idDeleted,1)
        let saveNew = await AsyncStorage.setItem('tmpKendala', tmpData.join("(%ry%)"))
        setMyModal({...myModal,['hapus']:false})
    }
    const handlerDraft = async data =>{

        // setModalLoad(true)
        try {

            const myToken = await AsyncStorage.getItem('AccessToken');    
            const params ={
                kendala:JSON.stringify(arrKendala),
                tahun:tahun,
                bulan:bulan,
                status:'draft'
            }
            const response = await axios.post(base_url+"/document/store",params,{headers:{
                Authorization: `Bearer ${myToken}`
            }}).then((res)=>{

            })

        } catch (error) {
            console.log(error,"<--- error handler draft")            
        }
    }
    const customBack = async () =>{
        await AsyncStorage.removeItem('tmpKendala');
        
        navigation.navigate('MainUser');
    }
    const loadSpinner = () =>{
        return (
            <View style={{ alignItems:"center", justifyContent:"center" }}>
                <Grid size={50} color="#008080"/>
                <Text style={{ color:"#000", fontFamily:"Spartan", marginTop:10, fontSize:11, fontWeight:"bold" }}>Loading File......</Text>
            </View>
        )
    }
    // download
    const [modalDownoad, setModalDownoad] = useState(false)
    const DownloadLaporan = () =>{
        setModalDownoad(true)
    }
    // laporkan
    const [modalLaporkan, setModalLaporkan] = useState(false)

    const Laporkan = () => {
        setModalLaporkan(true)
    }


    const readLaporan = () =>{

        return(
            <View style={{ flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 5}}>

                        <Pdf
                            trustAllCerts={false}
                            source={{uri:adaDokumen}}
                            style={{ width: 300,
                                height: 300, flex:1}}
                            renderActivityIndicator={loadSpinner}
                        />
                        <TouchableOpacity style={{backgroundColor:'rgba(235,233,230,0.5)', width:300, position:'absolute', height:'100%', justifyContent:'center', alignItems:'center', opacity:0.9 }}>
                            <Text style={{color:'#000',backgroundColor:'#d8db2a', width:120, padding:6, textAlign:'center',borderRadius:10, fontWeight:'900'}}>Baca Laporan</Text>
                        </TouchableOpacity>
            </View >            
        )
    }
    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={{ width: "60%" }}>
                    <TouchableOpacity onPress={customBack} style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent:"center" }}>
                            <Image source={BackIcon} style={{ width: 20, height: 20 }}/>
                        </View>
                        <View style={{ justifyContent:"center", marginHorizontal:10 }}>
                            <Image source={LgBappeda} style={styles.lgHead}/>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1, }}>PROFILE</Text>
                            <Text style={{ color: "#fff", fontSize: 12, marginTop: -5, fontFamily: "Spartan", textShadowColor: '#000', textShadowOffset: { width: 0.5, height: 0.5 }, textShadowRadius: 1,}}>Laporan Bulanan</Text>
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

                    <View style={{width:"100%", flexDirection:"row", justifyContent:"center", marginTop:10}}>
                        <TouchableOpacity style={{width:100, height:30, borderRadius:10, backgroundColor:"#39a339", marginBottom:15, alignItems:"center", justifyContent:"center", }} onPress={DownloadLaporan}>
                            <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Download</Text>
                        </TouchableOpacity>
                        <View style={{width:10}}></View>
                        <TouchableOpacity style={{width:100, height:30, borderRadius:10, backgroundColor:"#0060cb", marginBottom:15, alignItems:"center", justifyContent:"center"}} onPress={Laporkan}>
                            <Text style={{ fontWeight:'900', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Laporkan</Text>
                        </TouchableOpacity>
                        <View style={{width:10}}></View>
                        <TouchableOpacity style={{width:100, height:30, borderRadius:10, backgroundColor:"#d9dcdf", marginBottom:15, alignItems:"center", justifyContent:"center"}} onPress={handlerDraft}>
                            <Text style={{ fontWeight:'900', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:14}}>Draft</Text>
                        </TouchableOpacity>                        
                    </View>

                    <View style={{width:"100%", alignItems:"center"}}>
                        <View style={{width:"100%"}}>
                            <Text style={{ color: "#000", fontSize: 15, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, textAlign:"center"}}>Berikut Kegiatan Anda Pada Bulan {namaBulan[cekBulan]}</Text>
                        </View>
                    </View>

                    <View style={{width:"100%",marginBottom:15}}>
                    {
                        adaDokumen == null ? tabelKegiatan(): readLaporan()
                            
                    }

                    </View>
                    
                    <View style={{marginTop:10}} >
                        <View style={{flexDirection:'row', display:'flex',  justifyContent:'space-between'}}>
                            <Text style={{ color: "#000", fontSize: 15, fontFamily: "Spartan", fontWeight: "900", marginTop:10, marginBottom:25, }}> Kendala & Solusi</Text>

                            <TouchableOpacity style={{width:100, height:30, borderRadius:10, backgroundColor:"#fcc419", marginTop:6, alignItems:"center", justifyContent:"center"}} onPress={()=> navigation.navigate('TambahKendala', {bulan:bulan, tahun:tahun})} >
                            <Text style={{ fontWeight:'900', color:"black", fontSize:14}}>Tambah</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection:"row", backgroundColor:"#d9dcdf"}}>
                        <View style={{width:"8%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                            <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>#</Text>
                        </View>
                        <View style={{width:"41%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                            <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Kendala</Text>
                        </View>
                        <View style={{width:"41%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                            <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Solusi</Text>
                        </View>
                        <View style={{width:"10%", minHeight:25, justifyContent:"center", borderWidth:0.5, borderColor:"#000", padding:5, alignItems:"center"}}>
                            <Text style={{color:"#000", fontSize:10, fontWeight:"900"}}>Aksi</Text>
                        </View>                        
                    </View>
                    {
                        arrKendala.length > 0 &&
                        arrKendala.map((item,index)=>(
                            rowKendala(item, index)
                        ))

                    }

                </View>
            </View>

            {/* modal alert pass */}
            <ReactNativeModal isVisible={myModal.hapus} onBackdropPress={()=>{  setMyModal({hapus:false}) }}   style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={()=>{  setMyModal({hapus:false}) }}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Lanjut Hapus Data ?</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={()=>{  setMyModal({hapus:false}) }} >
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Batal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#e82a39", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={handlerDeleteKendala} >
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}} >Ya</Text>
                            </TouchableOpacity>
                        </View>     
                    </View>
                </View>
            </ReactNativeModal>  

            {/* modal alert laporkan */}
            <ReactNativeModal isVisible={modalLaporkan} onBackdropPress={()=> setModalLaporkan(false)}   style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={()=> setModalLaporkan(false)}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Laporkan laporan bulanan anda ?</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={()=> setModalLaporkan(false)} >
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Batal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#0060cb", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={()=> setModalLaporkan(false)} >
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}} >Ya</Text>
                            </TouchableOpacity>
                        </View>     
                    </View>
                </View>
            </ReactNativeModal>  

            {/* modal alert download */}
            <ReactNativeModal isVisible={modalDownoad} onBackdropPress={()=> setModalDownoad(false)}   style={{ alignItems: 'center',  }} animationOutTiming={1000} animationInTiming={500} animationIn="zoomIn">
                <View style={{ width: "90%", height: "25%", backgroundColor: "#fff", borderRadius: 10,  padding:10, justifyContent:"center" }}>

                    <TouchableOpacity  style={{alignItems:'flex-end'}} onPress={()=> setModalDownoad(false)}>
                        <Image source={CloseIcont} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <View style={{width:"100%", marginTop:10, alignItems:"center"}}>
                        <Text style={{fontWeight:'700', color:"black", textShadowColor:"#000", fontSize:15, textTransform:"capitalize"}}>Downoad laporan bulan {namaBulan[cekBulan]} ?</Text>
                    </View>
                    <View style={{width:"100%", alignItems:"center",  marginTop:25,}}>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#d9dcdf", borderRadius:10, justifyContent:"center", alignItems:"center", marginRight:15}} onPress={()=> setModalDownoad(false)} >
                                <Text style={{fontWeight:'700', color:"black", textShadowColor:"#fff", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}}>Batal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:120, height:40, backgroundColor:"#39a339", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={()=> setModalDownoad(false)} >
                                <Text style={{fontWeight:'700', color:"white", textShadowColor:"#000", textShadowOffset: {width: -1, height: 1}, textShadowRadius: 5, fontSize:15}} >Ya</Text>
                            </TouchableOpacity>
                        </View>     
                    </View>
                </View>
            </ReactNativeModal>  

        </ScrollView>
    )
}

export default Laporan

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