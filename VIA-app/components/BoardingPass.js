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
                    <View style={{flexDirection: 'row', flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            style={{width: 100, height: 50, marginLeft: 16, marginTop: 16}}
                            resizeMode="contain"
                            source={ 
                            this.props.aerolinea == 'IBERIA' ?
                                require('../assets/iberia.png') 
                            : this.props.aerolinea == 'Vueling' ?
                                require('../assets/vuelinglogo.png')
                            : this.props.aerolinea == 'AirEuropa' ?
                                require('../assets/aireuropa.png')
                            : this.props.aerolinea == 'Vilanova Airlines' ?
                                require('../assets/via.png')
                            : this.props.aerolinea == 'QATAR Airways' ?
                                require('../assets/qatarairways.png')
                            : this.props.aerolinea == 'KLM' ?
                                require('../assets/klm.png')
                            :
                                require('../assets/vuelinglogo.png')
                            }
                        />
                        <View style={{flexDirection: 'row-reverse', flex: 1, marginLeft: 20, marginTop: 20}}>
                            <View style={{flexDirection: 'row', marginBottom: 6, height: 30}}>
                                <View style={{borderRadius: 6, backgroundColor: '#3eb855', marginRight: 6, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                    <Image style={{height: 13, width: 13, tintColor: 'white', marginLeft: 6}} source={require('../assets/plane_icon.png')}/>
                                    <Text style={{fontWeight: 'bold', color: 'white', marginHorizontal: 6, marginVertical: 2}}>{this.props.numvuelo}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: 26}}>
                        <View style={{flex: 1.25}}>
                            <Text style={{fontWeight: 'bold', fontSize: 26, color: '#333333'}}>VIA</Text>
                            <Text numberOfLines={2} style={{fontSize: 12, color: '#a3a3a3'}}>Vilanova Intelligent Airport</Text>
                            <Text numberOfLines={2} style={{fontSize: 12, color: '#333333'}}>Vilanova i la Geltrú</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', rotation: 90 }}>
                            <Ionicons name="md-airplane" color={'#f9a855'} size={36}/>
                        </View>
                        <View style={{flex: 1.25}}>
                            <Text style={{fontWeight: 'bold', fontSize: 26, color: '#333333'}}>{this.props.destinoAbreviatura}</Text>
                            <Text numberOfLines={2} style={{fontSize: 12, color: '#a3a3a3'}}>{this.props.destinoAeropuerto}</Text>
                            <Text numberOfLines={2} style={{fontSize: 12, color: '#333333'}}>{this.props.destinoCiudad}</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: 26, marginTop: 26}}>
                        <View style={{flex: 1}}>
                            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#bfbfbf'}}>SALIDA:</Text>
                            <Text numberOfLines={2} style={{fontSize: 16, color: '#333333'}}>{this.props.horaSalida}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#bfbfbf'}}>LLEGADA:</Text>
                            <Text numberOfLines={2} style={{fontSize: 16, color: '#333333'}}>{this.props.horaLlegada}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#bfbfbf'}}>ASIENTO:</Text>
                            <Text numberOfLines={2} style={{fontSize: 16, color: '#333333'}}>{this.props.asiento}</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: 26, marginTop: 26}}>
                        <View style={{flex: 1}}>
                            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#bfbfbf'}}>PASAJERO:</Text>
                            <Text numberOfLines={2} style={{fontSize: 16, color: '#333333'}}>{this.props.nombrePasajero}</Text>
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