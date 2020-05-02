import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import Dimensions from "../constants/Dimensions";
import Ionicons from 'react-native-vector-icons/Ionicons';

const PAGE_INDICATOR_HEIGHT = 0;

class BoardingPass extends Component {
    render() {
        return (
            <View style={[styles.content, {height: Dimensions.window.height - Dimensions.bottomBar.height - Dimensions.statusBar.height - PAGE_INDICATOR_HEIGHT}]}>
                <View style={{backgroundColor: 'white', borderRadius: 20, height: '100%', width: '100%'}}>
                    <Image
                        style={{width: 100, height: 50, marginLeft: 16, marginTop: 16}}
                        resizeMode="contain"
                        source={require('../assets/vuelinglogo.png')}
                    />
                    <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: 26}}>
                        <View style={{flex: 1.25}}>
                            <Text style={{fontWeight: 'bold', fontSize: 26, color: '#333333'}}>BCN</Text>
                            <Text numberOfLines={2} style={{fontSize: 12, color: '#a3a3a3'}}>Aeroport Josep Tarradellas</Text>
                            <Text numberOfLines={2} style={{fontSize: 12, color: '#333333'}}>Barcelona</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', rotation: 90 }}>
                            <Ionicons name="md-airplane" color={'#f9a855'} size={36}/>
                        </View>
                        <View style={{flex: 1.25}}>
                            <Text style={{fontWeight: 'bold', fontSize: 26, color: '#333333'}}>CDG</Text>
                            <Text numberOfLines={2} style={{fontSize: 12, color: '#a3a3a3'}}>Aéroport Charles de Gaulle</Text>
                            <Text numberOfLines={2} style={{fontSize: 12, color: '#333333'}}>París</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: 26, marginTop: 26}}>
                        <View style={{flex: 1}}>
                            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#bfbfbf'}}>EMBARQUE:</Text>
                            <Text numberOfLines={2} style={{fontSize: 16, color: '#333333'}}>08:00h.</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#bfbfbf'}}>SALIDA:</Text>
                            <Text numberOfLines={2} style={{fontSize: 16, color: '#333333'}}>08:45h.</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#bfbfbf'}}>ASIENTO:</Text>
                            <Text numberOfLines={2} style={{fontSize: 16, color: '#333333'}}>26E</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: 26, marginTop: 26}}>
                        <View style={{flex: 1}}>
                            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#bfbfbf'}}>PASAJERO:</Text>
                            <Text numberOfLines={2} style={{fontSize: 16, color: '#333333'}}>ALBERT GRANADOS ROMERO</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 26, marginTop: -22}}>
                        <Image
                            style={{height: '70%'}}
                            resizeMode="contain"
                            source={require('../assets/qr.png')}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <Ionicons style={{rotation: 90, marginRight: 10}} name="md-search" color={'#bfbfbf'} size={14}/>
                            <Text style={{fontSize: 14, color: '#bfbfbf'}}>Pulsa para ampliar</Text>
                        </View>
                    </View>
                </View>

                <View style={{position: 'absolute', bottom: '20%', width: '100%', height: 30, flexDirection: 'row'}}>
                    <View style={{height: 30, width: 30, borderRadius: 20, backgroundColor: '#f9a855'}}>

                    </View>
                    <View style={{width: Dimensions.window.width - 60}}>

                    </View>
                    <View style={{height: 30, width: 30, borderRadius: 15, alignSelf: 'flex-end', backgroundColor: '#f9a855'}}>

                    </View>
                </View>

            </View>
        );
    }
}
export default BoardingPass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        width: '100%',
        height: '100%',
        paddingTop: 16,
        paddingBottom: 26,
        paddingHorizontal: 16
    }
});