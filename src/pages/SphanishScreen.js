import React from "react";
import {View, Text, SafeAreaView, Image, Dimensions, ActivityIndicator, Platform} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from 'lottie-react-native';
const { width, height} = Dimensions.get("screen")

const SplanishScreen = ({navigation}) => {




    return(
        <SafeAreaView style={{flex:1, backgroundColor:"#ffa000", alignItems:"center"}}>
            

            <View style={{width:width*0.8, justifyContent:"center", alignItems:"center", alignSelf:"center", marginTop:height*0.2}}>
                {
                    Platform.OS == 'web'?
                    <ActivityIndicator size={'large'}/>
                    :
                    <LottieView
                        autoPlay={true}
                        style={{height:height*0.4}}
                        source={require('../img/strat.json')}
                    />
                }
            </View>

            

            <View style={{alignItems:"center",}}>
                <TouchableOpacity onPress={() => navigation.navigate("LogUP")}
                    style={{ elevation:0,borderWidth:2,borderColor:"#fff",borderRadius:8, 
                    width:width*0.8, height:height*0.06,alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontWeight:"700", color:"#FFF", fontSize:20}}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => navigation.navigate("Login")}
                 style={{ marginTop:height*0.03, backgroundColor:"#607d8b",elevation:0,borderWidth:0.4,borderColor:"#fff",borderRadius:8, 
                width:width*0.8, height:height*0.06,alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontWeight:"700", color:"#FFF", fontSize:20}}>Entrar</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

export default SplanishScreen;