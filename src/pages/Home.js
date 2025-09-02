import React from "react";
import {View, SafeAreaView, Text, StatusBar, StyleSheet, TouchableOpacity,Pressable } from "react-native";
import { MaterialCommunityIcons , Ionicons, Feather, Entypo, Octicons} from '@expo/vector-icons';
import { ProgressBar, Colors } from 'react-native-paper';


const Home = ({navigation}) => {

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#ffc107" />
            <View style={styles.header}>
                <Text style={styles.texts}>Oi, Samuel</Text>
                <MaterialCommunityIcons name="menu" size={30} color="black" />
            </View>

            <View  style={{marginTop:"14%", marginHorizontal:"3%"}}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={{textTransform:"uppercase"}}>Completou 10/50</Text>
                    <Text style={{textTransform:"uppercase", color:"#2a58b8"}}>Todos Testes</Text>
                </View>
                <ProgressBar style={styles.progressBar} progress={0.3} color={Colors.red500} />
            </View>

            <View style={styles.caixa}>
                <Text style={{fontSize:20}}>Passes restantes</Text>

                <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:40, fontWeight:"700"}}>13</Text>
                    <Ionicons name="information-circle-outline" size={18} color="black" />
                </View>

                <TouchableOpacity
                    style={{backgroundColor:"#f9ba13", width:"50%",height:"25%", 
                    borderRadius:8, justifyContent:"center", alignItems:"center"}}
                >
                    <Text style={{fontWeight:"700", color:"#fff", fontSize:18}}>Comprar Passes</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:"row",  
            justifyContent:"space-between", padding:5, marginTop:"3%", height:"20%"}}>

                <TouchableOpacity style={{backgroundColor:"#383854", width:"48%",borderRadius:8,justifyContent:"center", alignItems:"center"}}>
                    <View style={{padding:10, borderBottomWidth:1, borderColor:"#fff", alignItems:"center"}}>
                        <Feather name="edit-3" size={24} color="#fff" />
                        <Text style={{fontWeight:"700", color:"#fff", textTransform:"uppercase"}}>Teste Geral</Text>
                    </View>
                    
                    <Text style={{color:"#ddd"}}>Preparse melhor</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor:"#383854", width:"48%", borderRadius:8,justifyContent:"center", alignItems:"center"}}>
                    <View style={{padding:10, borderBottomWidth:1, borderColor:"#fff", alignItems:"center"}}>
                        <Octicons name="settings" size={24} color="#fff" />
                        <Text style={{fontWeight:"700", color:"#fff", textTransform:"uppercase"}}>Teste Tematico</Text>
                    </View>
                    
                    <Text style={{color:"#ddd"}}>Domine cada tema</Text>
                </TouchableOpacity>
                
            </View>

            <View style={{flexDirection:"row",  
            justifyContent:"space-between", padding:5, marginTop:"0%", height:"20%"}}>

                <TouchableOpacity style={{backgroundColor:"#383854", width:"48%",borderRadius:8,justifyContent:"center", alignItems:"center"}}>
                    <View style={{padding:10, borderBottomWidth:1, borderColor:"#fff", alignItems:"center"}}>
                        <Entypo name="text-document" size={24} color="#fff" />
                        <Text style={{fontWeight:"700", color:"#fff", textTransform:"uppercase"}}>Resultados</Text>
                    </View>
                    
                    <Text style={{color:"#ddd"}}>Veja seus resultados</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor:"#383854", width:"48%", borderRadius:8,justifyContent:"center", alignItems:"center"}}>
                    <View style={{padding:10, borderBottomWidth:1, borderColor:"#fff", alignItems:"center"}}>
                        <MaterialCommunityIcons name="bag-personal" size={26} color="#fff" />
                        <Text style={{fontWeight:"700", color:"#fff", textTransform:"uppercase"}}>Material</Text>
                    </View>
                    
                    <Text style={{color:"#ddd"}}>Reveja o material</Text>
                </TouchableOpacity>
                
            </View>
            
        </View>
    )
}

export default Home;


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:"#e0e5e8"
    },
    header:{
        flexDirection:"row",
        alignItems:"center", 
        justifyContent:"space-between",
        marginHorizontal:"5%",
        marginTop:"3%"
    },
    texts:{
        fontSize:28,
        fontWeight:"700",
    },
    progressBar:{
        height:10,
        borderRadius:8,
        marginTop:"2%",
    },
    caixa:{
        backgroundColor:"#e6e6e6",
        height:"30%",
        borderRadius:8,
        elevation:3,
        marginTop:"5%",
        justifyContent:"space-between",
        alignItems:"center",
        padding:5
    }
})

                        