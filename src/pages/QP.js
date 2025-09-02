import React from "react";
import {StatusBar} from "expo-status-bar";
import {View, SafeAreaView,ScrollView, Dimensions, Text, Image, TouchableOpacity} from "react-native";
import {  MaterialIcons,} from '@expo/vector-icons';
import * as MailComposer from "expo-mail-composer";


const {width, height} = Dimensions.get("screen");



const QPScreen = ({navigation}) => {

    function sendMail(){
        MailComposer.composeAsync({
          subject:"Usurio do aplicativo Passe-Bem questiona :",
          recipients:["delciopluis@gmail.com"],
          
        })
      }

    function QPCategoria(title){
        navigation.navigate("QPCategoria", {title})
        return
    }

    return(
        <SafeAreaView
        style={{flex:1,alignItems:"center", backgroundColor:"#f0f4fd"}}
        >
            <View
                style={{
                    height:height*0.07, width:width, backgroundColor:"#607d8b", justifyContent:"center"
                }}
            >
                <Text style={{color:"#fff", fontWeight:"700", marginLeft:10, fontSize:18}}>Perguntas Frequentes</Text>
            </View>
            <Text style={{marginTop:height*0.04, fontSize:20,fontWeight:"700", marginBottom:height*0.03, color:"#212121"}}>Como podemos ajudar você ?</Text>

            <View style={{flexDirection:"row", width:width*0.9, justifyContent:"space-between"}}>


                <TouchableOpacity onPress={() => QPCategoria("Sinais")}
                style={{backgroundColor:"#fff", height:height*0.15,width:width*0.28, elevation:5, borderRadius:8 ,alignItems:"center", justifyContent:"center"}}>
                    <Image style={{width:60, height:60}} source={require("../img/traffic.png")} />
                    <Text style={{fontSize:17, fontWeight:"700", textAlign:"center", color:"#212121"}}>Sinais</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => QPCategoria("Careira")}
                style={{backgroundColor:"#fff", height:height*0.15,width:width*0.28, elevation:5, borderRadius:8 ,alignItems:"center", justifyContent:"center"}}>
                    <Image style={{width:60, height:60}} source={require("../img/driver.png")} />
                    <Text style={{fontSize:17, fontWeight:"700", textAlign:"center", color:"#212121"}}>Carreira</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => QPCategoria("Manuis")}
                style={{backgroundColor:"#fff", height:height*0.15,width:width*0.28, elevation:5, borderRadius:8 ,alignItems:"center", justifyContent:"center"}}>
                    <Image style={{width:60, height:60}} source={require("../img/stop.png")} />
                    <Text style={{fontSize:17, fontWeight:"700", textAlign:"center", color:"#212121"}}>Manuais</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => sendMail()} style={{backgroundColor:"#ffecb3", marginTop:height*0.03,opacity:1,borderRadius:50,
                width:width*0.9, height:height*0.07,justifyContent:"center", alignItems:"center"}}>
                <Text style={{fontSize:18, fontWeight:"700", color:"#757575"}}>+ Submeta sua questão</Text>
            </TouchableOpacity>

            <View style={{ width:width*0.9, marginTop:height*0.04,}}>
                <Text style={{fontSize:20, fontWeight:"700",marginBottom:height*0.025, marginLeft:width*0.02}}>Top Questões</Text>

                <View style={{backgroundColor:"#fff", borderColor:"#e9e9eb",borderBottomWidth:1,borderRadius:8}}>
                    <TouchableOpacity onPress={() => navigation.navigate("ReportScreean")} style={{flexDirection:"row",height:height*0.08, borderBottomWidth:0.5,
                    alignItems:"center", justifyContent:"space-between", marginHorizontal:width*0.03}}>
                        <Text style={{fontSize:15, color:"#212121"}}> A visão em túnel manifesta-se de que modo?</Text>
                        <MaterialIcons name="arrow-forward-ios" size={20} color="#ffa000" />
                    </TouchableOpacity>
                    
                    
                </View>
                
                
            </View>

        </SafeAreaView>
    )
}

export default QPScreen;