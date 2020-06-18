import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { LinearGradient } from 'expo-linear-gradient'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Color from "../constants/Colors";
import Dimensions from "../constants/Dimensions";
import Colors from "../constants/Colors";

const PROFILE_CIRCLE = 80;

const USER_ID = '5ed2aa4b9124c100284808e4';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            ofertas: false,
            gustoRestauracion: false,
            gustoRopa: false,
            gustoOcio: false,
            gustoDutyFree: false,
            gustoOtros: false
        };
    }

    componentDidMount() {
        var self = this;

            console.log("USER: " + this.props.userId)

            fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/' + this.props.user._id) // URL de la API, en nuestro caso sera localhost
            .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
            .then(json => { // cuando ya esté en formato json
                self.setState({
                    isLoaded: true, // decimos que ya ha cargado
                    items: json, // guardamos los datos en una lista llamada items
                })
                for(let i = 0; i < json.likes.length; i++){
                    if(json.likes[i].typelike == 'Restauración'){
                        this.setState({gustoRestauracion: true})
                    }
                    if(json.likes[i].typelike == 'Ocio'){
                        this.setState({gustoOcio: true})
                    }
                    if(json.likes[i].typelike == 'DutyFree'){
                        this.setState({gustoDutyFree: true})
                    }
                    if(json.likes[i].typelike == 'Ropa'){
                        this.setState({gustoRopa: true})
                    }
                    if(json.likes[i].typelike == 'Otros'){
                        this.setState({gustoOtros: true})
                    }
                }
            }).catch(function(error) {
                //console.log('Error obteniendo los datos: ' + error.message);
            })

        setInterval(
            function() {
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/' + self.props.user._id) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    self.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        items: json, // guardamos los datos en una lista llamada items
                    })
                    for(let i = 0; i < json.likes.length; i++){
                        if(json.likes[i].typelike == 'Restauración'){
                            self.setState({gustoRestauracion: true})
                        }
                        if(json.likes[i].typelike == 'Ocio'){
                            self.setState({gustOcio: true})
                        }
                        if(json.likes[i].typelike == 'DutyFree'){
                            self.setState({gustoDutyFree: true})
                        }
                        if(json.likes[i].typelike == 'Ropa'){
                            self.setState({gustoRopa: true})
                        }
                        if(json.likes[i].typelike == 'Otros'){
                            self.setState({gustoOtros: true})
                        }
                    }
                }).catch(function(error) {
                    //console.log('Error obteniendo los datos: ' + error.message);
                })
            }
        , 5000);
        
    }

    _onClick = (num) => {
        var array_likes = [];

        if(num == 1){
            if(!this.state.gustoRestauracion){
                this.setState({gustoRestauracion: true})
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/', { method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.items.id,
                    likes: [{
                        typelike: "Restauración"
                    }]
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        //items: json, // guardamos los datos en una lista llamada items
                    })
                    //console.log("JSON:" + JSON.stringify(json))
                    console.log("GUSTOS AÑADIDOS")
                }).catch(function(error) {
                    console.log('Error mandando: ' + error.message);
                })
            } else {
                this.setState({gustoRestauracion: false})
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteLike/', { method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.items.id,
                    typelike: "Restauración"
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        //items: json, // guardamos los datos en una lista llamada items
                    })
                    //console.log("JSON:" + JSON.stringify(json))
                    console.log("GUSTOS ELIMINADOS")
                }).catch(function(error) {
                    console.log('Error mandando: ' + error.message);
                })
            }
        }
        if(num == 2){
            if(!this.state.gustoRopa){
                this.setState({gustoRopa: true})
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/', { method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.items.id,
                    likes: [{
                        typelike: "Ropa"
                    }]
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        //items: json, // guardamos los datos en una lista llamada items
                    })
                    //console.log("JSON:" + JSON.stringify(json))
                    console.log("GUSTOS AÑADIDOS")
                }).catch(function(error) {
                    console.log('Error mandando: ' + error.message);
                })
            } else {
                this.setState({gustoRopa: false})
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteLike/', { method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.items.id,
                    typelike: "Ropa"
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        //items: json, // guardamos los datos en una lista llamada items
                    })
                    //console.log("JSON:" + JSON.stringify(json))
                    console.log("GUSTOS ELIMINADOS")
                }).catch(function(error) {
                    console.log('Error mandando: ' + error.message);
                })
            }
            
        }
        if(num == 3){
            if(!this.state.gustoOcio){
                this.setState({gustoOcio: true})
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/', { method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.items.id,
                    likes: [{
                        typelike: "Ocio"
                    }]
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        //items: json, // guardamos los datos en una lista llamada items
                    })
                    //console.log("JSON:" + JSON.stringify(json))
                    console.log("GUSTOS AÑADIDOS")
                }).catch(function(error) {
                    console.log('Error mandando: ' + error.message);
                })
            } else {
                this.setState({gustoOcio: false})
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteLike/', { method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.items.id,
                    typelike: "Ocio"
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        //items: json, // guardamos los datos en una lista llamada items
                    })
                    //console.log("JSON:" + JSON.stringify(json))
                    console.log("GUSTOS ELIMINADOS")
                }).catch(function(error) {
                    console.log('Error mandando: ' + error.message);
                })
            }
        }
        if(num == 4){
            if(!this.state.gustoDutyFree){
                this.setState({gustoDutyFree: true})
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/', { method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.items.id,
                    likes: [{
                        typelike: "DutyFree"
                    }]
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        //items: json, // guardamos los datos en una lista llamada items
                    })
                    //console.log("JSON:" + JSON.stringify(json))
                    console.log("GUSTOS AÑADIDOS")
                }).catch(function(error) {
                    console.log('Error mandando: ' + error.message);
                })
            } else {
                this.setState({gustoDutyFree: false})
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteLike/', { method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.items.id,
                    typelike: "DutyFree"
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        //items: json, // guardamos los datos en una lista llamada items
                    })
                    //console.log("JSON:" + JSON.stringify(json))
                    console.log("GUSTOS ELIMINADOS")
                }).catch(function(error) {
                    console.log('Error mandando: ' + error.message);
                })
            }
        }
        if(num == 5){
            if(!this.state.gustoOtros){
                this.setState({gustoOtros: true})
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/', { method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.items.id,
                    likes: [{
                        typelike: "Otros"
                    }]
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        //items: json, // guardamos los datos en una lista llamada items
                    })
                    //console.log("JSON:" + JSON.stringify(json))
                    console.log("GUSTOS AÑADIDOS")
                }).catch(function(error) {
                    console.log('Error mandando: ' + error.message);
                })
            } else {
                this.setState({gustoOtros: false})
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersDeleteLike/', { method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.items.id,
                    typelike: "Otros"
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        //items: json, // guardamos los datos en una lista llamada items
                    })
                    //console.log("JSON:" + JSON.stringify(json))
                    console.log("GUSTOS ELIMINADOS")
                }).catch(function(error) {
                    console.log('Error mandando: ' + error.message);
                })
            }
        }
    }

    render() {
        return (
            <View style={[styles.container, Platform.OS == "ios" ? {marginTop: 20} : null]}>
                <Text style={styles.title}>Mi perfil</Text>

                { this.state.isLoaded ? 
                    <View>

                    <View style={{paddingHorizontal: 16, paddingVertical: 16, borderRadius: 16, elevation: 10, backgroundColor: 'white', marginHorizontal: 16}}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Image
                                style={{backgroundColor: '#ebebeb', width: PROFILE_CIRCLE, height: PROFILE_CIRCLE, borderRadius: PROFILE_CIRCLE/2, marginRight: 16}}
                                resizeMode="cover"
                                source={{uri: this.state.items.url_image}}
                            />
                            <View style={{flex: 1, alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 25, fontWeight: 'bold', color: Color.text.title}}>{this.state.items.name }</Text>
                                <Text style={{fontSize: 14, color: Color.text.indications, marginBottom: 6}}>{this.state.items.id}</Text>
                                <LinearGradient colors={['#ebcb3f', '#d9b92e', '#ebcb3f']} style={{paddingHorizontal: 10, paddingVertical: 6, marginTop: 6, borderRadius: 10}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>G O L D   P A S S</Text>
                                </LinearGradient>
                            </View>
                        </View>
                        <View style={{height: 50, marginTop: 16}}>
                            <Image
                                style={{height: 50, width: '100%'}}
                                resizeMode="center"
                                source={require('../assets/Codigo_barras.png')}
                            />
                        </View>
                    </View>

                    <Text style={{fontWeight: 'bold', fontSize: 20, color: Colors.text.title, marginLeft: 16, marginTop: 20}}>Mis gustos</Text>
                    <View style={{width: '100%', paddingHorizontal: 10, flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
                        <TouchableBounce style={{flex: 1, height: 50}} onPress={() => this._onClick(1)}>
                            <View style={[{ height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginLeft: 0}, this.state.gustoRestauracion ? {backgroundColor: 'rgba(250, 166, 47,0.8)'} : {backgroundColor: 'rgba(0,0,0,0.1)'}]}>
                                <Text style={{fontWeight: 'bold', color: 'rgba(0,0,0,0.5)'}}>Restauración</Text>
                            </View>
                        </TouchableBounce>
                        <TouchableBounce style={{flex: 1, height: 50}} onPress={() => this._onClick(2)}>
                            <View style={[{ height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginLeft: 10}, this.state.gustoRopa ? {backgroundColor: 'rgba(250, 166, 47,0.8)'} : {backgroundColor: 'rgba(0,0,0,0.1)'}]}>
                                <Text style={{fontWeight: 'bold', color: 'rgba(0,0,0,0.5)'}}>Ropa</Text>
                            </View>
                        </TouchableBounce>
                    </View>
                    <View style={{width: '100%', paddingHorizontal: 10, flexDirection: 'row', marginBottom: 10}}>
                        <TouchableBounce style={{flex: 1, height: 50}} onPress={() => this._onClick(3)}>
                            <View style={[{ height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginLeft: 0}, this.state.gustoOcio ? {backgroundColor: 'rgba(250, 166, 47,0.8)'} : {backgroundColor: 'rgba(0,0,0,0.1)'}]}>
                                <Text style={{fontWeight: 'bold', color: 'rgba(0,0,0,0.5)'}}>Ocio</Text>
                            </View>
                        </TouchableBounce>
                        <TouchableBounce style={{flex: 1, height: 50}} onPress={() => this._onClick(4)}>
                            <View style={[{ height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginLeft: 10}, this.state.gustoDutyFree ? {backgroundColor: 'rgba(250, 166, 47,0.8)'} : {backgroundColor: 'rgba(0,0,0,0.1)'}]}>
                                <Text style={{fontWeight: 'bold', color: 'rgba(0,0,0,0.5)'}}>DutyFree</Text>
                            </View>
                        </TouchableBounce>
                    </View>
                    <View style={{width: '100%', paddingHorizontal: 10, flexDirection: 'row', marginBottom: 20}}>
                        <TouchableBounce style={{flex: 1, height: 50}} onPress={() => this._onClick(5)}>
                            <View style={[{ height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginLeft: 0}, this.state.gustoOtros ? {backgroundColor: 'rgba(250, 166, 47,0.8)'} : {backgroundColor: 'rgba(0,0,0,0.1)'}]}>
                                <Text style={{fontWeight: 'bold', color: 'rgba(0,0,0,0.5)'}}>Otros</Text>
                            </View>
                        </TouchableBounce>
                    </View>


                    {/*
                    <View style={{paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16, elevation: 10, backgroundColor: 'white', marginHorizontal: 16, marginTop: 16}}>
                        <View style={{height: 50, borderBottomWidth: 1, borderColor: 'lightgray', alignItems: 'center', paddingHorizontal: 16, flexDirection: 'row'}}>
                            <Ionicons color={Color.text.content} style={{marginRight: 20}} name="md-person" size={20}/>
                            <Text style={{flex: 1, color: Color.text.title, fontSize: 16}}>Mis datos</Text>
                            <View><Ionicons color={Color.text.indications} name="ios-arrow-forward" size={14}/></View>
                        </View>
                        <View style={{height: 50, borderBottomWidth: 1, borderColor: 'lightgray', alignItems: 'center', paddingHorizontal: 16, flexDirection: 'row'}}>
                            <Ionicons color={Color.text.content} style={{marginRight: 20}} name="md-airplane" size={20}/>
                            <Text style={{flex: 1, color: Color.text.title, fontSize: 16}}>Mis vuelos</Text>
                            <View><Ionicons color={Color.text.indications} name="ios-arrow-forward" size={14}/></View>
                        </View>
                        <View style={{height: 50, borderBottomWidth: 1, borderColor: 'lightgray', alignItems: 'center', paddingHorizontal: 16, flexDirection: 'row'}}>
                            <Ionicons color={Color.text.content} style={{marginRight: 20}} name="ios-information-circle-outline" size={20}/>
                            <Text style={{flex: 1, color: Color.text.title, fontSize: 16}}>Información</Text>
                            <View><Ionicons color={Color.text.indications} name="ios-arrow-forward" size={14}/></View>
                        </View>
                        <View style={{height: 50, borderBottomWidth: 0, borderColor: 'lightgray', alignItems: 'center', paddingHorizontal: 16, flexDirection: 'row'}}>
                            <Ionicons color={Color.text.content} style={{marginRight: 20}} name="ios-hammer" size={20}/>
                            <Text style={{flex: 1, color: Color.text.title, fontSize: 16}}>Preferencias</Text>
                            <View><Ionicons color={Color.text.indications} name="ios-arrow-forward" size={14}/></View>
                        </View>
                    </View>
                    */}

                    </View>

                :
                    null

                }

            </View>
        );
    }
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        marginTop: getStatusBarHeight(),
        marginTop: 32,
        marginBottom: 16,
        fontSize: 28,
        fontWeight: 'bold',
        marginHorizontal: 16,
        color: Color.text.title
    },
});