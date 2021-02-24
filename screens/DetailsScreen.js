import React, { Component, useEffect, useLayoutEffect, useState } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, Image, SafeAreaView, Alert, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from 'react-native-elements'
import auth from '../database'
import firebase from '../database'
import { deleteProduct } from '../components/api/products'
import useCarrito from '../hooks/useCarrito'
import { addProduct } from '../components/api/shoppingCart'

export const DetailsScreen = (props) => {

    const { carrito } = useCarrito('createdAt');
    
    const initialState = {
        id: '',
        nameProduct: '',
        description: '',
        price: ''
    };
    
    const [product, setProduct] = useState(initialState);
    const [cargando, setCargando] = useState(true);

    const handleChaneText = (name, value) => {
        setProduct({ ...product, [name]: value })
    }

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: product.nameProduct
        })
    });
    
    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('products').doc(id);
        const doc = await dbRef.get();
        const product = doc.data();
        setProduct({
            ...product,
            id: doc.id,
        });
        setCargando(false);
    }

    useEffect(() => {
        getUserById(props.route.params.productoId);
    },[]);

    // Agregar el Producto al carrito
    const agregarAlCarrito = (id) => {
        // Si el usuario no esta autenticado llevar al login
        if (!auth.auth.currentUser) {
            props.navigation.navigate('Login');
        }
        
        addProduct(id);
        console.log(carrito);
    
    }

    const confirmationDelteProduct = () => {
        if (Platform.OS !== 'web') {
            Alert.alert(
                "Eliminar Producto",
                "¿Estas seguro de eliminar este producto?",
                [
                    {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                    },
                    { text: "Aceptar", onPress: () => confirmed() }
                ],
                { cancelable: false }
            )
        } else {
            if (confirm('¿Estas seguro de eliminar este producto?')) {
                confirmed();
            }
        }
    }

    const confirmed = () => {
        deleteProduct(product, ()=>{props.navigation.navigate('Home')});
    }

    if (cargando) {
        return (
            <View>
                <View style={{height:200}}/>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }
    
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: product.image}}
                        resizeMode="cover"
                        style={styles.imageProduct}
                    />
                </View>
                <View style={styles.containerDetails}>
                    <Text style={styles.precioStyle}>Precio: ${product.price}</Text>
                    <Text style={styles.descripcionStyle}>Descripción: {product.description}</Text>
                </View>
                <View style={{marginTop: 10, alignItems: 'center'}}>
                    <Button style={{width: '100%'}} title="Agregar al Carrito" onPress={() => {agregarAlCarrito(product.id)}}/>
                </View>
                {auth.auth.currentUser && product.creator && auth.auth.currentUser.uid === product.creator.uid ?
                    <>
                        <View>
                            <Button title="Editar Producto" onPress={() => props.navigation.navigate('UpdateProduct', {productoId: product.id})}/>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Button title="Eliminar Producto" onPress={confirmationDelteProduct}/>
                        </View>                        
                    </>
                :
                    null
                }                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageProduct: {
        width: 200,
        height: 200,
    },
    containerDetails: {
        flex: 1,
        padding: 10
    },
    precioStyle: {
        fontSize: 21,
        fontWeight: '800',
        paddingBottom: 10
    },
    descripcionStyle: {
        fontSize: 16,
    }
})
