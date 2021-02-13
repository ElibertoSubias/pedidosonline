import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Input, Image, Button, Text } from 'react-native-elements'
import firebase from '../database'

export const LoginScreen = (props) => {
    
    const [ error, guardarError ] = useState(false);

    const STATE_INICIAL = {
        email: '',
        password: ''
    };

    // const { valores, errores, handleChange, handleSubmit, handleBlur } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

    const [email, setEmail] = useState("eliberto-22@hotmail.com");
    const [password, setPassword] = useState("123456");

    useEffect(() => {
        firebase.auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                props.navigation.navigate("Home");
            } else {
                props.navigation.navigate("Login");
            }
        })
    }, []);

    const signIn = () => {
        try {

            const usuario = firebase.login(email, password);
            if (usuario) {
                props.navigation.navigate("Home");
            }
            
          } catch (error) {
            console.error('Hubo un error al autenticar el usuario: ', error.message);
          }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style={"dark"}/>
            <Image
                source={{url:"https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"}}
                style={{width: 200, height: 200, marginBottom: 20}}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Correo electrónico"
                    autoFocus
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
            <Button title="Iniciar" style={styles.button} onPress={signIn}/>
            <Button title="Crear Cuenta" style={styles.button} type="outline" onPress={() => props.navigation.navigate("Register")}/>
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
});