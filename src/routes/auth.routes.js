import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../pages/SphanishScreen';
import SignInScreen from '../pages/Login';
import LogUpScreen from '../pages/LogUp';
import FormUP from '../pages/FormUp';


const Stack = createStackNavigator();


const AuthRoutes = ({navigation}) => (

    
    <Stack.Navigator
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="Iniciar" component={SplashScreen}/>
        <Stack.Screen name="Login" component={SignInScreen}/>
        <Stack.Screen name="LogUP" component={LogUpScreen}/>

    </Stack.Navigator>
    
);

export default AuthRoutes;

