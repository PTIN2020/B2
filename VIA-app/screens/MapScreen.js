import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback
} from "react-native";

import * as Permissions from 'expo-permissions';
import Dimensions from '../constants/Dimensions'
import Colors from '../constants/Colors'

import MapView from 'react-native-maps';
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

const latitudeMetters = 0.01; //Equivale a una unidad de metro
const longitudeMetters = 0.018; //Equivale a una unidad de metro

const initialLatitude = 41.222495;
const initialLongitude = 1.736242;

const mapTopLeftLatitude = initialLatitude + 0.003892;
const mapTopLeftLongitude = initialLongitude - 0.00776;
const mapBottomRightLatitude = initialLatitude - 0.005291;
const mapBottomRightLongitude = initialLongitude + 0.020436;

const mapIconSize = 45; //Size respecto puntos del mapa

const puntoXCurva = 1.733952
const xReference = 100 - ((mapTopLeftLongitude * 100) / puntoXCurva)

class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRegion: {
                latitude: initialLatitude,
                longitude: initialLongitude,
                latitudeDelta: 0.019,
                longitudeDelta: 0.0061,
                items: []
            },
            showPreguntaIrParada: false,
            firstAccepted: false,
            secondAccepted: false,
            accepted: false,
            llegado: false,
            destino: [],
            origen: [],
        }
        
        this.coordenates = {
            image: [
                [
                    mapTopLeftLatitude, //41,226387
                    mapTopLeftLongitude //1.728482
                ],
                [
                    mapBottomRightLatitude, //41.217204, 
                    mapBottomRightLongitude, //1.756678
                ]
            ],
        }
    }

    componentDidMount() {
        var self = this;

        console.log("USER MAP: " + this.props.user._id)

        setInterval(
            function() {
                fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengers/' + self.props.user._id) // URL de la API, en nuestro caso sera localhost
                .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                .then(json => { // cuando ya esté en formato json
                    self.setState({
                        isLoaded: true, // decimos que ya ha cargado
                        items: json, // guardamos los datos en una lista llamada items
                    })
                }).catch(function(error) {
                    console.log('Error obteniendo los datos: ' + error.message);
                })
            }
        , 2000);

    }

    getCoordinates(x, y){

        let unitY = (mapTopLeftLatitude - mapBottomRightLatitude) / 338;
        let puntoX = mapTopLeftLongitude + ((mapTopLeftLongitude * xReference) / 100);
        let unitX = (puntoX - mapTopLeftLongitude) / 141;

        //console.log("PUNTO X: " + puntoX)
        
        let coordinatesYtop = (mapTopLeftLatitude - (unitY * y)) + (unitY * (mapIconSize/2));
        let coordinatesXtop = (mapTopLeftLongitude + (unitX * x)) - (unitX * (mapIconSize/2));

        //console.log("coordinatesYtop: " + coordinatesYtop)

        let coordinatesYBottom = (mapTopLeftLatitude - (unitY * y)) - (unitY * (mapIconSize/2));
        let coordinatesXBottom = (mapTopLeftLongitude + (unitX * x)) + (unitX * (mapIconSize/2));

        let coordinates = [
            [
                coordinatesYtop, 
                coordinatesXtop//coordinatesXtop//puntoX//1.733652//puntoX
            ],
            [
                coordinatesYBottom,
                coordinatesXBottom//coordinatesXBottom//puntoX + 0.001//1.734206//puntoX + 0.001
            ]
        ]
        
        return coordinates;
    }

    onPressParada = (parada, x, y) => {

        let idDestino = "12340";

        if(parada == "S1") idDestino = "12340"
        else if(parada == "S2") idDestino = "12341"
        else if(parada == "EX") idDestino = "12342"
        else if(parada == "S3") idDestino = "12343"
        else if(parada == "E1") idDestino = "12344"
        else if(parada == "E2") idDestino = "12345"
        else if(parada == "E3") idDestino = "12346"
        else if(parada == "E4") idDestino = "12347"
        else if(parada == "S4") idDestino = "12348"
        else if(parada == "S5") idDestino = "12349"

        this.setState({showPreguntaIrParada: true, destino: [parada, x, y, idDestino]})
        this.calcularParadaMasCercana(this.state.items.location_x, this.state.items.location_y);
        console.log("DESTINO: " + idDestino)
        //console.log(parada + ", " + x + ", " + y)
    }

    calcularParadaMasCercana = (userLocationX, userLocationY) => {
        let S1 = (Math.abs(141 - userLocationX)) + (Math.abs(36 - userLocationY))
        let S2 = (Math.abs(273 - userLocationX)) + (Math.abs(36 - userLocationY))
        let EX = (Math.abs(118 - userLocationX)) + (Math.abs(165 - userLocationY))
        let S3 = (Math.abs(242 - userLocationX)) + (Math.abs(165 - userLocationY))
        let E1 = (Math.abs(373 - userLocationX)) + (Math.abs(165 - userLocationY))
        let E2 = (Math.abs(448 - userLocationX)) + (Math.abs(165 - userLocationY))
        let E3 = (Math.abs(525 - userLocationX)) + (Math.abs(168 - userLocationY))
        let E4 = (Math.abs(614 - userLocationX)) + (Math.abs(168 - userLocationY))
        let S4 = (Math.abs(273 - userLocationX)) + (Math.abs(302 - userLocationY))
        let S5 = (Math.abs(141 - userLocationX)) + (Math.abs(302 - userLocationY))

        let paradas = [S1, S2, EX, S3, E1, E2, E3, E4, S4, S5]
        
        let parada_origen = "EX"
        let x_origen = 118
        let y_origen = 165
        let id_origen = 12340
        
        let min = 9999999;

        for(let i = 0; i < paradas.length - 1; i++){
            if(paradas[i] < min){ 
                min = paradas[i]
                id_origen = 12340 + i;
            }
        }

        console.log("ORIGEN: " + id_origen.toString())

        if(id_origen == 12340){
            x_origen = 141
            y_origen = 36
            parada_origen = "S1"
        } else if(id_origen == 12341) {
            x_origen = 273
            y_origen = 36
            parada_origen = "S2"
        } else if(id_origen == 12342) {
            x_origen = 118
            y_origen = 165
            parada_origen = "EX"
        } else if(id_origen == 12343) {
            x_origen = 242
            y_origen = 165
            parada_origen = "S3"
        } else if(id_origen == 12344) {
            x_origen = 373
            y_origen = 165
            parada_origen = "E1"
        } else if(id_origen == 12345) {
            x_origen = 448
            y_origen = 165
            parada_origen = "E2"
        } else if(id_origen == 12346) {
            x_origen = 525
            y_origen = 168
            parada_origen = "E3"
        } else if(id_origen == 12347) {
            x_origen = 614
            y_origen = 168
            parada_origen = "E4"
        } else if(id_origen == 12348) {
            x_origen = 273
            y_origen = 302
            parada_origen = "S4"
        } else if(id_origen == 12349) {
            x_origen = 141
            y_origen = 302
            parada_origen = "S5"
        }

        this.setState({origen: [parada_origen, x_origen, y_origen, id_origen.toString()]})
    }

    onPressAccepted = () => {
        this.setState({accepted: true, showPreguntaIrParada: false})
        fetch('http://craaxcloud.epsevg.upc.edu:35301/api/pedircoche/', { method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idOrigen: this.state.origen[3],
            idDestino: this.state.destino[3],
        })}) // URL de la API, en nuestro caso sera localhost
            .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
            .then(json => { // cuando ya esté en formato json
                console.log(json)
            }).catch(function(error) {
                console.log('Error obteniendo los datos: ' + error.message);
            })
            
        //console.log("(API) POST: " + "/" + 242 + "-" + 265 + "/" + 448 + "-" + 165)
    }

    onPressLlegado = () => {
        this.setState({accepted: false, showPreguntaIrParada: false, llegado: true})
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={{width: '100%', height: '100%'}}
                    mapType={"satellite"}
                    showsUserLocation={true}
                    cacheEnabled={true}
                    initialRegion={this.state.initialRegion}
                    onPress={(e) => console.log(e.nativeEvent.coordinate)}
                >
                    
                        <MapView.Overlay 
                            image={require('../assets/mapa_t2.png')}
                            style={{}}
                            bounds={this.coordenates.image}
                            tappable={false}
                        />
                        
                        { this.state.accepted || this.state.llegado ?
                            <View>
                                <MapView.Overlay 
                                    image={
                                        this.state.origen[3] == "12340" ?
                                            require('../assets/parada_coche_S1.png')
                                        : this.state.origen[3] == "12341" ?
                                            require('../assets/parada_coche_S2.png')
                                        : this.state.origen[3] == "12342" ?
                                            require('../assets/parada_coche_ex.png')
                                        : this.state.origen[3] == "12343" ?
                                            require('../assets/parada_coche_S3.png')
                                        : this.state.origen[3] == "12344" ?
                                            require('../assets/parada_coche_E1.png')
                                        : this.state.origen[3] == "12345" ?
                                            require('../assets/parada_coche_E2.png')
                                        : this.state.origen[3] == "12346" ?
                                            require('../assets/parada_coche_E3.png')
                                        : this.state.origen[3] == "12347" ?
                                            require('../assets/parada_coche_E4.png')
                                        : this.state.origen[3] == "12348" ?
                                            require('../assets/parada_coche_S4.png')
                                        : this.state.origen[3] == "12349" ?
                                            require('../assets/parada_coche_S5.png')
                                        :
                                            require('../assets/parada_coche_ex.png')
                                    }
                                    style={{}}
                                    bounds={this.getCoordinates(this.state.origen[1],this.state.origen[2])}
                                    tappable={true}
                                    onPress={() => this.onPressParada(this.state.origen[0], this.state.origen[1], this.state.origen[2])}
                                />

                                <MapView.Overlay 
                                    image={
                                        this.state.destino[3] == "12340" ?
                                            require('../assets/parada_coche_S1.png')
                                        : this.state.destino[3] == "12341" ?
                                            require('../assets/parada_coche_S2.png')
                                        : this.state.destino[3] == "12342" ?
                                            require('../assets/parada_coche_ex.png')
                                        : this.state.destino[3] == "12343" ?
                                            require('../assets/parada_coche_S3.png')
                                        : this.state.destino[3] == "12344" ?
                                            require('../assets/parada_coche_E1.png')
                                        : this.state.destino[3] == "12345" ?
                                            require('../assets/parada_coche_E2.png')
                                        : this.state.destino[3] == "12346" ?
                                            require('../assets/parada_coche_E3.png')
                                        : this.state.destino[3] == "12347" ?
                                            require('../assets/parada_coche_E4.png')
                                        : this.state.destino[3] == "12348" ?
                                            require('../assets/parada_coche_S4.png')
                                        : this.state.destino[3] == "12349" ?
                                            require('../assets/parada_coche_S5.png')
                                        :
                                            require('../assets/parada_coche_ex.png')
                                    }
                                    style={{}}
                                    bounds={this.getCoordinates(this.state.destino[1],this.state.destino[2])}
                                    tappable={true}
                                    onPress={() => this.onPressParada(this.state.destino[0], this.state.destino[1], this.state.destino[2])}
                                />
                            </View>

                        : 

                        <View>

                            <MapView.Overlay 
                                image={require('../assets/parada_coche_S1.png')}
                                style={{}}
                                bounds={this.getCoordinates(141,36)}
                                tappable={true}
                                onPress={() => this.onPressParada("S1", 141, 36)}
                            />

                            <MapView.Overlay 
                                image={require('../assets/parada_coche_S2.png')}
                                style={{}}
                                bounds={this.getCoordinates(273,36)}
                                tappable={true}
                                onPress={() => this.onPressParada("S2", 273, 36)}
                            />

                            <MapView.Overlay 
                                image={require('../assets/parada_coche_ex.png')}
                                style={{}}
                                bounds={this.getCoordinates(90,165)}
                                tappable={true}
                                onPress={() => this.onPressParada("EX", 118, 165)}
                            />

                            <MapView.Overlay 
                                image={require('../assets/parada_coche_S3.png')}
                                style={{}}
                                bounds={this.getCoordinates(242,165)}
                                tappable={true}
                                onPress={() => this.onPressParada("S3", 242, 165)}
                            />

                            <MapView.Overlay 
                                image={require('../assets/parada_coche_E1.png')}
                                style={{}}
                                bounds={this.getCoordinates(373,165)}
                                tappable={true}
                                onPress={() => this.onPressParada("E1", 373, 165)}
                            />

                            <MapView.Overlay 
                                image={require('../assets/parada_coche_E2.png')}
                                style={{}}
                                bounds={this.getCoordinates(448,165)}
                                tappable={true}
                                onPress={() => this.onPressParada("E2", 448, 165)}
                            />

                            <MapView.Overlay 
                                image={require('../assets/parada_coche_E3.png')}
                                style={{}}
                                bounds={this.getCoordinates(525,168)}
                                tappable={true}
                                onPress={() => this.onPressParada("E3", 525, 168)}
                            />

                            <MapView.Overlay 
                                image={require('../assets/parada_coche_E4.png')}
                                style={{}}
                                bounds={this.getCoordinates(614,168)}
                                tappable={true}
                                onPress={() => this.onPressParada("E4", 614, 168)}
                            />

                            <MapView.Overlay 
                                image={require('../assets/parada_coche_S4.png')}
                                style={{}}
                                bounds={this.getCoordinates(273,302)}
                                tappable={true}
                                onPress={() => this.onPressParada("S4", 273, 302)}
                            />

                            <MapView.Overlay 
                                image={require('../assets/parada_coche_S5.png')}
                                style={{}}
                                bounds={this.getCoordinates(141,302)}
                                tappable={true}
                                onPress={() => this.onPressParada("S5", 141, 302)}
                            />
                            </View>
                        }
                        {this.state.isLoaded ?
                                <MapView.Overlay 
                                    image={require('../assets/ubication.png')}
                                    style={{}}
                                    bounds={this.getCoordinates(this.state.items.location_x, this.state.items.location_y)}
                                    tappable={true}
                                    onPress={() => this.onPressParada("S5", 141, 302)}/>
                            :
                                null
                        }
                </MapView>

                {this.state.showPreguntaIrParada ?
                    <View style={{backgroundColor: 'black', opacity: 0.4, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}/>
                :
                    null
                }

                {this.state.showPreguntaIrParada ?
                    <View style={{backgroundColor: 'white', position: 'absolute', top: (Dimensions.window.height/2) - 170, left : 32, right: 32, borderRadius: 16, elevation: 16}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32}}>
                            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>¿Quieres que un coche te recoja y te lleve hasta esta parada?</Text>
                            <Image
                                source={
                                    this.state.destino[0] == "S1" ?
                                        require('../assets/parada_coche_S1.png')
                                    : this.state.destino[0] == "S2" ?
                                        require('../assets/parada_coche_S2.png')
                                    : this.state.destino[0] == "S3" ?
                                        require('../assets/parada_coche_S3.png')
                                    : this.state.destino[0] == "S4" ?
                                        require('../assets/parada_coche_S4.png')
                                    : this.state.destino[0] == "S5" ?
                                        require('../assets/parada_coche_S5.png')
                                    : this.state.destino[0] == "EX" ?
                                        require('../assets/parada_coche_ex.png')
                                    : this.state.destino[0] == "E1" ?
                                        require('../assets/parada_coche_E1.png')
                                    : this.state.destino[0] == "E2" ?
                                        require('../assets/parada_coche_E2.png')
                                    : this.state.destino[0] == "E3" ?
                                        require('../assets/parada_coche_E3.png')
                                    : this.state.destino[0] == "E4" ?
                                        require('../assets/parada_coche_E4.png')
                                    :
                                        require('../assets/parada_coche_ex.png')
                                }
                                style={{height: 50, width: 50, marginTop: 16}}
                            />
                        </View>
                        <View style={{height: 1, width: '100%', backgroundColor: 'lightgray'}}/>
                        <View style={{height: 70, flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <TouchableOpacity style={{padding: 16}} onPress={() => this.onPressAccepted()}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sí</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{backgroundColor: 'lightgray', height: '100%', width: 1}}></View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <TouchableOpacity style={{ padding: 16}} onPress={() => this.setState({showPreguntaIrParada: false})}>
                                    <Text style={{fontSize: 20}}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                :
                    null
                }

                { this.state.accepted ?
                    <View style={{backgroundColor: 'white', paddingVertical: 8, position: 'absolute', top: 30, left : 16, right: 16, borderRadius: 16, elevation: 16}}>
                        <TouchableWithoutFeedback style={{padding: 16}} onPress={() => this.onPressLlegado()}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8}}>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Por favor, dirígete a la parada {this.state.origen[0]}.</Text>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>Tu coche llegará enseguida...</Text>  
                            <Image
                                source={
                                    this.state.origen[3] == "12340" ?
                                        require('../assets/parada_coche_S1.png')
                                    : this.state.origen[3] == "12341" ?
                                        require('../assets/parada_coche_S2.png')
                                    : this.state.origen[3] == "12342" ?
                                        require('../assets/parada_coche_ex.png')
                                    : this.state.origen[3] == "12343" ?
                                        require('../assets/parada_coche_S3.png')
                                    : this.state.origen[3] == "12344" ?
                                        require('../assets/parada_coche_E1.png')
                                    : this.state.origen[3] == "12345" ?
                                        require('../assets/parada_coche_E2.png')
                                    : this.state.origen[3] == "12346" ?
                                        require('../assets/parada_coche_E3.png')
                                    : this.state.origen[3] == "12347" ?
                                        require('../assets/parada_coche_E4.png')
                                    : this.state.origen[3] == "12348" ?
                                        require('../assets/parada_coche_S4.png')
                                    : this.state.origen[3] == "12349" ?
                                        require('../assets/parada_coche_S5.png')
                                    :
                                        require('../assets/parada_coche_ex.png')
                                }
                                style={{height: 50, width: 50}}
                            />
                        </View>
                        </TouchableWithoutFeedback>
                    </View>
                :
                    null
                }

                {this.state.llegado ?
                    <View style={{backgroundColor: 'white', paddingVertical: 8, position: 'absolute', top: 30, left : 16, right: 16, borderRadius: 16, elevation: 16}}>
                        <TouchableWithoutFeedback style={{padding: 16}} onPress={() => this.setState({showPreguntaIrParada: false,
                            firstAccepted: false,
                            secondAccepted: false,
                            accepted: false,
                            llegado: false
                        })}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8}}>
                                <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Tu coche ya ha llegado. Te está esperando en la parada</Text>
                                <Image
                                    source={require('../assets/parada_coche_S3.png')}
                                    style={{height: 50, width: 50, marginTop: 16}}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                :
                    null
                }

            </View>
        );
    }
}
export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});