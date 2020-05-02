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

const PROFILE_CIRCLE = 80;

class ProfileScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30}}>
                    <Image
                        style={{width: 100, height: 75, marginLeft: 16, marginTop: 16, marginBottom: 16}}
                        resizeMode="contain"
                        source={require('../assets/via.png')}
                    />
                    <Text style={{fontSize: 26, fontWeight: 'bold', color: 'white', textAlign: 'center'}}>Vilanova International Airport</Text>
                    <Text style={{fontSize: 20, color: 'white'}}>Terminal 2</Text>

                    <View style={{ width: '70%', height: 50, marginHorizontal: 20, backgroundColor: 'rgba(255,255,255, 0.1)', borderRadius: 16, marginTop: 70, justifyContent: 'center', paddingHorizontal: 16}}>
                        <Text style={{color: 'white', opacity: 0.7}}>Usuario</Text>
                    </View>
                    <View style={{ width: '70%', height: 50, marginHorizontal: 20, backgroundColor: 'rgba(255,255,255, 0.1)', borderRadius: 16, marginTop: 10, justifyContent: 'center', paddingHorizontal: 16}}>
                        <Text style={{color: 'white', opacity: 0.7}}>Contraseña</Text>
                    </View>
                    <View style={{ width: '70%', height: 50, marginHorizontal: 20, backgroundColor: 'rgba(0,0,0, 0.05)', borderRadius: 16, marginTop: 26, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16}}>
                        <Text style={{color: 'black', opacity: 0.3, fontWeight: 'bold'}}>Iniciar Sesión</Text>
                    </View>
                </View>

            </View>
        );
    }
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.primaryColor
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