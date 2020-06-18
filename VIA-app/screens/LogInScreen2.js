import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TextInput
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { LinearGradient } from 'expo-linear-gradient'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Color from "../constants/Colors";
import Dimensions from "../constants/Dimensions";
import { ScrollView } from "react-native-gesture-handler";

const PROFILE_CIRCLE = 80;

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {},
            /*id: "",
            name: "",
            email: "",
            birthdate: "",
            phone: "",
            password: "",
            country: "",
            city: "",
            location_x: "0",
            location_y: "0",
            url_image: "https://www.homeandhelp.com/img/pages/201/e8e52af1eb77cc9b7832336e60112bfb.jpg"*/
            id: "albertgranados",
            name: "Albert Granados",
            email: "albertgranro@gmail.com",
            birthdate: "2020-06-14",
            phone: "656565656",
            password: "123456",
            country: "Spain",
            city: "Barcelona",
            location_x: "0",
            location_y: "0",
            url_image: "https://www.homeandhelp.com/img/pages/201/e8e52af1eb77cc9b7832336e60112bfb.jpg"
        };
    }

    _logIn = () => {
        fetch('http://craaxcloud.epsevg.upc.edu:35300/api/loginapp/', { method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: this.state.id,
            password: this.state.password,
        })}) // URL de la API, en nuestro caso sera localhost
            .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
            .then(json => { // cuando ya esté en formato json
                console.log("USUARIO LOGUEADO: " + JSON.stringify(json))
                console.log("ERR: " + json.Error)
                if(json.Error){
                    
                } else{
                    this.props.onLogin(json);
                }
            }).catch(function(error) {
                console.log('Error obteniendo los datos: ' + error.message);
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ScrollView>
                    <View style={{backgroundColor: 'red', flex: 1, width: '100%', backgroundColor: Color.secondaryColor, justifyContent: 'center', marginTop: 40}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 30, paddingHorizontal: 16}}>
                            <Image
                                style={{width: 100, height: 65, marginLeft: 16, marginTop: 16, marginBottom: 16}}
                                resizeMode="contain"
                                source={require('../assets/via.png')}
                            />
                            <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>Vilanova International Airport</Text>
                            <Text style={{fontSize: 20, color: 'white'}}>Terminal 2</Text>
                        </View>
                        
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white'}}>Nombre de usuario</Text>
                        <View style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16}}>
                            <TextInput onChangeText={text => this.setState({id: text})} style={{height: '100%', width: '100%'}} placeholder={"Usuario"} placeholderTextColor={'lightgray'}/>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white'}}>Contraseña</Text>
                        <View style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16}}>
                            <TextInput secureTextEntry={true} onChangeText={text => this.setState({password: text})} style={{height: '100%', width: '100%'}} placeholder={"Contraseña"} placeholderTextColor={'lightgray'}/>
                        </View>
                    </View>
                    </ScrollView>
                    
                    <View style={{width: '100%', paddingVertical: 10, backgroundColor: Color.secondaryColor, elevation: 20, borderTopColor: 'rgba(255,255,255,0.1)', borderTopWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableBounce style={{width: Dimensions.window.width - 20, height: 60, marginBottom: 10}} onPress={() => this._logIn()}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: 'white', borderRadius: 16, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'black', opacity: 0.6, fontWeight: 'bold', fontSize: 18}}>Iniciar sesión</Text>
                            </View>
                        </TouchableBounce>
                        <TouchableBounce style={{width: Dimensions.window.width - 20, height: 40}} onPress={this.props.registerForm}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 16, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'black', opacity: 0.6, fontWeight: 'bold', fontSize: 18}}>Registrarse</Text>
                            </View>
                        </TouchableBounce>
                    </View>
                </View>
            </View>
        );
    }
}
export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.secondaryColor
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