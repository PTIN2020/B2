import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    Vibration,
    Platform
} from "react-native";

import { getStatusBarHeight } from 'react-native-status-bar-height';
import Color from "../constants/Colors";

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import AvisoItem from "../components/AvisoItem";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import Dimensions from "../constants/Dimensions";

const USER_ID = '5ee17581e62f91001e1da3fd'; //'5ed2aa4b9124c100284808e4';

class NotificationsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            ofertas: false,
            notisVuelo: [],
            tarjeta_embarque: {},
            expoPushToken: '',
            notification: {},
            n_notisvuelo: 0,
            n_notisofertas: 0,
        };
        //this._loadClient = this._loadClient.bind(this);
    }

    componentDidMount() {
        var self = this;

        this.registerForPushNotificationsAsync();
    
        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(this._handleNotification);

            console.log("USER: " + this.props.userId)

            fetch('http://craaxcloud.epsevg.upc.edu:35300/api/boarding_passesOne/' + this.props.user.id)
            .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
            .then(json => { // cuando ya esté en formato json

                
                //console.log("VUELO: " + JSON.stringify(json))
                
                self.setState({
                    isLoaded: true, // decimos que ya ha cargado
                    tarjeta_embarque: json,
                })

            }).catch(function(error) {
                console.log('Error obteniendo los datos: ' + error.message);
            })

            fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/' + this.props.user._id) // URL de la API, en nuestro caso sera localhost
            .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
            .then(json => { // cuando ya esté en formato json
                let noticias = json.notices;

                console.log(noticias);

                let encontrado0 = false;
                let encontrado1 = false;
                let encontrado2 = false;
                let encontrado3 = false;

                let notisVuelo_tmp = [];

                for(let i = 0; i < noticias.length; ++i){
                    if(noticias[i].id == 0){
                        if(!encontrado0){
                            notisVuelo_tmp.push(noticias[i])
                            encontrado0 = true;
                        } else {
                            fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteAds/', { method: 'DELETE',
                            headers: { 
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: self.props.user.id,
                                id_notice: noticias[i]._id
                            })}) // URL de la API, en nuestro caso sera localhost
                            .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                            .then(json => { // cuando ya esté en formato json
                            }).catch(function(error) {
                                console.log('Error obteniendo los datos: ' + error.message);
                            })
                        }
                    }
                    if(noticias[i].id == 1){
                        if(!encontrado1){
                            notisVuelo_tmp.push(noticias[i])
                            encontrado1 = true;
                        } else {
                            fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteAds/', { method: 'DELETE',
                            headers: { 
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: self.props.user.id,
                                id_notice: noticias[i]._id
                            })}) // URL de la API, en nuestro caso sera localhost
                            .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                            .then(json => { // cuando ya esté en formato json
                            }).catch(function(error) {
                                console.log('Error obteniendo los datos: ' + error.message);
                            })
                        }
                    }
                    if(noticias[i].id == 2){
                        if(!encontrado2){
                            notisVuelo_tmp.push(noticias[i])
                            encontrado2 = true;
                        } else {
                            fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteAds/', { method: 'DELETE',
                            headers: { 
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: self.props.user.id,
                                id_notice: noticias[i]._id
                            })}) // URL de la API, en nuestro caso sera localhost
                            .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                            .then(json => { // cuando ya esté en formato json
                            }).catch(function(error) {
                                console.log('Error obteniendo los datos: ' + error.message);
                            })
                        }
                    }
                    if(noticias[i].id == 3){
                        if(!encontrado3){
                            notisVuelo_tmp.push(noticias[i])
                            encontrado3 = true;
                        } else {
                            fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteAds/', { method: 'DELETE',
                            headers: { 
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: self.props.user.id,
                                id_notice: noticias[i]._id
                            })}) // URL de la API, en nuestro caso sera localhost
                            .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                            .then(json => { // cuando ya esté en formato json
                            }).catch(function(error) {
                                console.log('Error obteniendo los datos: ' + error.message);
                            })
                        }
                    }
                }

                self.setState({
                    isLoaded: true, // decimos que ya ha cargado
                    items: json, // guardamos los datos en una lista llamada items
                    notisVuelo: notisVuelo_tmp.reverse(),
                })
            }).catch(function(error) {
                console.log('Error obteniendo los datos: ' + error.message);
            })

        setInterval(
            function() {
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/' + self.props.user._id) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json

                    let noticias = json.notices;

                    let encontrado0 = false;
                    let encontrado1 = false;
                    let encontrado2 = false;
                    let encontrado3 = false;

                    let notisVuelo_tmp = [];

                    for(let i = 0; i < noticias.length; ++i){
                        if(noticias[i].id == 0){
                            if(!encontrado0){
                                notisVuelo_tmp.push(noticias[i])
                                encontrado0 = true;
                                //self.sendPushNotification()
                            } else {
                                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteAds/', { method: 'DELETE',
                                headers: { 
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    id: self.props.user.id,
                                    id_notice: noticias[i]._id
                                })}) // URL de la API, en nuestro caso sera localhost
                                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                                .then(json => { // cuando ya esté en formato json
                                }).catch(function(error) {
                                    console.log('Error obteniendo los datos: ' + error.message);
                                })
                            }
                        }
                        if(noticias[i].id == 1){
                            if(!encontrado1){
                                notisVuelo_tmp.push(noticias[i])
                                encontrado1 = true;
                                //self.sendPushNotification()
                            }  else {
                                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteAds/', { method: 'DELETE',
                                headers: { 
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    id: self.props.user.id,
                                    id_notice: noticias[i]._id
                                })}) // URL de la API, en nuestro caso sera localhost
                                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                                .then(json => { // cuando ya esté en formato json
                                }).catch(function(error) {
                                    console.log('Error obteniendo los datos: ' + error.message);
                                })
                            }
                        }
                        if(noticias[i].id == 2){
                            if(!encontrado2){
                                notisVuelo_tmp.push(noticias[i])
                                encontrado2 = true;
                                //self.sendPushNotification()
                            } else {
                                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteAds/', { method: 'DELETE',
                                headers: { 
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    id: self.props.user.id,
                                    id_notice: noticias[i]._id
                                })}) // URL de la API, en nuestro caso sera localhost
                                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                                .then(json => { // cuando ya esté en formato json
                                }).catch(function(error) {
                                    console.log('Error obteniendo los datos: ' + error.message);
                                })
                            }
                        }
                        if(noticias[i].id == 3){
                            if(!encontrado3){
                                notisVuelo_tmp.push(noticias[i])
                                encontrado3 = true;
                                //self.sendPushNotification()
                            } else {
                                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteAds/', { method: 'DELETE',
                                headers: { 
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    id: self.props.user.id,
                                    id_notice: noticias[i]._id
                                })}) // URL de la API, en nuestro caso sera localhost
                                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                                .then(json => { // cuando ya esté en formato json
                                }).catch(function(error) {
                                    console.log('Error obteniendo los datos: ' + error.message);
                                })
                            }
                        }
                    }

                    if(noticias.length > self.state.notisVuelo.length){
                        self.sendPushNotification()
                    }
                    
                    //if(self.state.notisVuelo != notisVuelo_tmp.reverse()){ () => self.sendPushNotification()}
                    //if(JSON.stringify(self.state.items) != JSON.stringify(json)){self.sendPushNotification()}
                    
                    //if(self.state.notisVuelo.length != notisVuelo_tmp.reverse().length){self.sendPushNotification()}
                    //if(self.state.items.likes[0].newsletter[0].promotions.length != json.likes[0].newsletter[0].promotions.length){self.sendPushNotification()}

                    self.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        items: json, // guardamos los datos en una lista llamada items
                        notisVuelo: notisVuelo_tmp.reverse(),
                    })
                    
                }).catch(function(error) {
                    console.log('Error obteniendo los datos: ' + error.message);
                })
            }
        , 5000);

        /*setInterval(
            async function() {
                fetch('http://192.168.1.133:3000/api/passengers/56764564/') // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        items: json, // guardamos los datos en una lista llamada items
                    })
                    console.log("JSON:" + JSON.stringify(json))
                    console.log("HOLA")
                }).catch(function(error) {
                    console.log('Error obteniendo los datos: ' + error.message);
                    console.log("ITEMS: " + this.state.items)
                })
            }
        , 5000);*/

        {/*setInterval(
            async function() {
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/56764564/') // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        items: json, // guardamos los datos en una lista llamada items
                    })
                    console.log("JSON:" + JSON.stringify(json))
                    console.log("HOLA")
                }).catch(function(error) {
                    console.log('Error obteniendo los datos: ' + error.message);
                })
            }
        , 5000);*/}

        /*
        fetch('http://192.168.1.133:3000/api/shops/', { method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:"454546",
                    name: "Macdonals",
                    product_name: "Hamburguesas2",
                    location_x:"66" ,
                    location_y:"46" ,
                    type: "Restauración"
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        items: json, // guardamos los datos en una lista llamada items
                    })
                    console.log("JSON:" + JSON.stringify(json))
                    console.log("HOLA")
                }).catch(function(error) {
                    console.log('Error obteniendo los datos: ' + error.message);
                })
        */

       /*fetch('http://192.168.1.133:3000/api/passengersLocation/', { method: 'PUT',
       headers: { 
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({
           id:"Javi",
           location_x: "21",
           location_y: "32"
       })}) // URL de la API, en nuestro caso sera localhost
       .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
       .then(json => { // cuando ya esté en formato json
           this.setState({
               isLoaded: true, // decimos que ya ha cargado
               items: json, // guardamos los datos en una lista llamada items
           })
           console.log("JSON:" + JSON.stringify(json))
           console.log("HOLA")
       }).catch(function(error) {
           console.log('Error obteniendo los datos: ' + error.message);
       })*/

       /*fetch('http://192.168.1.133:3000/api/passengers/', { method: 'PUT',
       headers: { 
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({
           id:"Javi",
           likes:[
            {
            typelike: "Restauración" //Ropa, Ocio, Dutyfree, Otros
            }
        ]
       })}) // URL de la API, en nuestro caso sera localhost
       .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
       .then(json => { // cuando ya esté en formato json
           this.setState({
               isLoaded: true, // decimos que ya ha cargado
               items: json, // guardamos los datos en una lista llamada items
           })
           console.log("JSON:" + JSON.stringify(json))
           console.log("HOLA")
       }).catch(function(error) {
           console.log('Error obteniendo los datos: ' + error.message);
       })*/
        
    }

    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = await Notifications.getExpoPushTokenAsync();
          console.log(token);
          this.setState({ expoPushToken: token });
        } else {
          alert('Must use physical device for Push Notifications');
        }
    
        if (Platform.OS === 'android') {
          Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,
            priority: 'max',
            vibrate: [0, 250, 250, 250],
          });
        }
      };
    
      _handleNotification = notification => {
        Vibration.vibrate();
        console.log(notification);
        this.setState({ notification: notification });
      };
    
      // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
      sendPushNotification = async () => {
        const message = {
          to: this.state.expoPushToken,
          sound: 'default',
          title: 'Vilanova Inteligent Airport',
          body: 'Tienes una nueva notificación',
          data: { data: 'goes here' },
          _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      };

    render() {

        let nombreTienda = "";

        return (
            <View style={styles.container}>
                    <Text style={[styles.title, Platform.OS == "ios" ? {marginTop: 50} : null]}>Mis alertas</Text>

                    <View style={{height: 40, width: '100%', flexDirection: 'row', marginBottom: 20}}>
                        <TouchableOpacity onPress={() => this.setState({ofertas: false})} style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                            <Text style={[{fontWeight: 'bold', fontSize: 20}, this.state.ofertas ? {color: Color.text.title} : {color: Color.primaryColor}]}>Vuelos</Text>
                            <View style={[{height: 3, backgroundColor: Color.primaryColor, width: '100%', marginTop: 10}, this.state.ofertas ? {backgroundColor: 'transparent'} : {backgroundColor: Color.primaryColor}]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => this.setState({ofertas: true})} style={{flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                            <Text style={[{fontWeight: 'bold', fontSize: 20}, this.state.ofertas ? {color: Color.primaryColor} : {color: Color.text.title} ]}>Ofertas</Text>
                            <View style={[{height: 3, width: '100%', marginTop: 10}, this.state.ofertas ? {backgroundColor: Color.primaryColor} : {backgroundColor: 'transparent'} ]}></View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.scrollView}>

                    { this.state.ofertas ?
                        <ScrollView>
                            { this.state.isLoaded ? 
                                this.state.items.likes != 0 ?
                                    this.state.items.likes.map((like, index) => {
                                        return(  
                                                like.newsletter.map((newsletter, index) => {
                                                nombreTienda = newsletter.name;

                                                    return(        
                                                        newsletter.promotions.map((item, index) => {
                                                            return(
                                                                <AvisoItem
                                                                    title={nombreTienda}
                                                                    text={item.offer}
                                                                    tiempo={""}
                                                                    mode={0}
                                                                    key={index}
                                                                />
                                                            )
                                                        })
                                                    )
                                                })
                                        )
                                    })
                                :
                                    <View style={{height: Dimensions.window.height - Dimensions.bottomBar.height - Dimensions.statusBar.height - 160, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{color: Color.text.indications}}>Todavía no tienes alertas sobre {this.state.ofertas ? "ofertas" : "vuelos"}.</Text>
                                    </View>

                            :
                                null
                            }
                        </ScrollView>
                    :
                        <ScrollView>
                            { this.state.isLoaded && this.state.items.notices != null ? 

                                this.state.items.notices.length != 0 ?
                                    this.state.notisVuelo.map((item, index) => {
                                        return(  
                                            <AvisoItem
                                                title={"Notificación sobre el vuelo"}
                                                text={item.notification}
                                                tiempo={""}
                                                mode={3}
                                                key={index}
                                                numvuelo={this.state.tarjeta_embarque.flights}
                                            />
                                        )
                                    })

                                :

                                    <View style={{height: Dimensions.window.height - Dimensions.bottomBar.height - Dimensions.statusBar.height - 160, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{color: Color.text.indications}}>Todavía no tienes alertas sobre {this.state.ofertas ? "ofertas" : "vuelos"}.</Text>
                                    </View>

                            :
                                null
                            }
                        </ScrollView>
                    }

                    {/*<AvisoItem
                        title={"El coche está en camino..."}
                        text={"No te muevas, el coche que has pedido está en camino."}
                        tiempo={"Hace 1 min."}
                        mode={1}
                    />
                    <AvisoItem
                        title={"Puerta de embarque abierta"}
                        text={"Dirígete a la puerta de embarque. Tienes 30 minutos antes de que se cierre."}
                        tiempo={"Hace 3 min."}
                        mode={2}
                    />
                    <AvisoItem
                        title={"Nueva puerta de embarque"}
                        text={"Se te ha asignado la puerta de embarque B44. Abre a las 06.45h."}
                        tiempo={"Hace 20 min."}
                        mode={3}
                    />
                    <AvisoItem
                        title={"Recordatorio"}
                        text={"Tu vuelo con Vueling sale con destino París-Charles de Gaullé (CDG) a las 07.30h."}
                        tiempo={"Hace 1 hora"}
                        mode={4}
                    />
                    {/*<AvisoItem
                        title={"Aviso"}
                        text={"djbadbufia"}
                    />
                    <AvisoItem
                        title={"Aviso"}
                        text={"djbadbufia"}
                    />*/}
                    
                </ScrollView>
            </View>
        );
    }
}
export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {

    },
    title: {
        marginTop: getStatusBarHeight(),
        marginTop: 32,
        marginBottom: 10,
        fontSize: 28,
        fontWeight: 'bold',
        marginHorizontal: 16,
        color: Color.text.title
    }
});