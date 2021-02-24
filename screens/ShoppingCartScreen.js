import React, { Component, useLayoutEffect, useEffect, useState } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, SafeAreaView} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CustomListItem } from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../database/firebase'
import {Button} from 'react-native-elements'
import useCarrito from '../hooks/useCarrito'
import DetailsCart from '../components/ui/DetailsCart'

export const ShoppingCartScreen = (props) => {

    const { carrito } = useCarrito('createdAt');
    const [cargando, setCargando] = useState(true);
    
    useEffect(() => {
        if (carrito.length) {
            setCargando(false);
        }
    },[carrito]);

    if (cargando) {
        return (
            <View>
                <View style={{height:200}}/>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }
    console.log(carrito)

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    {
                        carrito.map((cart, i) => {
                            return (
                                <DetailsCart
                                    key={cart.id}
                                    item={cart}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
