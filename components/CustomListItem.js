import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, View, Platform, SafeAreaView  } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { ListItem, Avatar, Image } from 'react-native-elements'
import useProductos from '../hooks/useProductos'
import { ScrollView } from 'react-native-gesture-handler'


export const CustomListItem = (props) => {
    
    const [cargando, setCargando] = useState(true);
    const { productos } = useProductos('creado');

    useEffect(() => {
        if (productos.length) {
            setCargando(false);
        }
    },[productos]);
    
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
            <StatusBar style={'dark'}/>
            {productos.map(product => (
                <ListItem key={product.id}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Details', {productoId: product.id})}>
                        <View>
                            <Image 
                                source={{uri: product.urlimagen}}
                                style={{width: 200, height: 200}}
                            />
                        </View>
                    </TouchableOpacity>
                    <ListItem.Content>
                        <ListItem.Title 
                            style={{fontWeight:"800"}} 
                            onPress={() => props.navigation.navigate('Details', {product: product})}>
                            {product.nombre}
                        </ListItem.Title>  
                        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">{product.descripcion}</ListItem.Subtitle>
                        <Text>${product.precio}</Text>
                    </ListItem.Content>
                </ListItem>
            ))}
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
