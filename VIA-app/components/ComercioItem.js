import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { LinearGradient } from 'expo-linear-gradient'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Color from "../constants/Colors";
import Dimensions from "../constants/Dimensions";

class ComercioItem extends Component {
    render() {
        return (
            <View style={styles.comercioItem}>
                <Image
                    style={{width: '100%', height: 100, borderRadius: 8}}
                    resizeMode="cover"
                    source={{ uri: this.props.url}}
                />
                <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 6, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', marginRight: 10}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: Color.text.title}}>{this.props.titulo}</Text>
                        <Text style={{fontSize: 14, color: Color.text.indications}}>{this.props.subtitulo}</Text>
                        <View style={{flexDirection: 'row', marginTop: 5}}>
                            {
                                this.props.estrellas.map((item, index) => {
                                    return(
                                        <Ionicons color={Color.primaryColor} style={{marginRight: 4, }} name="md-star" size={14}/>
                                    )
                                })
                            }
                            
                        </View>
                    </View>
                    {/*<View style={{height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <TouchableBounce onPress={() => null} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 50, width: 50}}>
                            <View style={{backgroundColor: Color.primaryColor, height: 30, width: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Ir</Text>
                            </View>
                        </TouchableBounce>
                        </View>*/}
                </View>
            </View>
        );
    }
}
export default ComercioItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    comercioItem: {
        height: 200, 
        width: Dimensions.window.width - 20, 
        marginHorizontal: 10, 
        elevation: 10, 
        backgroundColor: 'white', 
        borderRadius: 16, 
        marginVertical: 6,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
});