import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { LinearGradient } from 'expo-linear-gradient'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Color from "../constants/Colors";
import Dimensions from "../constants/Dimensions";
import ComercioItem from "../components/ComercioItem"


class ShoppingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: undefined,
        };
        //this._loadClient = this._loadClient.bind(this);
    }

    componentDidMount() {
        fetch('http://192.168.1.145:3000/api/shops') // URL de la API, en nuestro caso sera localhost
        .then(res => res.json()) // Cuando recibamos los datos, se convierten en json .then(json => { // cuando ya esté en formato json
        .then(json => { // cuando ya esté en formato json
            this.setState({
                isLoaded: true, // decimos que ya ha cargado
                items: json, // guardamos los datos en una lista llamada items
            })
            console.log("JSON:" + JSON.stringify(json))
        }).catch(function(error) {
            console.log('Error obteniendo los datos: ' + error.message);
        });
    }

    /*componentDidMount() {
        this._loadClient();
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        const stitchAppClient = Stitch.defaultAppClient;
        const mongoClient = stitchAppClient.getServiceClient(
          RemoteMongoClient.factory,
          "mongodb-atlas"
        );
        const db = mongoClient.db("Vilanova International Airport");
        const comercios = db.collection("Comercios");
        comercios
          .find({ status: "1" }, { sort: { date: -1 } })
          .asArray()
          .then(docs => {
            this.setState({ comercios: docs });
            this.setState({ refreshing: false });
          })
          .catch(err => {
            console.warn(err);
          });
    };*/
    

    render() {
        /*const sections =
        this.state.tasks == undefined
            ? [{ data: [{ title: "Loading..." }], title: "Loading..." }]
            : this.state.tasks.length > 0
            ? [{ data: this.state.tasks, title: "Current Tasks" }]
            : [
                {
                data: [{ title: "No new tasks" }],
                title: "No new tasks"
                }
            ];*/
        return (
            <View style={styles.container}>
                <Text style={[styles.title, Platform.OS == "ios" ? {marginTop: 50} : null]}>Comercio</Text>
                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{flexDirection: 'row', marginBottom: 10, paddingBottom: 16, backgroundColor: 'white', elevation: 10}}>
                            <View style={[styles.categoryBox, {backgroundColor: Color.primaryColor, marginLeft: 16, elevation: 0}]}>
                                <Text style={[styles.titleCategories, {color: 'white'}]}>Todo</Text>
                            </View>
                            <View style={[styles.categoryBox, {}]}>
                                <Text style={styles.titleCategories}>Tiendas</Text>
                            </View>
                            <View style={[styles.categoryBox, {}]}>
                                <Text style={styles.titleCategories}>Restaurantes</Text>
                            </View>
                            <View style={[styles.categoryBox, {}]}>
                                <Text style={styles.titleCategories}>Ocio</Text>
                            </View>
                            <View style={[styles.categoryBox, {marginRight: 16}]}>
                                <Text style={styles.titleCategories}>Servicios</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{flex: 1}}>
                    <ScrollView>
                        { this.state.isLoaded ? 
                            this.state.items.map((item, index) => {
                                return (
                                    <ComercioItem
                                        key={"key-" + index}
                                        titulo={item.name}
                                        subtitulo={item.product_name}
                                        url={item.url_image}
                                        estrellas={[1,2,3]}
                                    />
                                )
                            })
                        :
                            null
                        }
                    </ScrollView>

                </View>
            </View>
        );
    }
}
export default ShoppingScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
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
    titleCategories: {
        color: Color.text.title,
        fontWeight: 'bold'
    },
    categoryBox:{
        paddingHorizontal: 16, 
        paddingVertical: 6, 
        elevation: 4,
        backgroundColor: 'white',
        borderRadius: 12, 
        borderColor: '#c9c9c9', 
        marginLeft: 10,
        marginTop: 6
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