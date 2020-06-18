import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    CheckBox,
    BackHandler
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { LinearGradient } from 'expo-linear-gradient'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Color from "../constants/Colors";
import Dimensions from "../constants/Dimensions";
import { ScrollView } from "react-native-gesture-handler";
import { USER_FACING_NOTIFICATIONS } from "expo-permissions";

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
            url_image: "https://www.homeandhelp.com/img/pages/201/e8e52af1eb77cc9b7832336e60112bfb.jpg",
            gustoRestauracion: false,
            gustoRopa: false,
            gustOcio: false,
            gustoDutyFree: false,
            gustoOtros: false
        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.registerForm()
        return true;
    }
    

    _createUser = () => {
        fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/', { method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            birthdate: this.state.birthdate,
            phone: this.state.phone,
            password: this.state.password,
            country: this.state.country,
            city: this.state.city,
            location_x: this.state.location_x,
            location_y: this.state.location_y,
            url_image: this.state.url_image
        })}) // URL de la API, en nuestro caso sera localhost
            .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
            .then(json => { // cuando ya esté en formato json
                console.log("USUARIO REGISTRADO")
                //console.log("USUARIO REGISTRADO: " + JSON.stringify(json))
                //this.setState({user: JSON.parse(json)})

                var array_likes = [];

                if(this.state.gustoRestauracion) array_likes.push({typelike: "Restauración"})
                if(this.state.gustoOcio) array_likes.push({typelike: "Ocio"})
                if(this.state.gustoRopa) array_likes.push({typelike: "Ropa"})
                if(this.state.gustoDutyFree) array_likes.push({typelike: "DutyFree"})
                if(this.state.gustoOtros) array_likes.push({typelike: "Otros"})

                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/', { method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: json.id,
                    likes: array_likes
                })}) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    this.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        items: json, // guardamos los datos en una lista llamada items
                    })
                    //console.log("JSON:" + JSON.stringify(json))
                    console.log("GUSTOS AÑADIDOS")
                    this.props.onRegister(json);
                }).catch(function(error) {
                    console.log('Error obteniendo los datos: ' + error.message);
                })

            }).catch(function(error) {
                console.log('Error obteniendo los datos: ' + error.message);
            })
    }

    render() {
        return (
            <View style={styles.container}>
                
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    {/*<Image
                        style={{width: 100, height: 75, marginLeft: 16, marginTop: 16, marginBottom: 16}}
                        resizeMode="contain"
                        source={require('../assets/via.png')}
                    />
                    <Text style={{fontSize: 26, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>Vilanova International Airport</Text>
                    <Text style={{fontSize: 20, color: 'white'}}>Terminal 2</Text>
                    */}
                    <ScrollView>
                    <View style={{backgroundColor: 'red', flex: 1, width: '100%', backgroundColor: Color.secondaryColor, justifyContent: 'center'}}>
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white', marginTop: 40}}>Nombre y apellidos</Text>
                        <View style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10, marginRight: 10, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16}}>
                            <TextInput onChangeText={text => this.setState({name: text})} style={{height: '100%', width: '100%'}} placeholder={"Escribe tu nombre"} placeholderTextColor={'lightgray'}/>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white'}}>Email</Text>
                        <View style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16}}>
                            <TextInput onChangeText={text => this.setState({email: text})} style={{height: '100%', width: '100%'}} placeholder={"Escribe tu email"} placeholderTextColor={'lightgray'}/>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white'}}>Fecha de nacimiento (AAAA-MM-DD)</Text>
                        <View style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16}}>
                            <TextInput onChangeText={text => this.setState({birthdate: text})} style={{height: '100%', width: '100%'}} placeholder={"Escribe tu fecha de nacimiento (AAAA-MM-DD)"} placeholderTextColor={'lightgray'}/>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white'}}>Teléfono</Text>
                        <View style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16}}>
                            <TextInput onChangeText={text => this.setState({phone: text})}  style={{height: '100%', width: '100%'}} placeholder={"Escribe tu número de teléfono"} placeholderTextColor={'lightgray'}/>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white'}}>País</Text>
                        <View style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16}}>
                            <TextInput  onChangeText={text => this.setState({country: text})} style={{height: '100%', width: '100%'}} placeholder={"Escribe tu país"} placeholderTextColor={'lightgray'}/>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white'}}>Ciudad</Text>
                        <View style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16}}>
                            <TextInput onChangeText={text => this.setState({city: text})} style={{height: '100%', width: '100%'}} placeholder={"Escribe tu ciudad"} placeholderTextColor={'lightgray'}/>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white'}}>Nombre de usuario</Text>
                        <View style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16}}>
                            <TextInput onChangeText={text => this.setState({id: text})} style={{height: '100%', width: '100%'}} placeholder={"Elige un nombre de usuario"} placeholderTextColor={'lightgray'}/>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white'}}>Contraseña</Text>
                        <View style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16}}>
                            <TextInput secureTextEntry={true} onChangeText={text => this.setState({password: text})} style={{height: '100%', width: '100%'}} placeholder={"Elige una contraseña"} placeholderTextColor={'lightgray'}/>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white'}}>Repite la contraseña</Text>
                        <View style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10, backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16}}>
                            <TextInput secureTextEntry={true} onChangeText={text => this.setState({password: text})} style={{height: '100%', width: '100%'}} placeholder={"Vuelve a escribir la contraseña"} placeholderTextColor={'lightgray'}/>
                        </View>
                        <Text style={{marginLeft: 16, marginBottom: 10, fontWeight: 'bold', color: 'white'}}>Gustos</Text>
                        <View style={{width: '100%', paddingHorizontal: 10, flexDirection: 'row', marginBottom: 10}}>
                            <TouchableBounce style={{flex: 1, height: 50}} onPress={() => this.setState({gustoRestauracion: !this.state.gustoRestauracion})}>
                                <View style={[{ height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginLeft: 0}, this.state.gustoRestauracion ? {backgroundColor: 'rgba(255,255,255,0.5)'} : {backgroundColor: 'rgba(255,255,255,0.1)'}]}>
                                    <Text style={{fontWeight: 'bold', color: 'white'}}>Restauración</Text>
                                </View>
                            </TouchableBounce>
                            <TouchableBounce style={{flex: 1, height: 50}} onPress={() => this.setState({gustoRopa: !this.state.gustoRopa})}>
                                <View style={[{ height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginLeft: 10}, this.state.gustoRopa ? {backgroundColor: 'rgba(255,255,255,0.5)'} : {backgroundColor: 'rgba(255,255,255,0.1)'}]}>
                                    <Text style={{fontWeight: 'bold', color: 'white'}}>Ropa</Text>
                                </View>
                            </TouchableBounce>
                        </View>
                        <View style={{width: '100%', paddingHorizontal: 10, flexDirection: 'row', marginBottom: 10}}>
                            <TouchableBounce style={{flex: 1, height: 50}} onPress={() => this.setState({gustoOcio: !this.state.gustoOcio})}>
                                <View style={[{ height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginLeft: 0}, this.state.gustoOcio ? {backgroundColor: 'rgba(255,255,255,0.5)'} : {backgroundColor: 'rgba(255,255,255,0.1)'}]}>
                                    <Text style={{fontWeight: 'bold', color: 'white'}}>Ocio</Text>
                                </View>
                            </TouchableBounce>
                            <TouchableBounce style={{flex: 1, height: 50}} onPress={() => this.setState({gustoDutyFree: !this.state.gustoDutyFree})}>
                                <View style={[{ height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginLeft: 10}, this.state.gustoDutyFree ? {backgroundColor: 'rgba(255,255,255,0.5)'} : {backgroundColor: 'rgba(255,255,255,0.1)'}]}>
                                    <Text style={{fontWeight: 'bold', color: 'white'}}>DutyFree</Text>
                                </View>
                            </TouchableBounce>
                        </View>
                        <View style={{width: '100%', paddingHorizontal: 10, flexDirection: 'row', marginBottom: 20}}>
                            <TouchableBounce style={{flex: 1, height: 50}} onPress={() => this.setState({gustoOtros: !this.state.gustoOtros})}>
                                <View style={[{ height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginLeft: 0}, this.state.gustoOtros ? {backgroundColor: 'rgba(255,255,255,0.5)'} : {backgroundColor: 'rgba(255,255,255,0.1)'}]}>
                                    <Text style={{fontWeight: 'bold', color: 'white'}}>Otros</Text>
                                </View>
                            </TouchableBounce>
                        </View>
                    </View>
                    </ScrollView>
                    <View style={{width: '100%', height: 60 + 20, paddingVertical: 10, backgroundColor: Color.secondaryColor, elevation: 20, borderTopColor: 'rgba(255,255,255,0.1)', borderTopWidth: 0.5}}>
                        <TouchableBounce style={{width: Dimensions.window.width - 20, height: 60, marginLeft: 10}} onPress={() => this._createUser()}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: 'white', borderRadius: 16, justifyContent: 'center', alignItems: 'center'}}>
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