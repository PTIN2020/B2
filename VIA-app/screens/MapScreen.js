import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
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

    getCoordinates(x, y){

        let unitY = (mapTopLeftLatitude - mapBottomRightLatitude) / 338;
        let puntoX = mapTopLeftLongitude + ((mapTopLeftLongitude * xReference) / 100);
        let unitX = (puntoX - mapTopLeftLongitude) / 141;

        console.log("PUNTO X: " + puntoX)
        
        let coordinatesYtop = (mapTopLeftLatitude - (unitY * y)) + (unitY * (mapIconSize/2));
        let coordinatesXtop = (mapTopLeftLongitude + (unitX * x)) - (unitX * (mapIconSize/2));

        console.log("coordinatesYtop: " + coordinatesYtop)

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
        this.setState({showPreguntaIrParada: true, destino: [parada, x, y]})
        console.log(parada + ", " + x + ", " + y)
    }

    onPressAccepted = () => {
        this.setState({accepted: true, showPreguntaIrParada: false})
        console.log("(API) PUT: " + "/" + 242 + "-" + 265 + "/" + 448 + "-" + 165)
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
                                    image={require('../assets/parada_coche_S3.png')}
                                    style={{}}
                                    bounds={this.getCoordinates(242,165)}
                                    tappable={true}
                                    onPress={() => this.onPressParada("S3", 242, 165)}
                                />

                                <MapView.Overlay 
                                    image={require('../assets/parada_coche_E2.png')}
                                    style={{}}
                                    bounds={this.getCoordinates(448,165)}
                                    tappable={true}
                                    onPress={() => this.onPressParada("E2", 448, 165)}
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
                                bounds={this.getCoordinates(118,165)}
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

                        <MapView.Overlay 
                            image={require('../assets/ubication.png')}
                            style={{}}
                            bounds={this.getCoordinates(200, 140)}
                            tappable={true}
                            onPress={() => this.onPressParada("S5", 141, 302)}
                        />
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
                                source={require('../assets/parada_coche_E2.png')}
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
                                <TouchableOpacity style={{ padding: 16}}>
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
                        <TouchableOpacity style={{padding: 16}} onPress={() => this.onPressLlegado()}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8}}>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Por favor, dirígete a la parada S3.</Text>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>Tu coche llegará enseguida...</Text>  
                            <Image
                                source={require('../assets/parada_coche_S3.png')}
                                style={{height: 50, width: 50}}
                            />
                        </View>
                        </TouchableOpacity>
                    </View>
                :
                    null
                }

                {this.state.llegado ?
                    <View style={{backgroundColor: 'white', paddingVertical: 8, position: 'absolute', top: 30, left : 16, right: 16, borderRadius: 16, elevation: 16}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8}}>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>Tu coche te está esperando en la parada</Text>
                            <Image
                                source={require('../assets/parada_coche_S3.png')}
                                style={{height: 50, width: 50, marginTop: 16}}
                            />
                        </View>
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