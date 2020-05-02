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
            <View style={[styles.container, Platform.OS == "ios" ? {marginTop: 20} : null]}>
                <Text style={styles.title}>Mi perfil</Text>

                <View style={{paddingHorizontal: 16, paddingVertical: 16, borderRadius: 16, elevation: 10, backgroundColor: 'white', marginHorizontal: 16}}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Image
                            style={{backgroundColor: '#ebebeb', width: PROFILE_CIRCLE, height: PROFILE_CIRCLE, borderRadius: PROFILE_CIRCLE/2, marginRight: 16}}
                            resizeMode="cover"
                            source={require('../assets/profile.jpg')}
                        />
                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold', color: Color.text.title}}>Albert Granados</Text>
                            <Text style={{fontSize: 14, color: Color.text.indications, marginBottom: 6}}>97483948L</Text>
                            <LinearGradient colors={['#ebcb3f', '#d9b92e', '#ebcb3f']} style={{paddingHorizontal: 10, paddingVertical: 6, marginTop: 6, borderRadius: 10}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>G O L D   P A S S</Text>
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={{height: 50, marginTop: 16}}>
                        <Image
                            style={{height: 50, width: '100%'}}
                            resizeMode="center"
                            source={require('../assets/Codigo_barras.png')}
                        />
                    </View>
                </View>

                <View style={{paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16, elevation: 10, backgroundColor: 'white', marginHorizontal: 16, marginTop: 16}}>
                    <View style={{height: 50, borderBottomWidth: 1, borderColor: 'lightgray', alignItems: 'center', paddingHorizontal: 16, flexDirection: 'row'}}>
                        <Ionicons color={Color.text.content} style={{marginRight: 20}} name="md-person" size={20}/>
                        <Text style={{flex: 1, color: Color.text.title, fontSize: 16}}>Mis datos</Text>
                        <View><Ionicons color={Color.text.indications} name="ios-arrow-forward" size={14}/></View>
                    </View>
                    <View style={{height: 50, borderBottomWidth: 1, borderColor: 'lightgray', alignItems: 'center', paddingHorizontal: 16, flexDirection: 'row'}}>
                        <Ionicons color={Color.text.content} style={{marginRight: 20}} name="md-airplane" size={20}/>
                        <Text style={{flex: 1, color: Color.text.title, fontSize: 16}}>Mis vuelos</Text>
                        <View><Ionicons color={Color.text.indications} name="ios-arrow-forward" size={14}/></View>
                    </View>
                    <View style={{height: 50, borderBottomWidth: 1, borderColor: 'lightgray', alignItems: 'center', paddingHorizontal: 16, flexDirection: 'row'}}>
                        <Ionicons color={Color.text.content} style={{marginRight: 20}} name="ios-information-circle-outline" size={20}/>
                        <Text style={{flex: 1, color: Color.text.title, fontSize: 16}}>Información</Text>
                        <View><Ionicons color={Color.text.indications} name="ios-arrow-forward" size={14}/></View>
                    </View>
                    <View style={{height: 50, borderBottomWidth: 0, borderColor: 'lightgray', alignItems: 'center', paddingHorizontal: 16, flexDirection: 'row'}}>
                        <Ionicons color={Color.text.content} style={{marginRight: 20}} name="ios-hammer" size={20}/>
                        <Text style={{flex: 1, color: Color.text.title, fontSize: 16}}>Preferencias</Text>
                        <View><Ionicons color={Color.text.indications} name="ios-arrow-forward" size={14}/></View>
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
        backgroundColor: 'white'
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