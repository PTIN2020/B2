import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import Dimensions from "../constants/Dimensions";

import Ionicons from 'react-native-vector-icons/Ionicons';

import BoardingPass from "../components/BoardingPass";

class MyPassScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tarjeta: {},
            vuelo: {},
            isLoaded: false,
            status: 304,
        };
    }

    componentDidMount() {
        var self = this;

        fetch('http://craaxcloud.epsevg.upc.edu:35300/api/boarding_passesOne/' + this.props.user.id)
        .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
        .then(json => { // cuando ya esté en formato json

            this.setState({
                tarjeta: json,
            })

            fetch('http://craaxcloud.epsevg.upc.edu:35300/api/flightsOne/', { method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: json.flights
            })})
            .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
            .then(json => { // cuando ya esté en formato json

                this.setState({
                    isLoaded: true, // decimos que ya ha cargado
                    vuelo: json,
                })

                console.log("VUELO: " + JSON.stringify(json))

            }).catch(function(error) {
                console.log('Error obteniendo los datos: ' + error.message);
            })

        }).catch(function(error) {
            console.log('Error obteniendo los datos: ' + error.message);
        })

        setInterval(
            function() {
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/boarding_passesOne/' + self.props.user.id)
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json

                    self.setState({
                        tarjeta: json,
                    })

                    fetch('http://craaxcloud.epsevg.upc.edu:35300/api/flightsOne/', { method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: json.flights
                    })})
                    .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                    .then(json => { // cuando ya esté en formato json

                        self.setState({
                            isLoaded: true, // decimos que ya ha cargado
                            vuelo: json,
                        })

                        console.log("VUELO: " + JSON.stringify(json))

                    }).catch(function(error) {
                        console.log('Error obteniendo los datos: ' + error.message);
                    })

                }).catch(function(error) {
                    console.log('Error obteniendo los datos: ' + error.message);
                })
            }
        , 5000);

    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{position: 'absolute', top: 0, height: 400, marginTop: -100, opacity: 0.4}}
                    resizeMode="contain"
                    source={require('../assets/world_map.png')}
                />
                <View style={{height: Dimensions.statusBar.height, width: '100%'}}></View>
                {/*<View style={{height: '100%', width: '100%', borderRadius: 20, backgroundColor: 'white'}}>

                </View>*/}

                { !this.state.isLoaded || this.state.tarjeta == null ? 
                    <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20, paddingHorizontal: 20, textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginTop: 100}}>Todavía no tienes ninguna tarjeta de embarque</Text>
                    </View>
                :
                    <BoardingPass
                        horaLlegada={this.state.vuelo != null ? this.state.vuelo.arrival_time + "h." : null}
                        horaSalida={this.state.vuelo != null ? this.state.vuelo.departure_time + "h." : null}
                        destinoAeropuerto={this.state.vuelo != null ? this.state.vuelo.to.split(";")[2] : null}
                        destinoAbreviatura={this.state.vuelo != null ? this.state.vuelo.to.split(";")[0] : null}
                        destinoCiudad={this.state.vuelo != null ? this.state.vuelo.to.split(";")[1] : null}
                        aerolinea={this.state.vuelo != null ? this.state.vuelo.airline : null}
                        numvuelo={this.state.tarjeta.flights}
                        nombrePasajero={this.state.tarjeta == {} ? null : this.state.tarjeta.name_passenger}
                        asiento={this.state.tarjeta == {} ? null : this.state.tarjeta.seat}
                    />
                }
                

                {/*<ViewPager style={styles.viewPager} initialPage={0}>
                    <View key="1">
                        <BoardingPass/>
                    </View>
                    <View key="2">
                        <BoardingPass/>
                    </View>
                </ViewPager>*/}
                
                
            </View>
        );
    }
}
export default MyPassScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f9a855'
    },
    content: {
        width: '100%',
        height: '100%',
        paddingTop: 16,
        paddingBottom: 26,
        paddingHorizontal: 16
    },
    viewPager: {
        flex: 1,
    },
});