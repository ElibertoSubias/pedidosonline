import React, { Component, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Input, Image, Button } from 'react-native-elements'
import firebase from '../database'

export const RegisterScreen = (props) => {
    
    const [nombre, setNombre] = useState("Eli");
    const [email, setEmail] = useState("eliberto-22@hotmail.com");
    const [password, setPassword] = useState("123545");

    const registerUser = async () => {
        if (nombre === '') {
            alert('Faltan datos');
        } else if (email === '') {
            alert('Faltan datos');
        } else if (password === '') {
            alert('Faltan datos');
        } else {

            const res = await firebase.registerUser(nombre, email, password);

            if (res) {
                props.navigation.navigate("Home");
            }
            
        }
    }
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style={"dark"}/>
            <Image
                source={{url:"https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"}}
                style={{width: 200, height: 200, marginBottom: 20}}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Nombre completo"
                    autoFocus
                    value={nombre}
                    onChangeText={(text) => setNombre(text)}
                />
                <Input
                    placeholder="Correo Electrónico"
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            <Button title="Crear Cuenta" containerStyle={styles.button} onPress={registerUser}/>
            <Button title="Iniciar Sesión" containerStyle={styles.button} type="outline" onPress={() => props.navigation.navigate("Login")}/>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
