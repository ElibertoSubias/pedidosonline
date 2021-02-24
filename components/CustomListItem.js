import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, View, Platform, SafeAreaView, Button  } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ListItem, Avatar, Image } from 'react-native-elements'
import useProductos from '../hooks/useProductos'
import useCarrito from '../hooks/useCarrito'
import { ScrollView } from 'react-native-gesture-handler'
import auth from '../database'
import { useMediaQuery } from "react-responsive"


export const CustomListItem = (props) => {
    
    const [cargando, setCargando] = useState(true);
    const { products } = useProductos('createdAt');
    const { carrito } = useCarrito('createdAt');
    const currentUser = auth.auth;

    useEffect(() => {
        if (products.length) {
            setCargando(false);
        }
    },[products]);

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

    if (isTabletOrMobileDevice) {
        let {container, box, inner, safeAreaView, scrollView, contenedorImagen, imagenProducto} = stylesMovil;

        return (
            <SafeAreaView style={safeAreaView}>
                <ScrollView style={scrollView}>
                    <View style={container}>
                        {
                            products.map((product, i) => {
                                return (
                                    <View  style={box} key={product.id} bottomDivider>
                                        <View style={contenedorImagen}>
                                            <TouchableOpacity
                                                onPress={() => props.navigation.navigate('Details', {productoId: product.id})}
                                            >
                                            <Image
                                                style={imagenProducto}
                                                resizeMode="cover"
                                                source={{ uri: product.image }}
                                                
                                            />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={inner}>
                                            <TouchableOpacity
                                                    onPress={() => props.navigation.navigate('Details', {productoId: product.id})}
                                                >
                                                <View style={{paddingBottom:5}}>
                                                    <Text style={{fontSize:16,fontWeight:'bold'}}>{product.nameProduct}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{paddingBottom:10}}>
                                                <Text>{product.description}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row',width: '100%'}}>
                                                <View style={{padding: 5, width:'50%'}}>
                                                    <Text style={{fontSize:18,fontWeight:'600'}}>${product.price}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    let {container, box, inner} = stylesDesktop;

    return (
        <SafeAreaView>
                <View
                    style={container}
                >
                    {
                        products.map((product, i) => {
                            return (
                                // ESTA ES UNA MANERA DE MANDARLE PARAMENTROS A UNA VENTANA QUE ESTA DENTRO DE OTRA
                                // <ListItem key={producto.id} bottomDivider onPress={() => navigation.navigate('Details', {screen: 'Details',params: {productoId: producto.id}})}></ListItem>
                                
                                // implemented without image with header
                                <View  style={box} key={product.id} bottomDivider>
                                    
                                    <View style={inner}>
                                        <View>
                                            <Image
                                                style={{ width: 200, height: 200 }}
                                                resizeMode="cover"
                                                source={{ uri: product.image }}
                                            />
                                        </View>
                                        <View style={{width: '80%', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 10}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 16}}>{product.nameProduct}</Text>
                                        </View>
                                        <View style={{width: '80%', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                                            <Text>{product.description}</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontWeight: 'bold', fontSize: 18}}>${product.price}</Text>
                                        </View>
                                        <View style={{width: '80%'}}>
                                            <Button title='Ver' color="#841584" onPress={() => props.navigation.navigate('Details', {productoId: product.id})}/>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                    </View>
            </SafeAreaView>

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
