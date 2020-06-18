import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";
import { AppLoading, Logs} from "expo";

import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import LogInScreen2 from './screens/LogInScreen2'

const USER_ID = '5ed2aa4b9124c100284808e4';

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
        currentUserId: undefined,
        user: {},
        isLoadingComplete: false,
        formRegister: false,
        formLogin: true,
      };
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  /*_onRegister = () => {
    this.setState({loggedIn: true})

    fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/', { method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: "44444446L",
        name: "Leo Messi",
        email: "leomessi@gmail.com",
        birthdate: '1983-05-23',
        phone: "12345678",
        password: "123456789",
        country: "Argentina",
        city: "Barcelona",
        location_x: "0",
        location_y: "0",
        url_image: "https://www.fcbarcelona.com/fcbarcelona/photo/2019/05/13/d592810d-1e3d-4ecf-826f-af71e65f7edd/mini_Messi-celebraci-gol.jpg",
    })}) // URL de la API, en nuestro caso sera localhost
        .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
        .then(json => { // cuando ya esté en formato json
            console.log("USUARIO REGISTRADO: " + json.id)
            //console.log("REGISTRO: " + JSON.stringify(json))
            //this.setState({user: json})
            fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/', { method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: json.id,
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
                console.log("GUSTOS AÑADIDOS")
            }).catch(function(error) {
                console.log('Error obteniendo los datos: ' + error.message);
            })
        }).catch(function(error) {
            console.log('Error obteniendo los datos: ' + error.message);
        })
  }*/

  _onRegister = (user) => {
    this.setState({loggedIn: true, user: user})
  }

  _onLogIn = (user) => {
    this.setState({loggedIn: true, user: user})
  }

  _registerForm = () => {
    this.setState({formLogin: !this.state.formLogin})
  }

  render() {
      return (
        <NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            {
              this.state.loggedIn ?
                <HomeScreen
                  user={this.state.user}
                />
              :
                this.state.formLogin ?
                  <LogInScreen2
                    onLogin={(user) => this._onLogIn(user)}
                    registerForm={() => this._registerForm()}
                    //onRegister={(user) => this._onRegister(user)}
                  />
                :
                  <RegisterScreen
                    registerForm={() => this._registerForm()}
                    onRegister={(user) => this._onRegister(user)}
                  />
            }
        </NavigationContainer>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
