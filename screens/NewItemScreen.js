import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { Input, Image, Button } from 'react-native-elements'
import auth from '../database'
import * as ImagePicker from 'expo-image-picker'
import CurryImagePicker from '../components/ui/CurryImagePicker'
import { addProduct, updateProduct, uploadProduct } from '../components/api/products'
import { Formik } from 'formik'
import * as yup from 'yup'

const STATE_INICIAL = {
    image: {uri:null}
};

export const NewItemScreen = (props) =>{

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Publicar Nuevo Producto'
        })
    });

    useEffect(() => {
        (async () => {

            if (Platform.OS !== 'web') {

                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (status !== 'granted') {
                    alert('Se requieren permisos para acceder a tu galeria!');
                }

            }

        })();
    },[]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {

                const { status } = await ImagePicker.requestCameraPermissionsAsync();

                if (status !== 'granted') {
                    alert('Se requieren permisos para acceder a la camara!');
                }

            }
        })();
    },[]);

    const [image, setImage] = useState(STATE_INICIAL);

    const setProductImage = (image) => {
        setImage(image.uri);
    }

    const SignupSchema = yup.object().shape({
        nameProduct: yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        commpany: yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        description: yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        price: yup.number()
            .min(1, 'Precio mayor a 1')
            .required('Requerido'),
    });

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                <Formik
                    initialValues={{ imageUri: image, nameProduct: '', commpany: '', description: '', price: '', id: null, currentUser: auth.auth.currentUser }}
                    enableReinitialize
                    validationSchema={SignupSchema}
                    onSubmit={(values, {resetForm}) => {
                        
                        uploadProduct(values, props.onProductAdded, { updating: false, imageChange: true });
                        props.navigation.navigate("Home");
                        setImage(STATE_INICIAL);
                        resetForm({imageUri: null, nameProduct: '', commpany: '', description: '', price: '', id: null});
                        
                    }}
                >
                    {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <CurryImagePicker image={image} onImagePicked={setProductImage}/>
                        <Input
                            placeholder="Nombre del producto"
                            autoFocus
                            value={values.nameProduct}
                            onChangeText={handleChange('nameProduct')}
                        />
                        {errors.nameProduct && touched.nameProduct ? (
                                <View><Text>{errors.nameProduct}</Text></View>
                            ) : null}
                        <Input
                            placeholder="Empresa"
                            value={values.commpany}
                            onChangeText={handleChange('commpany')}
                        />
                        {errors.commpany && touched.commpany ? (
                                <View><Text>{errors.commpany}</Text></View>
                            ) : null}
                        <Input
                            placeholder="Describe tu producto"
                            value={values.description}
                            onChangeText={handleChange('description')}
                        />
                        {errors.description && touched.description ? (
                                <View><Text>{errors.description}</Text></View>
                            ) : null}
                        <Input
                            placeholder="Precio de tu producto"
                            value={values.price}
                            onChangeText={handleChange('price')}
                        />
                        {errors.price && touched.price ? (
                                <View><Text>{errors.price}</Text></View>
                            ) : null}
                        <Button onPress={handleSubmit} title="Publicar" />
                    </View>
                    )}
                </Formik>
                </View>
                <View style={{height: 200}}></View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    
})

