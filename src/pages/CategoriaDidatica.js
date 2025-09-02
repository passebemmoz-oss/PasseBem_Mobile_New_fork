import React ,{useState} from "react";
import {View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Text} from 'react-native'
import Svg, { Circle,G } from 'react-native-svg';


const { width, height} = Dimensions.get("screen")

const size = height*0.12;
const strokeWidth =4;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;

const circumference = 2 * Math.PI * radius;

const CategoriaDidatica = ({navigation}) =>{



    const categorias = [{nome:"A1", numero:2, id:1}, {nome:"B", numero:2, id:2}, {nome:"C1",numero:2, id:3}, {nome:"C", numero:2, id:4}]



    return(
        <SafeAreaView style={{flex:1, backgroundColor:"#f0f4fd"}}>

            <ScrollView style={{marginHorizontal:width*0.05}}>
                {
                    categorias.map((item, index) => (
                        <TouchableOpacity key={item.id} onPress={()=> navigation.navigate("FicheiroPage", {item})} 
                            style={{ backgroundColor:"#fff", paddingHorizontal:width*0.03, paddingVertical:height*0.01,flexDirection:'row',
                                borderRadius:8, width:width*0.9, marginTop:height*0.02, justifyContent:'space-between' }}
                        >
                            <Svg width={size} height={size} style={{position:"relative"}}>
                                <G rotation="-90" origin={center}>
                                    <Circle cx={center} cy={center} r={radius} stroke="#E6E7E8" strokeWidth={strokeWidth}  />

                                    <Circle cx={center} cy={center} r={radius} strokeDasharray={circumference} 
                                    stroke="#607d8b" strokeWidth={strokeWidth} strokeDashoffset={circumference - (circumference * item.resultado / item.numero)}  />
                                    <Text style={{position:"absolute", alignSelf:"center", top:height*0.04, color:"#607d8b", fontWeight:"700", fontSize:16}}>{item.nome}</Text>
                                </G>
                            </Svg>

                            <View style={{justifyContent:'space-between'}}>
                                <Text style={{fontWeight:"700", color:"#607d8b", fontSize:16, }}>{item.nome}</Text>
                                <Text style={{fontWeight:"700", color:"#ffa000", fontSize:14, }}>{item.numero} Ficheiros</Text>
                                <Text style={{fontWeight:"700", color:"#607d8b", fontSize:12, }}>Selcione sua categoria</Text>
                            </View>
                                    
                        </TouchableOpacity>
                        ))
                }
            </ScrollView>
        
        
        </SafeAreaView>
    )
}

export default CategoriaDidatica;