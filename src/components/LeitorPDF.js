import * as React from 'react';
import { WebView } from 'react-native-webview';
import { useRoute} from "@react-navigation/native";
import { View, StyleSheet } from 'react-native';

const Codigoestradadoc = require('../docs/Codigo-estrada-de-Moçambique.pdf')
const sinaisdoc = require('../docs/sinais de transito.pdf')


const PDF_Reader = ({navigation}) => {

    const Route = useRoute();
    
    const item = Route?.params?.item

    // Função para criar URL do Google Docs Viewer para PDFs
    const getPdfUrl = (pdfUri) => {
        return `https://docs.google.com/gviewer?embedded=true&url=${encodeURIComponent(pdfUri)}`;
    };

    return(
        <View style={styles.container}>
            <WebView
                source={{ uri: getPdfUrl(item?.link) }}
                style={styles.webview}
                startInLoadingState={true}
                scalesPageToFit={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    }
});


export default PDF_Reader;

