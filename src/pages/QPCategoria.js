import React, {useState, } from "react";
import {StatusBar} from "expo-status-bar";
import {View, SafeAreaView,ScrollView, Dimensions, Text, Image, TextInput} from "react-native";
import { MaterialCommunityIcons , MaterialIcons, Feather, Entypo, Octicons} from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import {  useRoute, useIsFocused, } from "@react-navigation/native";


const {width, height} = Dimensions.get("screen");



const QPScreen = ({navigation}) => {

    const route = useRoute()
    const {title} = route.params;
    
    const [search, setsearch] = useState(false)

    function ActiveSeach(){
        setsearch(!search)
    }

    return(
        <SafeAreaView
        style={{flex:1,alignItems:"center", backgroundColor:"#f0f4fd"}}
        >
           <StatusBar backgroundColor="#ffc107" />
            <View
                style={{flexDirection:"row",
                    height:height*0.07,marginTop:height*0.03, width:width, backgroundColor:"#607d8b", justifyContent:"center",alignItems:"center" 
                }}
            >   
                {!search? (
                    <>
                    <View style={{ width:width*0.9, flexDirection:"row"}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="keyboard-backspace" size={24} color="#fff" />
                        </TouchableOpacity>
                        
                        <Text style={{color:"#fff", fontWeight:"700", marginLeft:10, fontSize:16}}>{title}</Text>
                    </View>
                    <TouchableOpacity onPress={() => ActiveSeach()}>
                        <MaterialIcons name="search" size={24} color="#fff" />
                    </TouchableOpacity>
                    </>
                ):(
                    <>
                    <View style={{ width:width*0.9, flexDirection:"row"}}>
                        <TouchableOpacity >
                            <MaterialIcons name="search" size={24} color="#fff" />
                        </TouchableOpacity>
                        
                        <TextInput
                            style={{}}
                            autoFocus={search}
                            placeholder="Busque sua dúvida"
                        />
                    </View>
                    <TouchableOpacity onPress={() => ActiveSeach()}>
                        <MaterialIcons name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                    </>
                )}
                {/*  */}
                
                

                
            </View>
           

            <View style={{ width:width*0.9, marginTop:height*0.04,}}>
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