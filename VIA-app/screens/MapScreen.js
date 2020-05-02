import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import * as Permissions from 'expo-permissions';

import MapView from 'react-native-maps';

const latitudeMetters = 0.01; //Equivale a una unidad de metro
const longitudeMetters = 0.018; //Equivale a una unidad de metro

class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRegion: {
                latitude: 41.2550165,
                longitude: 1.7354281,
                latitudeDelta: 0.022,
                longitudeDelta: 0.0421,
            },
            locationPrueba: null,
        }
        
        this.coordenates = {
            image: [
                [
                    this.getYdesviation(-2.7),
                    this.getXdesviation(1.3),
                ],
                [
                    this.getYdesviation(-3.4),
                    this.getXdesviation(2.3),
                ],
            ],
            fondo: [
                {
                    latitude: (this.state.initialRegion.latitude + 0.01),
                    longitude: (this.state.initialRegion.longitude + 0.01 ),
                },
                {
                    latitude: (this.state.initialRegion.latitude - 0.01),
                    longitude: (this.state.initialRegion.longitude + 0.01),
                },
                {
                    latitude: (this.state.initialRegion.latitude - 0.01),
                    longitude: (this.state.initialRegion.longitude - 0.01),
                },
                {
                    latitude: (this.state.initialRegion.latitude + 0.01),
                    longitude: (this.state.initialRegion.longitude - 0.01),
                },
            ],
            baseAirport: [
                {
                    latitude: 41.223,
                    longitude: 1.737,
                },
                {
                    latitude: 41.223,
                    longitude: 1.733,
                },
                {
                    latitude: 41.221,
                    longitude: 1.733,
                },
                {
                    latitude: 41.221,
                    longitude: 1.737,
                },
            ],
                        
        }
    }

    componentDidMount() {
        /*navigator.geolocation.watchPosition((position) => {
          console.log(position)
        });*/
        this.getLocationAsync();
    }

    getYdesviation(meters){
        let latitude = (this.state.initialRegion.latitude + (latitudeMetters * meters))
        console.log("Y RESULTADO: " + latitude)
        return latitude;
    }

    getXdesviation(meters){
        let longitude = (this.state.initialRegion.longitude + (longitudeMetters * meters))
        console.log("X RESULTADO: " + longitude)
        return longitude;
    }

    findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);

                this.setState({ locationPrueba: location });
                console.log(this.state.locationPrueba)
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

    async getLocationAsync() {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            this.findCoordinates();
            return console.log("✅ Location permission granted.");
        } else {
            throw new Error('‼ Location permission not granted');
        }
    }

    measure(lat1, lon1, lat2, lon2)
    {  // generally used geo measurement function
        var R = 6378.137; // Radius of earth in KM
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d * 1000; // meters
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
                    
                    {/*<MapView.Polygon
                        coordinates={this.coordenates.fondo}
                        strokeColor={'#fff2d9'}
                        strokeWidth={3}
                        fillColor={'#fff2d9'}
                    />
                    <MapView.Polygon
                        coordinates={this.coordenates.baseAirport}
                        strokeColor={'rgba(181,181,181,1)'}
                        strokeWidth={3}
                        fillColor={'rgba(219,219,219,1)'}
                    />*/}
                        <MapView.Overlay 
                            image={require('../assets/mapa_t2.png')}
                            style={{}}
                            bounds={this.coordenates.image}
                            tappable={false}
                        />
                </MapView>
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