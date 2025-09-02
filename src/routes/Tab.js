import React from 'react';
import {StatusBar} from "react-native";
import { Ionicons,  MaterialCommunityIcons ,FontAwesome, MaterialIcons, Fontisto, FontAwesome5, Entypo} from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



import HomeScreen from "../pages/Homee";
import QPScreen from "../pages/QP";
import CursoScreen from "../pages/CursoScreen";
import SimpleChatScreen from "../pages/SimpleChatScreen";
import PerfilScreen from "../pages/Perfil";




const Tab = createMaterialBottomTabNavigator();


const MainTabScreen = () => (
  
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        tabStyle: { width: 100 ,},
        style: { backgroundColor: '#FFF' }, 
      }}
      initialRouteName="Home"
      activeColor="#ffa000"
      inactiveColor="#ddd"
      style={{ backgroundColor: '#FFF' }}
    >
      
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          
          tabBarLabel: 'Partida',
          // tabBarColor:"#009387",
          tabBarColor:"#fff",
          
          tabBarIcon: ({ color }) => (
            <Entypo name="flag" color={color} size={21} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={SimpleChatScreen}
        options={{
          tabBarLabel: 'Chat',
          // tabBarColor:"#1f65ff",
          tabBarColor:"#fff",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="forum" color={color} size={24}  />
          ),
        }}
      />

      <Tab.Screen
        name="Aulas"
        component={CursoScreen}
        options={{
          tabBarLabel: 'Aulas',
          // tabBarColor:"#1f65ff",
          tabBarColor:"#fff",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="youtube-tv" color={color} size={24}  />
          ),
        }}
      />

      <Tab.Screen
        name="Questoes"
        component={QPScreen}
        options={{
          tabBarLabel: 'P&F',
          // tabBarColor:"#694fad",
          tabBarColor:"#fff",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="head-question-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          // tabBarColor:"#d02860",
          tabBarColor:"#fff",
          tabBarIcon: ({ color }) => (
              <Ionicons name="person" color={color} size={26}/>
          ),
        }}
      />



    </Tab.Navigator>
);



export default MainTabScreen;


// Navegacao entre telas pricipalmente  cabesalho e icon de menu lateral



