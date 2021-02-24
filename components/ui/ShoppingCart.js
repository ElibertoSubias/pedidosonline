import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, View, Platform, SafeAreaView, Button  } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ListItem, Avatar, Image } from 'react-native-elements'
import useProductos from '../../hooks/useProductos'
import useCarrito from '../../hooks/useCarrito'
import { ScrollView } from 'react-native-gesture-handler'
import auth from '../../database'
import { useMediaQuery } from "react-responsive"


export const ShoppingCart = (props) => {
    
    const [cargando, setCargando] = useState(true);
    const { products } = useProductos('createdAt');
    const { carrito } = useCarrito('createdAt');
    const currentUser = auth.auth;

    useEffect(() => {
        if (carrito.length) {
            // setCargando(false);
        }
    },[carrito]);

    return (
        <View style={styles.containerShopping}>
            <Text style={styles.textIcon}>{carrito.length}</Text>
            <Icon name="shopping-cart" size={30} color="black" onPress={()=>{navigation.navigate('ShoppingCart')}}/>
        </View>
    )
}

const stylesDesktop = StyleSheet.create({
    safeAreaView: {
      flex: 1
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    //   backgroundColor: '#F5FCFF',
      width: '100%',
      padding: 5,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    box: {
      width: '25%',
      height: '50%',
      padding: 5
    },
    inner: {
        flex: 1,
        alignItems: 'center'
    },
    titleView: {
      padding: 10,
      borderBottomColor: '#e3e3e3',
      borderBottomWidth: 1
    },
    title: {
      fontSize: 16,
      color: 'black'
    },
    sliderStyle: {
      width: 300,
      marginTop: 40
    }
  });

  const stylesMovil = StyleSheet.create({
    safeAreaView: {
      backgroundColor: 'white'
    },
    scrollView: {
        
    },
    container: {
        
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: 'red',
      width: '100%',
      marginBottom: 200,
      padding: 5,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    box: {
      width: '100%',
      height: '12%',
      padding: 5,
      flexDirection: 'row'
    //   backgroundColor: 'black'
    },
    contenedorImagen: {
        width: '30%'
    },
    inner: {
        flex: 1,
        // backgroundColor: 'blue',
        alignItems: 'flex-start',
    },
    imagenProducto: {
        width: 100,
        height: 100
    },
    titleView: {
      padding: 10,
      borderBottomColor: '#e3e3e3',
      borderBottomWidth: 1
    },
    title: {
      fontSize: 16,
      color: 'black'
    },
    sliderStyle: {
      width: 300,
      marginTop: 40
    }
});
