import React, { Component, useEffect, useLayoutEffect, useState } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, Image, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../database'

export const DetailsScreen = (props) => {

    const initialState = {
        id: '',
        nombre: '',
        descripcion: '',
        precio: ''
    };
    
    const [producto, setProducto] = useState(initialState);
    const [cargando, setCargando] = useState(true);

    const handleChaneText = (name, value) => {
        setProducto({ ...producto, [name]: value })
    }

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: producto.nombre
        })
    });
    
    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('productos').doc(id);
        const doc = await dbRef.get();
        const producto = doc.data();
        setProducto({
            ...producto,
            id: doc.id,
        });
        setCargando(false);
    }

    useEffect(() => {
        getUserById(props.route.params.productoId);
    },[]);

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
                        source={{uri: producto.urlimagen}}
                        style={styles.imageProduct}
                    />
                </View>
                <View style={styles.containerDetails}>
                    <Text style={styles.precioStyle}>${producto.precio}</Text>
                    <Text style={styles.descripcionStyle}>{producto.descripcion}</Text>
                </View>
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
