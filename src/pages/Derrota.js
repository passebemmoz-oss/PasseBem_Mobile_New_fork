import React from 'react'
import { View , StyleSheet, Text, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native'
import { FontAwesome5, Entypo , Ionicons} from '@expo/vector-icons';
import { useRoute} from "@react-navigation/native";

const {height, width} = Dimensions.get("screen");


export default function Vitoria({navigation}) {

    const Route = useRoute();
    
    const {item, pts, tipo} = Route.params;


    return (
        <View style={styles.container}>

            <Text style={styles.title}>Resultados do Teste</Text>

            <ActivityIndicator size={'large'}/>

            <Text style={styles.title}>Ops!</Text>
            <Text style={styles.text}>Na vida, tudo e passageiro, menos o cobrador e o motorista.</Text>

            <View style={styles.cont2}>
                <Text style={styles.textCont2}>Sua Pontuação</Text>
                <Text style={styles.textResul}>{pts}/25</Text>
                <Text style={styles.textCont2}>Moedas ganhas</Text>
                <View style={styles.contFinal}>
                    <FontAwesome5 name="coins" size={24} style={{marginRight:10}} color="#ffc107" />
                    <Text style={styles.textResul}>-2</Text>
                </View>

                

            </View>

            <View style={styles.ContButton}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('HistQuiz', {item})}
                    style={styles.buttom}
                >
                    <Entypo name="check" size={20} color="black" />
                    <Text>Revisar Avaliação</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.navigate("QuizScreen", {item, tipo})}
                    style={styles.buttom}>
                    <Ionicons name="reload-circle" size={20} color="black" />
                    <Text>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
            >
                <Entypo name="home" size={30} color="#ffc107" />
            </TouchableOpacity>


        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:"#f0f4fd",
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:20,
        fontWeight:"700",
        alignSelf:'center',
    },
    text:{
        textAlign:'center',
        marginHorizontal:width*0.05,
    },
    cont2:{
        marginTop:height*0.03,
    },
    textCont2:{
        textTransform:'uppercase',
        alignItems:'center'
    },
    textResul:{
        fontWeight:'700',
        fontSize:25,
        marginVertical:height*0.02,
        alignSelf:'center'
    },
    contFinal:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    ContButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width: width*0.9,
        marginVertical:height*0.02
        
    }
    ,
    buttom:{
        backgroundColor:'rgba(0, 230, 64, 1)',
        padding:height*0.015,
        borderRadius:8,
        elevation:3,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
})