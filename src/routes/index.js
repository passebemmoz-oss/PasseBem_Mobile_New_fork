import React from 'react';
import { View , Dimensions, ActivityIndicator} from 'react-native';
import {useAuth} from '../context/auth';

/// rotas da App
import Authroutes from "./auth.routes"
import AppRoutes from "./Stacks"


const { height, width} = Dimensions.get("screen")

const RoutesScreen = ({navigation}) => {

    const {signed, loading} = useAuth()


    if(loading){
        return (
            <View style={{flex:1,backgroundColor:"#fff", justifyContent:"center", alignItems:"center",}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    return signed ? <AppRoutes/>:<Authroutes/>

}

export default RoutesScreen;

