import React, {useState, useContext, useEffect } from 'react'
import { getProduct } from '../api/products'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, View, Platform, SafeAreaView, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ListItem, Avatar, Image } from 'react-native-elements'
import useProductos from '../../hooks/useProductos'
import useCarrito from '../../hooks/useCarrito'
import { ScrollView } from 'react-native-gesture-handler'
import auth from '../../database'
import { useMediaQuery } from "react-responsive"
import Icon from 'react-native-vector-icons/FontAwesome'
import { deleteProduct, updateProduct } from '../../components/api/shoppingCart'

const DetailsCart = ({item, props}) => {
    
    const { idProducto, cantidad } = item;
    const [ product, guardarProduct] = useState({});
    const [error, guardarError] = useState(false);

    const getData = async () => {
        const res = await getProduct(item.idProducto);
        guardarProduct(res.data())
    }

    if (Object.keys(product).length === 0) {
        getData();            
    }

    const actualizarCarrito = (operacion) => {
        if (operacion) {
            if (item.cantidad < 20) {
                item.cantidad++;
                updateProduct(item);
            }            
        } else {
            if (item.cantidad > 1) {
                item.cantidad--;
                updateProduct(item);
            }            
        }
    }

    const deleteProductFromCart = (id) => {
        deleteProduct(id);
    }

    const isTabletOrMobileDevice = useMediaQuery({    
        maxDeviceWidth: 1224,
        // alternatively...
        query: "(max-device-width: 1224px)"  
    });

    // if (Platform.OS !== 'web' || isTabletOrMobileDevice) {
        
        let {box, inner, contenedorImagen, imagenProducto, circulo} = stylesMovil;

        return (
                                    
            <View  style={box} bottomDivider>
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
                            <View style={{paddingTop: 10}}>
                                <Text style={{fontSize: 16, fontWeight:'bold', fontFamily: 'PoiretOne_400Regular'}}>{product.nameProduct}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 2,width: '100%'}}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <Text style={{fontFamily: 'PoiretOne_400Regular'}}>{product.description}</Text>
                        </View>
                        <View style={{flexDirection: 'row', flex: 2}}>
                            <View style={{width: 30, justifyContent: 'center'}}>
                                <TouchableOpacity
                                    onPress={()=>{actualizarCarrito(false)}}
                                    style={{
                                        borderWidth:1,
                                        borderColor:'rgba(0,0,0,0.2)',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        width:25,
                                        height:25,
                                        backgroundColor:'#fff',
                                        borderRadius:50,
                                        }}
                                    >
                                    <Icon name={"minus"}  size={10} color="#eb7d30" />
                                </TouchableOpacity>
                            </View>
                            <View style={{width: 30, alignItems: 'center', justifyContent: 'center', marginRight: 2}}> 
                                <Text>{cantidad}</Text> 
                            </View>
                            <View  style={{width: 30, justifyContent: 'center'}}>
                                <TouchableOpacity
                                    onPress={()=>{actualizarCarrito(true)}}
                                    style={{
                                        borderWidth:1,
                                        borderColor:'rgba(0,0,0,0.2)',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        width:25,
                                        height:25,
                                        backgroundColor:'#fff',
                                        borderRadius:50,
                                        }}
                                    >
                                    <Icon name={"plus"}  size={10} color="#eb7d30" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                        <View style={{width: '50%'}}>
                            <Text style={{fontSize:18,fontWeight:'bold',fontFamily: 'PoiretOne_400Regular', color: '#eb7d30'}}>${product.price*cantidad}.00</Text>
                        </View>
                        <View  style={{width: '50%', alignItems: 'flex-end', justifyContent: 'center'}}>
                            <Icon style={{paddingEnd: 5}} name="trash" size={25} color="black" onPress={()=>{deleteProductFromCart(item.id)}}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    // }
}

const stylesMovil = StyleSheet.create({
    box: {
      width: '100%',
      height: 150,
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
    },
    circulo: {
        alignItems:'center',
       justifyContent:'center',
       width:100,
       height:100,
       backgroundColor:'#fff',
       borderRadius:50,
    }
});

export default DetailsCart;