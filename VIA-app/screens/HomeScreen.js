import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { LinearGradient } from 'expo-linear-gradient'

import Dimensions from '../constants/Dimensions'
import MapScreen from './MapScreen'
import ShoppingScreen from './ShoppingScreen'
import MyPassScreen from './MyPassScreen'
import NotificationsScreen from './NotificationsScreen'
import ProfileScreen from './ProfileScreen'
import Colors from "../constants/Colors";

const Tab = createBottomTabNavigator();

const activeColor = '#f9a149';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={[{ height: Dimensions.bottomBar.height, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 12 }, Platform.OS == "ios" ? {paddingBottom: 16, height: 80} : null]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const tabBarIconName = options.tabBarIconName;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          index != 2 ?
            <TouchableBounce
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}
              key={index}
            >
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons name={tabBarIconName} color={isFocused ? activeColor : Colors.text.title} size={22}/>
                <Text style={{fontSize: 12, fontWeight: isFocused ? 'bold' : 'bold', color: isFocused ? activeColor : Colors.text.title }}>
                  {label}
                </Text>
              </View>
            </TouchableBounce>
            :
            <TouchableBounce
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 7}}
              key={index}
            >
                <View style={{backgroundColor: '#f57b42', height: Dimensions.bottomBar.height, width: Dimensions.bottomBar.height, borderRadius: Dimensions.bottomBar.height / 2, marginBottom: 10, alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                        style={{width: 36, height: 36}}
                        resizeMode="contain"
                        source={require('../assets/via.png')}
                    />
                </View>
            </TouchableBounce>
        );
      })}
    </View>
  );
}

const USER_ID = '5ed2aa4b9124c100284808e4';

class HomeScreen extends Component {
  componentDidMount() {
    var self = this;

        console.log("USER HOMESCREEN: " + this.props.user.id)

        fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersLocation/', { method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: this.props.user.id,
            location_x: 118,
            location_y: 165
        })}) // URL de la API, en nuestro caso sera localhost
        .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
        .then(json => { // cuando ya esté en formato json     
        }).catch(function(error) {
            console.log('Error obteniendo los datos: ' + error.message);
        })

      let x = 0;
      let times = 9;
      let i = 0;
      let wait = 2000;

        setTimeout(function () {
        setInterval(
            function() {
                if(i <= times){
                    fetch('http://craaxcloud.epsevg.upc.edu:35300/api/passengersLocation/', { method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: self.props.user.id,
                        location_x: 118 + x,
                        location_y: 165
                    })}) // URL de la API, en nuestro caso sera localhost
                    .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
                    .then(json => { // cuando ya esté en formato json
                        x = x + 10;
                        i = i + 1;
                    }).catch(function(error) {
                        console.log('Error obteniendo los datos: ' + error.message);
                    })
                } 
            }
          , wait);
        }, 10000);
        
    }

    render() {
        return (
            <Tab.Navigator
                tabBar={props => <MyTabBar {...props}/>}
                tabBarOptions={{
                    style: styles.tabBarStyle,
                    labelStyle: styles.tabBarLabel,
                    activeTintColor: '#e91e63',
                }}
            >
                <Tab.Screen 
                    name="Mapa"
                    component={props => <MapScreen user={this.props.user}></MapScreen>} 
                    options={{
                        tabBarIconName: 'md-map',
                        tabBarLabel: 'Mapa',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="md-map" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Comercio"
                    component={props => <ShoppingScreen user={this.props.user}></ShoppingScreen>} 
                    options={{
                        tabBarIconName: 'ios-cart',
                        tabBarLabel: 'Comercio',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="ios-cart" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen 
                    name="My Pass"
                    component={props => <MyPassScreen user={this.props.user}></MyPassScreen>}
                    style={{position: 'absolute'}} 
                    options={{
                        tabBarIconName: 'md-airplane',
                        tabBarLabel: 'Pass',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="md-airplane" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Notifications"
                    component={props => <NotificationsScreen user={this.props.user}></NotificationsScreen>} 
                    options={{
                        tabBarIconName: 'md-notifications',
                        tabBarLabel: 'Alertas',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="md-alert" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Profile"
                    component={props => <ProfileScreen user={this.props.user}></ProfileScreen>} 
                    options={{
                        tabBarIconName: 'md-person',
                        tabBarLabel: 'Perfil',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="md-person" color={color} size={size}/>
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabBarStyle: {
        height: 60,
        paddingBottom: 10,
        paddingTop: 10,
    },
    tabBarLabel: {
        fontWeight: 'bold',
        marginBottom: -1
    }
});