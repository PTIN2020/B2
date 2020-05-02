import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";

import { getStatusBarHeight } from 'react-native-status-bar-height';
import Color from "../constants/Colors";

import AvisoItem from "../components/AvisoItem";

class NotificationsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Text style={[styles.title, Platform.OS == "ios" ? {marginTop: 50} : null]}>Mis alertas</Text>
                    <AvisoItem
                        title={"El coche está en camino..."}
                        text={"No te muevas, el coche que has pedido está en camino."}
                        tiempo={"Hace 1 min."}
                        mode={1}
                    />
                    <AvisoItem
                        title={"Puerta de embarque abierta"}
                        text={"Dirígete a la puerta de embarque. Tienes 30 minutos antes de que se cierre."}
                        tiempo={"Hace 3 min."}
                        mode={2}
                    />
                    <AvisoItem
                        title={"Nueva puerta de embarque"}
                        text={"Se te ha asignado la puerta de embarque B44. Abre a las 06.45h."}
                        tiempo={"Hace 20 min."}
                        mode={3}
                    />
                    <AvisoItem
                        title={"Recordatorio"}
                        text={"Tu vuelo con Vueling sale con destino París-Charles de Gaullé (CDG) a las 07.30h."}
                        tiempo={"Hace 1 hora"}
                        mode={4}
                    />
                    {/*<AvisoItem
                        title={"Aviso"}
                        text={"djbadbufia"}
                    />
                    <AvisoItem
                        title={"Aviso"}
                        text={"djbadbufia"}
                    />*/}
                    
                </ScrollView>
            </View>
        );
    }
}
export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {

    },
    title: {
        marginTop: getStatusBarHeight(),
        marginTop: 32,
        marginBottom: 16,
        fontSize: 28,
        fontWeight: 'bold',
        marginHorizontal: 16,
        color: Color.text.title
    }
});