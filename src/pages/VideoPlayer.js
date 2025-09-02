import React,{useEffect} from "react";
import {Text, View, Dimensions} from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useRoute, useIsFocused} from "@react-navigation/native";

import { useAuth } from "../context/auth";


const { width, height} = Dimensions.get("screen")

const VideoPlayScreen = ({navigation}) => {

    const {user} = useAuth()

    const Route = useRoute();

    const {item, } = Route.params;

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({})


    useEffect(() => {
        if(!user?.user_inf){
            Alert.alert(
                "Passe-Bem Informa",
                "Você precisa completar seu registo para ter aceso ao conteúdo multimédia ",
                [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "Finalizar", onPress: () => navigation.navigate("EditPerfil") }
                  ]
            )
            navigation.goBack()
        }
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    }, [])
    

    return(
        <View style={{flex:1, justifyContent:"center",}}>
            
            <Video
                ref={video}
                style={{height:width*0.85}}
                source={{
                    uri: item.video_url,
                  }}
                  useNativeControls
                  resizeMode="cover"
                  isLooping
                  shouldPlay={true}
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
                
            />

        </View>
    )
}

export default VideoPlayScreen;
