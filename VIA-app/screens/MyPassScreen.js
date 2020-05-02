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

                <BoardingPass/>

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