import React ,{useRef, useEffect, useMemo, useState,}from "react";
import { View, StatusBar, TouchableOpacity,Image, FlatList, ScrollView, Dimensions, Vibration, Alert, ToastAndroid, Button, Platform} from "react-native";
import {Text, Divider, LinearProgress } from "react-native-elements";
import { MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useIsFocused} from "@react-navigation/native";
import { ProgressBar, Colors , Avatar} from 'react-native-paper';
import Svg, { Circle,G } from 'react-native-svg';
import { Modalize } from 'react-native-modalize';
import LottieView from 'lottie-react-native';
import Dialog from "react-native-dialog";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import api from "../services/api";

import SwiperPUb from "../components/SwiperPUb";

// Configurar o handler de notificações apenas se disponível
try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
} catch (error) {
  console.log('Notifications not available in this environment:', error);
}


const { width, height} = Dimensions.get("screen")

const size = height*0.12;
const strokeWidth =4;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;

const circumference = 2 * Math.PI * radius;

import ImgGeral from "../img/stop.png";
import ImgTema from "../img/traffic.png";



const Home = ({navigation}) => {

    const IsFocused = useIsFocused()
    const [expopushtoken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [isloading, setIsloading] = useState(false)
    const [creditos, setCreditos] = useState(null)

    const [publicidade, setPublicidades] = useState(null)

    const [tema,settema] =useState("Teste Tematico")

    const [temas,settemas] =useState([])

    const [Imgtema,setImgtema] =useState(ImgTema)

    const [numero, setNumero] = useState('')

    const [pacote, setPacote] = useState(null)


    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        setNumero('')
        setPacote(null)
    };

    const handleBay = async() => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        setVisible(false);

        setTimeout(()=>{
            setIsloading(false)
            ToastAndroid.showWithGravityAndOffset(
                "Seu pedido foi submetido. Ao COMERCIANTE PMS Serviços com código de referência 900215",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
            );
        },5000)

        const data = {
            pacote,
            numero
        }
        
        try{
            setIsloading(true)
            const compra = await api.post('recaregarmais', data)
            Getemas()
            setIsloading(false)
            
        }
        catch(error){
            setIsloading(false)
            Alert.alert(
                "Passe Bem Informa",
                "Sua operação foi cancelada pelo sistema do Mpesa!. Tente novamente em 10 mim ou tente comprar outro pacote"
            )
        }
    };


    async function Getemas(){
        try{
            const response = await api.get("/apptemas")
            
            settemas(response.data.temas)
            setCreditos(response.data.creditos)
        }catch(error){

            ToastAndroid.showWithGravityAndOffset(
                "Não foi possível carregar os temas por algum motivo de conexão ao servidor. contacte o suporte",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
            );
        }
        

        
    }

    async function SendPushToken(token){

        setExpoPushToken(token)
        try{
            const response = await api.post('/updatePushToken',{
                "pushToken":token,
                "phoneNumber": 84555,
            })
    
            // console.log(response.data)
        }
        catch(err){
            // console.log('error send pushtoken :', err.response)
        }

    }

    useEffect(() => {
        
        if(IsFocused){
            modalizeRef.current?.open()
            Getemas()
        }  

        // Configurar notificações apenas se não estiver na web
        if (Platform.OS !== 'web') {
            registerForPushNotificationsAsync().then(token => {
                if (token) {
                    SendPushToken(token);
                } else {
                    console.log('No push token available');
                }
            }).catch(error => {
                console.log('Error registering for push notifications:', error);
            });

            // Configurar listeners de notificação apenas se disponível
            try {
                notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                    setNotification(notification);
                });

                responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                    console.log('Notification response received:', response);
                });
            } catch (error) {
                console.log('Could not set notification listeners:', error);
            }
        }

        return () => {
            // Limpar listeners apenas se existirem e não estivermos na web
            if (Platform.OS !== 'web') {
                try {
                    if (notificationListener.current) {
                        notificationListener.current.remove();
                    }
                    if (responseListener.current) {
                        responseListener.current.remove();
                    }
                } catch (error) {
                    console.log('Error removing notification subscriptions:', error);
                }
            }
        }

    }, [IsFocused])

    const modalizeRef = useRef(null);

    const modalizeRefStore = useRef(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };
    const onOpenStre = () => {
        modalizeRefStore.current?.open();
    };

    function AcessarTemas(item){
        console.log(creditos)

        if(!creditos || creditos?.atividade < 1){
            Alert.alert(
                "Ops!, Lamentamos.",
                "Compre mais creditos para poder desfrutar dos testes"
            )
            modalizeRef.current?.close()
            onOpenStre()
            return
        }
        navigation.navigate("QuizScreen", {item, tipo:'Tematica'})
    }


    function FeixarBotton(data){

        if(!creditos || creditos?.atividade < 1){
            Alert.alert(
                "Ops!, Lamentamos.",
                "Compre mais creditos para poder desfrutar dos testes"
            )
            modalizeRef.current?.close()
            onOpenStre()
            return
        }
        
        settema(data)
        if(data == "Teste Geral"){
            
            setImgtema(ImgGeral)
            navigation.navigate("QuizScreen", {item:'geral', tipo:'Geral'})
        }
        
        else{
            setImgtema(ImgTema)
        }
        modalizeRef.current?.close();
    }
  
    const RenderSheetBottom = () => (
        <View>
            <View style={{backgroundColor:"#f0f4fd", width:width,  alignItems:"center",}}>

                <View style={{borderWidth:1.2, marginTop:height*0.05,padding:2, borderRadius:10,borderColor:"#ffecb3", }}>

                    <TouchableOpacity onPress={() => FeixarBotton("Teste Geral")}
                        style={{backgroundColor:"#fff",  elevation:1, alignItems:"center",justifyContent:"space-between",flexDirection:"row",
                        width:width*0.9, height:height*0.14, borderRadius:10, paddingHorizontal:4}}
                        >
                        <View style={{ height:"80%", justifyContent:"space-between", marginLeft:width*0.03}}>
                            <View style={{ flexDirection:"row"}}>
                                <Image style={{width:30, height:30}} source={require("../img/stop.png")} />
                            </View>
                            
                            <Text style={{color:"#212121", fontWeight:"700", fontSize:20}}>Teste Geral (Teoria Comum)</Text>
                            <Text style={{color:"#757575", }}>Prepare-se melhor para o exame</Text>
                        </View>
                        
                        <Svg width={size} height={size} style={{position:"relative"}}>
                            <G rotation="-90" origin={center}>
                                <Circle cx={center} cy={center} r={radius} stroke="#E6E7E8" strokeWidth={strokeWidth}  />

                                <Circle cx={center} cy={center} r={radius} strokeDasharray={circumference} 
                                stroke="#607d8b" strokeWidth={strokeWidth} strokeDashoffset={circumference - (circumference * 0 / 100)}  />
                                <Text style={{position:"absolute", alignSelf:"center", top:height*0.04, color:"#607d8b", fontWeight:"700", fontSize:16}}>0%</Text>
                            </G>
                        </Svg> 
                    </TouchableOpacity>
                </View>

                <View style={{borderWidth:1.2, marginTop:height*0.04,padding:2, borderRadius:10,borderColor:"#ffecb3", marginBottom:10,}}>
                    <TouchableOpacity onPress={() => FeixarBotton("Teste Tematico")}
                        style={{backgroundColor:"#fff",  elevation:1, alignItems:"center",justifyContent:"space-between",flexDirection:"row",
                        width:width*0.9, height:height*0.14, borderRadius:10, paddingHorizontal:4}}
                        >
                        <View style={{ height:"80%", justifyContent:"space-between", marginLeft:width*0.03}}>
                            <View style={{ flexDirection:"row"}}>
                                <Image style={{width:30, height:30}} source={require("../img/traffic.png")} />
                                <Image style={{width:30, height:30}} source={require("../img/driver.png")} />
                                <Image style={{width:30, height:30}} source={require("../img/stop.png")} />
                            </View>
                            
                            <Text style={{color:"#212121", fontWeight:"700", fontSize:20}}>Teste Temático</Text>
                            <Text style={{color:"#757575", }}>Domine cada tema</Text>
                        </View>
                        
                        <Svg width={size} height={size} style={{position:"relative"}}>
                            <G rotation="-90" origin={center}>
                                <Circle cx={center} cy={center} r={radius} stroke="#E6E7E8" strokeWidth={strokeWidth}  />

                                <Circle cx={center} cy={center} r={radius} strokeDasharray={circumference} 
                                stroke="#607d8b" strokeWidth={strokeWidth} strokeDashoffset={circumference - (circumference * 0 / 100)}  />
                                <Text style={{position:"absolute", alignSelf:"center", top:height*0.04, color:"#607d8b", fontWeight:"700", fontSize:16}}>0%</Text>
                            </G>
                        </Svg>
                    </TouchableOpacity>
                </View>

            </View>      
        </View>
      );

      const RenderCardsTemas = ({item}) =>(
          
        <TouchableOpacity key={item._id} onPress={() => AcessarTemas(item) } onLongPress={() => Vibration.vibrate()}

            style={{backgroundColor:"#fff", height:height*0.20,paddingLeft:2,alignItems:"center",marginLeft:width*0.05,
            width:width*0.425, elevation:2, justifyContent:"center", borderWidth:0.5, borderRadius:8, borderColor:"#fff", marginVertical:6, }}
            >
            <View style={{ position:"absolute", top:5,left:5}}>
                <Image style={{width:30, height:30}} source={Imgtema} />
            </View>
            <Text style={{textAlign:"center", color:"#212121", fontWeight:"700", marginVertical:5, textTransform:"uppercase"}}>{item.nome}</Text>
            <Text style={{color:"#757575",textAlign:"center",}}>Reveja a Materia</Text>
        </TouchableOpacity>
      )


    async function ComprarMoedas(pacote){

        setPacote(pacote)

        setVisible(true)

        Platform.OS =='web'?handleBay():null

        return

        
    }

    if(isloading){

        return(
            Platform.OS =='web'?
            <View style={{flex:1,backgroundColor:"#fff", justifyContent:"center", alignItems:"center",}}>
                <ActivityIndicator size={'large'}/>
            </View>
            :
            <View style={{flex:1,backgroundColor:"#fff", justifyContent:"center", alignItems:"center",}}>
              <LottieView
                autoPlay={true}
                style={{height:height*0.31}}
                source={require('../img/loading.json')}
              />
            </View>
          )
      }


    return(
        <View style={{flex:1, backgroundColor:"#f0f4fd"}}>
            <StatusBar backgroundColor="#ffc107" barStyle="light-content" />
            
            <FlatList
                data={temas}
                keyExtractor={item => item._id}
                renderItem={RenderCardsTemas}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View>
                        <SwiperPUb pub={publicidade} margin={true}/>

                        <TouchableOpacity disabled={true} style={{marginTop:height*0.016,alignSelf:"center", borderRadius:5,
                            backgroundColor:"#ffa000",width:width*0.9, height:height*0.047, justifyContent:"center", alignItems:"center"}}>
                            <Text style={{fontWeight:"700", color:"#fff"}}> As melhores novidades do mercado</Text>
                        </TouchableOpacity>

                        <View style={{backgroundColor:"#fff", height:height*0.01, marginTop:height*0.05, justifyContent:"center", alignItems:"center"}}>
                            <View style={{backgroundColor:"#fff", height:height*0.05, width:width*0.3, borderRadius:50, justifyContent:"center", alignItems:"center"}}>
                                <Text style={{fontWeight:"700", color:"#989ab6"}}>Teste Temático</Text>
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: height*0.05 }}
            />

            <Modalize
                ref={modalizeRef}
                snapPoint={height*0.7}
                HeaderComponent={
                    <View style={{height:height / 10, alignItems:"center",}}>
                        <Text style={{fontWeight:"bold",color:"#607d8b", marginTop:height/20,  fontSize:18}}>Guia de Estudo</Text>
                    <View style={{ position: 'absolute', top: 6, right: 12, }}>
                        <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
                            <MaterialCommunityIcons name="close-octagon" size={30} color="#607d8b" />
                        </TouchableOpacity>
                    </View>
                    </View>
                }
                scrollViewProps={{ showsVerticalScrollIndicator: true, scrollEnabled:true,}}
                scrollEnabled={true}
                >
                <RenderSheetBottom/>
            </Modalize>

            <Modalize
                ref={modalizeRefStore}
                snapPoint={height*0.7}
                HeaderComponent={
                    <View style={{height:height / 10, alignItems:"center",}}>
                        <View style={{ position: 'absolute', top: 0, left: 12, }}>
                            <Image source={require("../img/Mpesa.png")}  style={{height:height*0.14, width:height*0.14, resizeMode:"contain"}}/>
                        </View>
                        <Text style={{fontWeight:"bold",color:"#607d8b", marginTop:height/20,  fontSize:18}}>Loja Passe Bem</Text>
                    <View style={{ position: 'absolute', top: 6, right: 12, }}>
                        <TouchableOpacity onPress={() => modalizeRefStore.current?.close()}>
                            <MaterialCommunityIcons name="close-octagon" size={30} color="#607d8b" />
                        </TouchableOpacity>
                    </View>
                    </View>
                }
                scrollViewProps={{ showsVerticalScrollIndicator: true, scrollEnabled:true,}}
                scrollEnabled={true}
                >
                <View style={{backgroundColor:"#fff"}}>
                    <View style={{marginTop:height*0.016,alignSelf:"center", borderRadius:5,flexDirection:"row",borderColor:"#f0f4fd",
                        width:width*0.9, justifyContent:"space-between", alignItems:"flex-start", borderTopWidth:1, paddingVertical:height*0.02}}>
                        <Image source={require("../img/manual.png")}  style={{height:height*0.14, width:height*0.14, resizeMode:"contain"}}/>
                        <View style={{width:width*0.6, }}>
                            <Text style={{fontWeight:"700", fontSize:18, color:"#212121"}}>Pacote Diário</Text>
                            <Text style={{fontSize:15, color:"#9999a6"}}>{`O pacote diário permite manter-te conectado com todas modalidades de avaliação durante um dia.\nPagamento: Mpesa`}</Text>

                            <TouchableOpacity onPress={()=> ComprarMoedas('Diario')}
                             style={{flexDirection:"row", alignItems:"center", width:width*0.6,alignItems:"center",justifyContent:"center",
                                    backgroundColor:"#607d8b", borderRadius:15,marginRight:10,  alignSelf:"center", height:height*0.04, marginTop:height*0.03}}>
                                <Text style={{fontSize:16, fontWeight:"700", color:"#fff", marginRight:width*0.03}}>Abastercer</Text>
                                <MaterialCommunityIcons name="steering" size={24} color="#ffc107" />
                                <Text style={{fontWeight:"700",color:"#fff", fontSize:17,marginLeft:5 }}>{Intl.NumberFormat("pt-MZ",{style:"currency",currency:"MZN"}).format(28)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{marginTop:height*0.016,alignSelf:"center", borderRadius:5,flexDirection:"row",borderColor:"#f0f4fd",
                        width:width*0.9, justifyContent:"space-between", alignItems:"flex-start", borderTopWidth:1, paddingVertical:height*0.02}}>
                        <Image source={require("../img/eletric.png")}  style={{height:height*0.14, width:height*0.14, resizeMode:"contain"}}/>
                        <View style={{width:width*0.6, }}>
                            <Text style={{fontWeight:"700", fontSize:18, color:"#212121"}}>Pacote Semanal</Text>
                            <Text style={{fontSize:15, color:"#9999a6"}}>{`O pacote semanal permite manter-te conectado com todas modalidades de avaliação durante uma semana.\nPagamento: Mpesa`}</Text>

                            <TouchableOpacity onPress={()=> ComprarMoedas('Semanal')}
                            style={{flexDirection:"row", alignItems:"center", width:width*0.6,alignItems:"center",justifyContent:"center",
                                    backgroundColor:"#607d8b", borderRadius:15,marginRight:10,  alignSelf:"center", height:height*0.04, marginTop:height*0.03}}>
                                <Text style={{fontSize:16, fontWeight:"700", color:"#fff", marginRight:width*0.03}}>Abastercer</Text>
                                <MaterialCommunityIcons name="steering" size={24} color="#ffc107" />
                                <Text style={{fontWeight:"700",color:"#fff", fontSize:17,marginLeft:5 }}>{Intl.NumberFormat("pt-MZ",{style:"currency",currency:"MZN"}).format(70)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{marginTop:height*0.016,alignSelf:"center", borderRadius:5,flexDirection:"row",borderColor:"#f0f4fd",
                        width:width*0.9, justifyContent:"space-between", alignItems:"flex-start", borderTopWidth:1, paddingVertical:height*0.02}}>
                        <Image source={require("../img/carwife.png")}  style={{height:height*0.14, width:height*0.14, resizeMode:"contain"}}/>
                        <View style={{width:width*0.6, }}>
                            <Text style={{fontWeight:"700", fontSize:18, color:"#212121"}}>Pacote Mensal</Text>
                            <Text style={{fontSize:15, color:"#9999a6"}}>{`O pacote mensal permite manter-te conectado com todas modalidades de avaliação durante um mês.\nPagamento: Mpesa`}</Text>

                            <TouchableOpacity onPress={()=> ComprarMoedas('Mensal')}
                             style={{flexDirection:"row", alignItems:"center", width:width*0.6,alignItems:"center",justifyContent:"center",
                                    backgroundColor:"#607d8b", borderRadius:15,marginRight:10,  alignSelf:"center", height:height*0.04, marginTop:height*0.03}}>
                                <Text style={{fontSize:16, fontWeight:"700", color:"#fff", marginRight:width*0.03}}>Abastercer</Text>
                                <MaterialCommunityIcons name="steering" size={24} color="#ffc107" />
                                <Text style={{fontWeight:"700",color:"#fff", fontSize:17,marginLeft:5 }}>{Intl.NumberFormat("pt-MZ",{style:"currency",currency:"MZN"}).format(215)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{marginTop:height*0.016,alignSelf:"center", borderRadius:5,flexDirection:"row",borderColor:"#f0f4fd",
                        width:width*0.9, justifyContent:"space-between", alignItems:"flex-start", borderTopWidth:1, paddingVertical:height*0.02}}>
                        <Image source={require("../img/carkit.png")}  style={{height:height*0.14, width:height*0.14, resizeMode:"contain"}}/>
                        <View style={{width:width*0.6, }}>
                            <Text style={{fontWeight:"700", fontSize:18, color:"#212121"}}>Kit de Polimento</Text>
                            <Text style={{fontSize:15, color:"#9999a6"}}></Text>

                            <TouchableOpacity disabled style={{flexDirection:"row", alignItems:"center", width:width*0.6,alignItems:"center",justifyContent:"center",
                                    backgroundColor:"#ddd", borderRadius:15,marginRight:10,  alignSelf:"center", height:height*0.04, marginTop:height*0.03}}>
                                {/* <Text style={{fontSize:16, fontWeight:"700", color:"#fff", marginRight:width*0.03}}>Requisitar</Text>
                                <MaterialCommunityIcons name="steering" size={24} color="#ffc107" /> */}
                                <Text style={{fontWeight:"700",color:"#fff", fontSize:17,marginLeft:5 }}>Não disponível</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modalize>
            
     
            <View style={{ elevation:0,flexDirection:"row",top:0, justifyContent:"flex-end",position:"absolute",width:width,
            alignItems:"center", height:height*0.045, paddingHorizontal:5, backgroundColor:"#f0f4fd"}}>
                <TouchableOpacity onPress={() => onOpen()}
                        style={{flexDirection:"row", alignItems:"center",  paddingHorizontal:7,position:"absolute",
                        backgroundColor:"#607d8b", borderRadius:15,marginRight:10, elevation:5,left:6, alignSelf:"center"}}
                    >
                        <Text style={{fontWeight:"700",color:"#fff", fontSize:17,marginLeft:5 }}>Teste Geral</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="#fff" />
                        
                    </TouchableOpacity>
                
                
                <View style={{flexDirection:"row",  }}>
                    
                    <TouchableOpacity onPress={() => onOpenStre()}
                        style={{flexDirection:"row", alignItems:"center",  paddingHorizontal:7,
                        backgroundColor:"#607d8b", borderRadius:15,marginRight:10, elevation:5}}
                    >
                        <MaterialCommunityIcons name="steering" size={24} color="#ffc107" />
                        <Text style={{fontWeight:"700",color:"#fff", fontSize:17,marginLeft:5 }}>{creditos?.atividade||0}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> Alert.alert("Calendário de Inventos","Neste momento não temos inventos programados ")}
                        style={{flexDirection:"row", alignItems:"center",  paddingHorizontal:7,
                        backgroundColor:"#607d8b", borderRadius:15,elevation:5}}
                    >
                        <MaterialCommunityIcons name="calendar-edit" size={24} color="#ddd" />
                        <Text style={{fontWeight:"700",color:"#fff", fontSize:17,marginLeft:5 }}>0</Text>
                    </TouchableOpacity>
                </View>
                

            </View>

            <View style={{flex:1}}>
                <Dialog.Container visible={visible}>
                    <Dialog.Title>M-pesa - COMERCIANTE PMS Serviços. Cod.ref: 900215</Dialog.Title>
                    
                    <Dialog.Description>
                    {'Informe o número que será cobrado o valor para ativação do seu pacote '+ pacote}
                    </Dialog.Description>
                    <Dialog.Input 
                        keyboardType="number-pad" 
                        onChangeText={e => setNumero(e)}
                        maxLength={9}
                        value={numero}
                    >

                    </Dialog.Input>
                    <Dialog.Button label="Cancel" onPress={handleCancel} />
                    {
                        (numero.startsWith('84') || numero.startsWith('85')) && numero.length ==9 ? <Dialog.Button label="Enviar" onPress={handleBay} />:null
                    }
                </Dialog.Container>
            </View>

        </View>
    )
}

export default Home;

async function registerForPushNotificationsAsync() {
    let token;
    try {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          console.log('Permission not granted for push notifications');
          return null;
        }
        
        // Tentar obter o token, mas capturar erro se não estiver disponível
        try {
          token = (await Notifications.getExpoPushTokenAsync()).data;
        } catch (tokenError) {
          console.log('Push notifications not available in this environment:', tokenError);
          return null;
        }
      } else {
        console.log('Must use physical device for Push Notifications');
        return null;
      }

      if (Platform.OS === 'android') {
        try {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        } catch (channelError) {
          console.log('Could not set notification channel:', channelError);
        }
      }

      return token;
    } catch (error) {
      console.log('Error in registerForPushNotificationsAsync:', error);
      return null;
    }
  }
        

 