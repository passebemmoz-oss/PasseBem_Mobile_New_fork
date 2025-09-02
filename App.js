import "intl";
import "intl/locale-data/jsonp/pt-MZ";
import React from 'react';
import {NavigationContainer} from "@react-navigation/native"
import { Alert, StyleSheet, Text, View , } from 'react-native';
import * as Updates from 'expo-updates';

import {AuthProvider} from './src/context/auth';

import TabRoutes from "./src/routes/Stacks";
import Routes from "./src/routes"

export default function App() {

  async function Update(){

    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        // ... notify user of update ...
        Alert.alert(
          "Novas funcionalidades disponíveis!",
          "Aguarde enquanto instalo para aceder ter a nova experiência."
        )
        await Updates.reloadAsync();
      }
    } catch (e) {
      // handle or log error
    }
  }
  React.useEffect(() => {
    Update()
  })

  
  return (

    <NavigationContainer>

      <AuthProvider>

        <Routes/>

      </AuthProvider>

    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
