import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

import Dimensions from "../constants/Dimensions";
import Color from "../constants/Colors";

const HEIGHT = 100;

class AvisoItem extends Component {
    render() {
        return (
            <View style={styles.avisoContainer}>
                {this.props.mode == 1 ?
                    <View style={{flexDirection: 'row', marginBottom: 6}}>
                        <View style={{borderRadius: 6, backgroundColor: '#448ee3', marginRight: 6, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <Image style={{height: 15, width: 15, tintColor: 'white', marginLeft: 6}} source={require('../assets/car_icon.png')}/>
                            <Text style={{fontWeight: 'bold', color: 'white', marginHorizontal: 6, marginVertical: 2}}>{this.props.numvuelo}</Text>
                        </View>
                    </View>
                : this.props.mode == 2 ?
                    <View style={{flexDirection: 'row', marginBottom: 6}}>
                        <View style={{borderRadius: 6, backgroundColor: '#3eb855', marginRight: 6, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <Image style={{height: 14, width: 9, tintColor: 'white', marginLeft: 6}} source={require('../assets/open_door_icon.png')}/>
                            <Text style={{fontWeight: 'bold', color: 'white', marginHorizontal: 6, marginVertical: 2}}>{this.props.numvuelo}</Text>
                        </View>
                        <View style={{borderRadius: 6, backgroundColor: '#f26161', marginRight: 6, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <Image style={{height: 15, width: 15, tintColor: 'white', marginLeft: 6}} source={require('../assets/time_icon.png')}/>
                            <Text style={{fontWeight: 'bold', color: 'white', marginHorizontal: 6, marginVertical: 2}}>Hasta las 07.15h.</Text>
                        </View>
                    </View>
                : this.props.mode == 3 ?
                    <View style={{flexDirection: 'row', marginBottom: 6}}>
                        <View style={{borderRadius: 6, backgroundColor: '#3eb855', marginRight: 6, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <Image style={{height: 13, width: 13, tintColor: 'white', marginLeft: 6}} source={require('../assets/plane_icon.png')}/>
                            <Text style={{fontWeight: 'bold', color: 'white', marginHorizontal: 6, marginVertical: 2}}>{this.props.numvuelo}</Text>
                        </View>
                    </View>
                :
                    null
                }
                <View style={{flexDirection: 'row', marginBottom: 6}}>
                    <Image style={{height: 15, width: 15, tintColor: Color.primaryColor, marginRight: 6, marginTop: 5}} source={require('../assets/campana.png')}/>
                    <Text style={styles.tituloText}>{this.props.title}</Text>
                </View>
                <Text style={styles.contentText}>{this.props.text}</Text>
                <View style={{alignItems: 'flex-end'}}>
                    <Text style={{color: Color.text.indications, fontSize: 12}}>{this.props.tiempo}</Text>
                </View>
            </View>
        );
    }
}
export default AvisoItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avisoContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 4,
        width: Dimensions.window.width - 32,
        paddingHorizontal: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        paddingVertical: 16,
        justifyContent: 'center'
    },
    tituloText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Color.primaryColor,
    },
    contentText: {
        color: Color.text.content,
        marginBottom: 6
    }
});