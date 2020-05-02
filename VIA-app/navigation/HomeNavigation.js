import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { LinearGradient } from 'expo-linear-gradient'

import Dimensions from '../constants/Dimensions'
import MapScreen from '../screens/MapScreen'
import ShoppingScreen from '../screens/ShoppingScreen'
import MyPassScreen from '../screens/MyPassScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createBottomTabNavigator();

const activeColor = '#f9a149';

function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ height: Dimensions.bottomBar.height, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 12 }}>
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
              >
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Ionicons name={tabBarIconName} color={isFocused ? activeColor : '#222'} size={22}/>
                  <Text style={{fontSize: 12, fontWeight: 'bold', color: isFocused ? activeColor : '#222' }}>
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
              >
                  <View style={{backgroundColor: '#f57b42', height: Dimensions.bottomBar.height, width: Dimensions.bottomBar.height, borderRadius: Dimensions.bottomBar.height / 2, marginBottom: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="md-airplane" color={'white'} size={36}/>
                  </View>
              </TouchableBounce>
          );
        })}
      </View>
    );
}

class HomeNavigation extends Component {
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
                    component={MapScreen} 
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
                    component={ShoppingScreen} 
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
                    component={MyPassScreen}
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
                    component={NotificationsScreen} 
                    options={{
                      tabBarIconName: 'md-alert',
                        tabBarLabel: 'Alertas',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="md-alert" color={color} size={size}/>
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Profile"
                    component={ProfileScreen} 
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
export default HomeNavigation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});