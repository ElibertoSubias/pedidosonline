import React, { Component, useLayoutEffect, useEffect, useState } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, SafeAreaView, Platform } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CustomListItem } from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../database/firebase'
import {Button} from 'react-native-elements'
import useCarrito from '../hooks/useCarrito'
import DetailsCart from '../components/ui/DetailsCart'
import { useMediaQuery } from "react-responsive"

export const ShoppingCartScreen = (props) => {

    // PRUEBA SOLO LLAMANDO UNA VEZ EL USECARRITO Y CUANDO LO NECESITE MANDALO POR NOSE

    const { carrito } = useCarrito('createdAt');
    const [cargando, setCargando] = useState(true);
    
    useEffect(() => {
        if (carrito) {
            setCargando(false);
        }
    },[carrito]);

    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
        // alternatively...
        query: "(max-device-width: 1224px)"  
    });

    if (cargando) {
        return (
            <View>
                <View style={{height:200}}/>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }

    let { container, safeAreaView, scrollView, resumen, resumenMovil, containerItems } = styles;

    return (
        <SafeAreaView style={safeAreaView}>
            <ScrollView style={scrollView}>
                <View  style={container}>
                    <View style={containerItems}>
                        {carrito ? (
                            carrito.map((cart, i) => {
                                return (
                                    <DetailsCart
                                        key={cart.id}
                                        item={cart}
                                        props={props}
                                    />
                                )
                            })
                        )
                        :
                        (
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Text>Tu carrito esta vacio</Text>
                            </View>
                        )}
                    </View>
                    {(Platform.OS === 'web') ? (
                        !isTabletOrMobileDevice ? (
                            <View style={resumenMovil}>
                            <Text style={{fontFamily: 'PoiretOne_400Regular', fontWeight: 'bold'}}>Resumen de tu pedido web</Text>
                            <Button style={{marginTop: 40}} title="Finalizar"/>
                        </View>
                        ):(null)
                    ):(null)}
                </View>
            </ScrollView>
            {Platform.OS !== 'web' || isTabletOrMobileDevice ? (
                <View style={resumen}>
                <Text style={{fontFamily: 'PoiretOne_400Regular', fontWeight: 'bold'}}>Resumen de tu pedido movil</Text>
                <Button style={{marginTop: 40}} title="Finalizar"/>
            </View>
            ):(null)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#f1f0ef',
        flex: 1,
        height: 150
    },
    scrollView: {
        // marginBottom: 150
    },
    container: {  
        flex: 1,
        width: '100%',   
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    containerItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //   backgroundColor: 'red',
        width: '80%',
        marginBottom: 180,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    resumenMovil: {
        width: 400,
        height: '100%',
        backgroundColor: '#adadad',
        alignItems: 'center',
        paddingTop: 5,
    },
    resumen: {
        height: 150,
        backgroundColor: '#adadad',
        alignItems: 'center',
        paddingTop: 5,
    }
})
