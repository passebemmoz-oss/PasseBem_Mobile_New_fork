import React, {useEffect, useState} from "react";
import { View, Text, SafeAreaView, FlatList, ScrollView, Dimensions , TouchableOpacity, Image,} from "react-native";
import { MaterialIcons,  } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import {  useIsFocused} from "@react-navigation/native";
import { Video, AVPlaybackStatus } from 'expo-av';
import SwiperPUb from "../components/SwiperPUb";

import api from '../services/api';

const {width, height} = Dimensions.get("screen");


const CursoScreen = ({navigation}) => {

    const isFocused = useIsFocused();

    const video = React.useRef(null);

    const [modulos, setModuos] = useState([])
    const [videos, setVideos] = useState([])
    const [publicidade, setPublicidades] = useState(null)

    useEffect(() => {
      if(isFocused){
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      }

      setTimeout(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      }, 500)
      
      api.get('/appmodulos')
            .then(res => { 
                setModuos(res.data.data.modulos)
                setVideos(res.data.data.videosaulas)
            })
            .catch(err => console.error(err))

    }, [isFocused])
    

    

    return(
        <SafeAreaView
        style={{flex:1, backgroundColor:"#f0f4fd"}}
        >
            
            <ScrollView
            showsVerticalScrollIndicator={false}
            >

                <View>

                    <SwiperPUb pub={publicidade} margin ={false}/>

                    <TouchableOpacity disabled={true} style={{marginTop:height*0.016,alignSelf:"center", borderRadius:5,
                        backgroundColor:"#ffa000",width:width*0.9, height:height*0.047, justifyContent:"center", alignItems:"center"}}>
                        <Text style={{fontWeight:"700", color:"#fff"}}> Sua próxima habilidade a partir de 2000.00MT</Text>
                    </TouchableOpacity>
                </View>

                {modulos.map((modulo) => (


                    <View key={modulo._id}>
                        <View style={{alignSelf:"center",marginTop:height*0.03,width:width*0.9, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                            <Text style={{fontWeight:"700", fontSize:17}}>{modulo.nome.slice(0,width*0.09)}...</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("PlayerList", {modulo, videos})}>
                                <MaterialIcons name="keyboard-tab" size={24} color="#607d8b" />
                            </TouchableOpacity>
                            
                        </View>

                        <FlatList
                            style={{ marginLeft:width*0.05,marginTop:height*0.01}}
                            data={videos}
                            renderItem={({item, index})=>(
                                <>
                                    {
                                        item.modulo_id == modulo._id ?(
                                            <TouchableOpacity onPress={() => navigation.navigate("VideoPlayer", {item})} key={item._id} style={{height:height*0.23,width:width*0.43,borderRadius:5,  marginRight:width*0.03}}>
                                                
                                                <Video
                                                    ref={video}
                                                    style={{height:height*0.14, width:width*0.43,resizeMode:"cover", borderRadius:5,}}
                                                    source={{
                                                        uri: item.video_url,
                                                    }}
                                                    useNativeControls
                                                    resizeMode="contain"
                                                    shouldPlay={false}
                                                    isPlaying={false}
                                                    isMuted={true}
                                              
                                                />
                                                <Text style={{fontSize:13, fontWeight:"700", color:"#5d636d"}}>{item.titulo}</Text>
                                                <Text style={{fontSize:10, color:"#3e4452"}}>Prof: Julios Tinga</Text>
                                            </TouchableOpacity>
                                        ):<></>
                                    }
                                </>
                            )}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                ))}
                
                <View>
                    <Image style={{width:width*0.6, height:height*0.15, resizeMode:"contain", alignSelf:"center"}} source={require("../img/aula.png")}/>
                </View>

                
            </ScrollView>
        </SafeAreaView>
    )
}
export default CursoScreen;