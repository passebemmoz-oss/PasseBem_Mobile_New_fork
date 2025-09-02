import React ,{useEffect, useMemo, useState}from "react";
import { View, StatusBar,Image, TouchableOpacity, FlatList, ScrollView, Dimensions, SafeAreaView, ActivityIndicator, Platform} from "react-native";
import Svg, { Circle,G } from 'react-native-svg';
import {Text, Divider, LinearProgress } from "react-native-elements";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import api from '../services/api';



const { width, height} = Dimensions.get("screen")

const size = height*0.12;
const strokeWidth =4;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;

const circumference = 2 * Math.PI * radius;



const HisProvaScreen = ({navigation}) => {

    const [type, setType] = useState(false)
    const [provatematica, setProvaTema] = useState([])
    const [provaModular, setModular] = useState([])

    const [loading, setIsloading] = useState(false)

    useEffect(() => {
        setIsloading(true)
        api.get('/provasuser')
            .then(res => {
                setIsloading(false)
                setProvaTema(res.data.response)
                setModular(res.data.modulares)
            })
            .catch(err => 
                // console.error(err)
                setIsloading(false)
                )
    }, [])




    if(loading){
        return(
            Platform.OS == 'web'?
            <View style={{flex:1,backgroundColor:"#fff", justifyContent:"center", alignItems:"center",}}>
                <ActivityIndicator size={'large'}/>
            </View>
            :
            <View style={{flex:1,backgroundColor:"#fff", justifyContent:"center", alignItems:"center",}}>
                <LottieView
                autoPlay={true}
                style={{height:height*0.31}}
                source={require('../img/hisquiz.json')}
                />
            </View>
        )
    }

    

    
    return(
        <SafeAreaView style={{flex:1, backgroundColor:"#f0f4fd"}}>

            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:width*0.05, marginTop:height*0.03}}>
                <TouchableOpacity onPress={() => setType(false)}
                style={{ backgroundColor:type ? "#fff": '#f0f4fd', flexDirection:"row", paddingHorizontal:width*0.03,
                     height:height*0.058, borderRadius:8, width:width*0.447, justifyContent:"center", alignItems:"center"}}
                >
                    <Text style={{fontWeight:"700", color:"#607d8b", fontSize:16, }}>Tematicas</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setType(true)}
                style={{ backgroundColor:!type ? "#fff": '#f0f4fd', flexDirection:"row", paddingHorizontal:width*0.03,
                     height:height*0.058, borderRadius:8, width:width*0.447, justifyContent:"center", alignItems:"center"}}
                >
                    <Text style={{fontWeight:"700", color:"#607d8b", fontSize:16, }}>Modulares</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
            showsVerticalScrollIndicator={false}
                style={{marginHorizontal:width*0.05}}
            >
                {
                    !type? provatematica.map((item, index) =>(
                    
                        <TouchableOpacity key={item._id} onPress={()=> navigation.navigate('HistQuiz', {item})}
                            style={{ backgroundColor:"#fff", paddingHorizontal:width*0.03, paddingVertical:height*0.01,flexDirection:'row',
                                borderRadius:8, width:width*0.9, marginTop:height*0.02, justifyContent:'space-between' }}
                        >
                            <Svg width={size} height={size} style={{position:"relative"}}>
                                <G rotation="-90" origin={center}>
                                    <Circle cx={center} cy={center} r={radius} stroke="#E6E7E8" strokeWidth={strokeWidth}  />

                                    <Circle cx={center} cy={center} r={radius} strokeDasharray={circumference} 
                                    stroke= {item.resultado > 19 ? "#607d8b":'red'} strokeWidth={strokeWidth} strokeDashoffset={circumference - (circumference * item.resultado / item.numero)}  />
                                    <Text style={{position:"absolute", alignSelf:"center", top:height*0.04, color:"#607d8b", fontWeight:"700", fontSize:16}}>{item.resultado} / {item.numero}</Text>
                                </G>
                            </Svg>

                            <View style={{justifyContent:'space-between'}}>
                                <Text style={{fontWeight:"700", color:"#607d8b", fontSize:16, }}>{item.tem_nome?.slice(0,29)}</Text>
                                <Text style={{fontWeight:"700", color:"#ffa000", fontSize:14, }}>Avaliação {item.tipo}</Text>
                                <Text style={{fontWeight:"700", color:"#607d8b", fontSize:12, }}>{item.data}</Text>
                            </View>
                            
                        </TouchableOpacity>

                    )):provaModular.map((item, index) =>(
                    
                        <TouchableOpacity key={item._id} onPress={()=> navigation.navigate('HisQuizModular', {item})}
                            style={{ backgroundColor:"#fff", paddingHorizontal:width*0.03, paddingVertical:height*0.01,flexDirection:'row',
                                borderRadius:8, width:width*0.9, marginTop:height*0.02, justifyContent:'space-between' }}
                        >
                            <Svg width={size} height={size} style={{position:"relative"}}>
                                <G rotation="-90" origin={center}>
                                    <Circle cx={center} cy={center} r={radius} stroke="#E6E7E8" strokeWidth={strokeWidth}  />

                                    <Circle cx={center} cy={center} r={radius} strokeDasharray={circumference} 
                                    stroke="#607d8b" strokeWidth={strokeWidth} strokeDashoffset={circumference - (circumference * item.resultado / item.numero)}  />
                                    <Text style={{position:"absolute", alignSelf:"center", top:height*0.04, color:"#607d8b", fontWeight:"700", fontSize:16}}>{item.resultado} / {item.numero}</Text>
                                </G>
                            </Svg>

                            <View style={{justifyContent:'space-between'}}>
                                <Text style={{fontWeight:"700", color:"#607d8b", fontSize:16, }}>{item.modulo_nome?.slice(0,29)}</Text>
                                <Text style={{fontWeight:"700", color:"#ffa000", fontSize:14, }}>Avaliação {item.tipo}</Text>
                                <Text style={{fontWeight:"700", color:"#607d8b", fontSize:12, }}>{item.data}</Text>
                            </View>
                            
                            
                        </TouchableOpacity>

                    ))
                }
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default HisProvaScreen;