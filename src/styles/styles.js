import React from 'react';
import { StyleSheet , Dimensions,} from 'react-native';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  scrollHome:{backgroundColor:"#fff"},
  SafeConteiner:{ 
    flex: 1,
    backgroundColor:"#fff" 
  },
  imageCard: {
    width: `100%`,
    height: `100%`,
    borderRadius: 8,
    resizeMode:"cover"
  },
  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
    
},itemTitle: {
  color: 'white',
  fontSize: 22,
  shadowColor: '#000',
  shadowOffset: { width: 0.8, height: 0.8 },
  shadowOpacity: 1,
  shadowRadius: 3,
  marginBottom: 5,
  fontWeight: "bold",
  elevation: 5
},
itemDescription: {
  color: 'white',
  fontSize: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0.8, height: 0.8 },
  shadowOpacity: 1,
  shadowRadius: 3,
  elevation: 5,
  
},
searchConteiner:{ height:65, 
  backgroundColor: '#fff', 
  borderBottomWidth: 0, 
  borderBottomColor: '#fff', },
search: {
  flexDirection: 'row', padding: 10,
  backgroundColor: '#fff', marginHorizontal: width/26,
  shadowOffset: { width: 0, height: 0 },
  shadowColor: 'black',
  shadowOpacity: 0.2,
  elevation: 2,
  //marginTop: Platform.OS == 'android' ? 13 : null,
  borderRadius:8,
},
searchInput:{ flex: 1, 
  fontWeight: '700', 
  backgroundColor: '#fff'
},
geralmente: {
  borderBottomWidth:1,
  borderBottomColor:"#dddddd",
  margin:5,
  borderRadius:17,
  alignItems:"center",
  padding:5,
  alignContent:"center",
  marginTop:17
},
  geralmenteT: {
    backgroundColor:"#ddd",
    elevation:1,
    margin:5,
    marginHorizontal:10,
    borderRadius:5,
    alignItems:"center",
    padding:5,
    alignContent:"center",
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal:2,
    marginHorizontal:5,
    alignItems:"flex-end",
    marginRight:width /28
      
  },
  banerConteiner:{ 
    marginHorizontal:width -10, 
    marginVertical:2,
    width:1
  },
  banerImg:{
    height:`100%`, 
    width:`100%`,
    borderRadius:8,
    resizeMode:"cover"
  },
  produsContaniter:{
    height:200,
    width:122,
    marginLeft:10,
    backgroundColor:"#fff",
    borderWidth:1, 
    borderColor:"#f5f5f5",
    //shadowOpacity: 0.7,
    borderRadius:8,
    elevation: 1,
    marginVertical:6,
    borderTopLeftRadius:8,
 },
 produsContaniterP:{
   flexDirection:"row",
    height:50,
    width:width,
    marginHorizontal:10,
    borderColor:"#f5f5f5",
    marginVertical:6,
},
 imagens: {
  marginTop:0,
  flex:1,
  height:150,
  width:120,
  resizeMode:"cover",
  borderTopLeftRadius:8,
  borderTopRightRadius:8,
  marginHorizontal:0,
},
imagensp: {
  marginTop:0,
  height:50,
  width:50,
  resizeMode:"cover",
  borderTopLeftRadius:8,
  borderTopRightRadius:8,
  marginHorizontal:0,
},
  titulos: {
    fontSize:17,
    color:"#808080",
    marginBottom:0,
    marginTop:10,
  },
  carinholoves:{
    flexDirection:"row", 
    alignItems:"baseline", 
    justifyContent:"space-between", 
    marginBottom:5},
    loveprodutos:{
      position:"absolute", 
      left:4, 
      top:3},
      
  nomes: {
    color:"#000",
    fontSize:12,
    marginLeft:10
  },
  precos: {
    color:"grey",
    fontSize:10,
    marginLeft:10
  },
  contener: {
    backgroundColor:"#fff",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    paddingBottom:15
  },
  conteneT: {
    flex:1,  
    paddingTop:15
  },
  branco:{
    backgroundColor:"#fff"
  },
  
  imagens2: {
    flex:1,
    height:160,
    width:200,
    resizeMode:"cover",
    borderRadius:2,
  },

  containerCart: {
		position: 'absolute',
		top: -5,
		right:10,
		backgroundColor: 'red',
		padding: 0,
		height: 12,
		width: 12,
		textAlign: 'center',
		borderRadius: 10,
		fontWeight: 'bold',
		color: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
  textCart: { fontWeight: 'bold', color: '#fff', fontSize:10 },
  
  containerCartNW: {
		position: 'absolute',
		top: -5,
		right: -5,
		backgroundColor: 'red',
		padding: 0,
		height: 8,
		width: 8,
		textAlign: 'center',
		borderRadius: 10,
		fontWeight: 'bold',
		color: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
  textCartNW: { fontWeight: 'bold', color: '#fff', fontSize:8 },
cardView: {
  flex: 1,
  width: width - 20,
  height: height / 3,
  backgroundColor: 'white',
  margin: 10,
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0.5, height: 0.5 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 5,
},
cardViewBA: {
  flex: 1,
  width: width - 20,
  height: height / 5.3,
  backgroundColor: 'white',
  margin: 10,
  borderRadius: 14,
  shadowColor: '#000',
  shadowOffset: { width: 0.5, height: 0.5 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 1,
},

cardViewBAE: {
  flex: 1,
  width: width - 30,
  height: height / 5.3,
  backgroundColor: 'white',
  marginVertical:10,
  marginHorizontal:1,
  marginLeft:10,
  borderRadius: 14,
  elevation: 1,
},
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  topbar:{ height: height /15, 
    backgroundColor: '#fff', 
    borderBottomColor: '#fff', 
  },
itembar: {
  flexDirection: 'row', padding: 5,
  backgroundColor: '#fff', 
  shadowOffset: { width: 0, height: 0 },
  shadowColor: 'black',marginHorizontal:5,
  shadowOpacity: 0.2,
  elevation: 0,justifyContent:"space-between",
  //marginTop: Platform.OS == 'android' ? 0 : null,
},
itembarIcon:{ 
  color:"#607d8b",
  padding:10,
},
dcontainerCart: {
  position: 'absolute',
  top: -5,
  right: -20,
  backgroundColor: 'red',
  padding: 0,
  height: 20,
  width: 20,
  textAlign: 'center',
  borderRadius: 10,
  fontWeight: 'bold',
  color: '#fff',
  justifyContent: 'center',
  alignItems: 'center'
},
principal: {
  flex:1,
  flexDirection:"row"
},

caixaItemcart:{ 
  padding:7,
  backgroundColor:"#ddd"  
},
caixasItemcart:{
  backgroundColor:"#fff", 
  padding:10,
  flexDirection:"row",
  borderRadius:5
},
imgCart:{width:60,
  height:80,
  marginRight:5,
  borderRadius:3
},
textCartShop:{
  color:"#000"
},
cartBordAdd:{
flexDirection:"row",
borderWidth:1,
justifyContent:"center",
paddingHorizontal:20,
borderRadius:5,
borderColor:"#ddd",
alignItems:"center"},
// Detalhe servics de Map;
dcontainer: {
  flex:1,
  backgroundColor:"#fff",
},
dmapStyle: {
    flex:1,
    width: width /1.01,
    borderRadius:20,
    position:"relative"
},
dcampos:{
    flexDirection:"row",
    position:"relative",
    borderBottomWidth:1,
    borderBottomColor:"#ddd",
    justifyContent:"space-between"
},
dnomes:{
    position:"absolute",
    right:1,
    fontSize:16,
},
dtitulos:{
    fontWeight:"bold",
   // marginLeft:width/50,
    fontSize:16,
}
,
dquatidades:{
    //position:"absolute",
    //left:(width /2)-5,
    fontSize:16,
    fontWeight:"bold"
},
dquatidade:{
    //position:"absolute",
    //left:(width /2)-5,
    fontSize:16,
},
dcheckText: {
    flexDirection:"row",
    alignItems:"center"
  },
  dtextcheck: {
    fontSize:16
  },
  dcaixas: {
    marginVertical:7,
    marginHorizontal:6
  },
  dresposta: {
    width: width/1.1,
    height: width/10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    flexDirection: 'row',
    marginVertical:15,
    marginHorizontal:width/30
},
dbutton:{
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    marginHorizontal:10,
    marginVertical:15
},
dtextSign:{
  color:"#DBDBDB",
  fontWeight:"700"
},
CgeralmenteT: {
  backgroundColor:"#fff",
  borderBottomWidth:1,
  borderBottomColor:"#dddddd",
  margin:20,
  alignItems:"center",
  borderRadius:8,
  alignItems:"center",
  padding:10,
  alignContent:"center",
  shadowColor: '#000',
  shadowOffset: { width: 0.8, height: 0.8 },
  shadowOpacity: 1,
  shadowRadius: 10,
  marginHorizontal: width/20,
  elevation:5
  
},
pcontainer: {
  flex: 1,
},
puserInfoSection: {
  paddingHorizontal: 30,
  marginBottom: 25,
},
ptitle: {
  fontSize: 24,
  fontWeight: 'bold',
},
pcaption: {
  fontSize: 14,
  lineHeight: 14,
  fontWeight: '500',
},
prow: {
  flexDirection: 'row',
  marginBottom: 10,
},
pinfoBoxWrapper: {
  borderBottomColor: '#dddddd',
  borderBottomWidth: 1,
  borderTopColor: '#dddddd',
  borderTopWidth: 1,
  flexDirection: 'row',
  height: width / 5.7,
},
pinfoBox: {
  width: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection:"row"
},
pmenuWrapper: {
  marginTop: 10,
},
pmenuItem: {
  flexDirection: 'row',
  paddingVertical: 15,
  paddingHorizontal: 30,
},
pmenuItemText: {
  color: '#777777',
  marginLeft: 20,
  fontWeight: '600',
  fontSize: 16,
  lineHeight: 26,
},
})
  


  export default styles;