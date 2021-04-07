import React, { Component, useEffect, useState, useLayoutEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, View, Platform, SafeAreaView, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ListItem, Avatar, Image } from 'react-native-elements'
import useProductos from '../hooks/useProductos'
import useCarrito from '../hooks/useCarrito'
import { ScrollView } from 'react-native-gesture-handler'
import auth from '../database'
import { useMediaQuery } from "react-responsive"
import Icon from 'react-native-vector-icons/FontAwesome'


export const CustomListItem = (props) => {
    
    const [cargando, setCargando] = useState(true);
    const { products } = useProductos('createdAt');
    const { carrito } = useCarrito('createdAt');
    const currentUser = auth.auth;

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                const { carrito } = useCarrito('createdAt');
                const [shoppingCart, setShoppingCart] = useState([]);
                useEffect(() => {
                //   console.log(carrito);
                  if (carrito) {
                    setShoppingCart(carrito)
                  }
                },[carrito]);
                
                return <View style={styles.containerShopping}>
                  {shoppingCart.length ? 
                  (
                    <>
                      <Text style={styles.textIcon}>{shoppingCart.length}</Text> 
                      <Icon name="shopping-cart" size={30} color="black" onPress={()=>{props.navigation.navigate('ShoppingCart')}}/>
                    </>
                  ): null}
                </View>
              }
        });
    }, [carrito])

    useEffect(() => {
        // console.log(carrito);
    },[carrito]);

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
    
    if (Platform.OS !== 'web' || isTabletOrMobileDevice) {
        
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
                                            <View style={{flex: 1,width: '100%'}}>
                                                <TouchableOpacity
                                                        onPress={() => props.navigation.navigate('Details', {productoId: product.id})}
                                                    >
                                                    <View style={{marginBottom: 10, paddingTop: 10}}>
                                                        <Text style={{fontSize: 16, fontWeight:'bold', fontFamily: 'PoiretOne_400Regular'}}>{product.nameProduct}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{flex: 1,width: '100%'}}>
                                                <Text style={{fontFamily: 'PoiretOne_400Regular'}}>{product.description}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', width: '100%'}}>
                                                <View style={{width: '50%'}}>
                                                    <Text style={{fontSize:18,fontWeight:'bold',fontFamily: 'PoiretOne_400Regular', color: '#eb7d30'}}>${product.price}.00</Text>
                                                </View>
                                                <View  style={{width: '50%', alignItems: 'flex-end', justifyContent: 'center'}}>
                                                    <Icon style={{paddingEnd: 5}} name="cart-plus" size={25} color="black" onPress={()=>{props.navigation.navigate('ShoppingCart')}}/>
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
      flex: 1,
      backgroundColor: '#f1f0ef',
      fontFamily: 'PoiretOne_400Regular',
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
      backgroundColor: '#f1f0ef'
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
      padding: 10,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    box: {
      width: '100%',
      height: '16%',
      padding: 5,
      marginBottom: 10,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 4,
      shadowColor: 'black',
        shadowOpacity: 0.10,
        shadowOffset: { width: 0, height: 0},
        shadowRadius: 5,
        elevation: 3,
    },
    contenedorImagen: {
        marginStart: 10,
        marginEnd: 10,
        alignItems: 'center',
        justifyContent: 'center',
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerShopping: {
      flex: 1,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textIcon: {
      color: 'red',
      marginBottom: -5
    }
  });