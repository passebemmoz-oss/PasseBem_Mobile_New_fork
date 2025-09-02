import React, {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {View, SafeAreaView,ScrollView, Dimensions, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons,  SimpleLineIcons} from '@expo/vector-icons';
import {Avatar} from "react-native-paper";



const {width, height} = Dimensions.get("screen");



const QPScreen = ({navigation}) => {

    const [recursos, setRecurso] = useState(null)


    return(
        <SafeAreaView
        style={{flex:1,alignItems:"center", backgroundColor:"#f0f4fd"}}
        >
            <StatusBar backgroundColor="#ffc107" />
            <View
                style={{
                    height:height*0.07,marginTop:height*0.03, width:width, backgroundColor:"#607d8b", justifyContent:"center",alignItems:"center" 
                }}
            >   
                <View style={{ width:width*0.9, flexDirection:"row"}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="keyboard-backspace" size={24} color="#fff" />
                    </TouchableOpacity>
                    
                    <Text style={{color:"#fff", fontWeight:"700", marginLeft:10, fontSize:16}}>Recuros do Curso</Text>
                </View>
                
            </View>

            <View style={{width:width*0.9, marginTop:height*0.016,}}>
                
                

                {!recursos?(
                    <Text style={{alignSelf:"center", fontSize:18,}}>Nenhum recurso encontrado para o curso </Text>
                ):(
                    recursos.map((item, index) => (
                        <React.Fragment>
                            <Text style={{fontWeight:"700", fontSize:16,}}> {`${index+1} - ${item?.titulo}`}</Text>
                            <Text style={{marginBottom:height*0.02,}}>{   ` ${item?.nome}`}</Text>
                        </React.Fragment>
                    ))
                )}
                    
            </View>


                


        </SafeAreaView>
    )
}

export default QPScreen;