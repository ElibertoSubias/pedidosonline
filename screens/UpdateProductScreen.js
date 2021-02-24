import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native'
import { Input, Image, Button } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import CurryImagePicker from '../components/ui/CurryImagePicker'
import { addProduct, updateProduct, uploadProduct } from '../components/api/products'
import { Formik } from 'formik'
import * as yup from 'yup'
import firebase from '../database'
import auth from '../database'

const initialState = {
    id: '',
    nameProduct: '',
    description: '',
    price: ''
};

export const UpdateProductScreen = (props) =>{

    const [product, setProduct] = useState(initialState);
    const [cargando, setCargando] = useState(true);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Editar Producto'
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

    const { id, nameProduct, commpany, price, image, description, creator, createdAt } = product;

    initialState.id = id ? id : '';
    initialState.nameProduct = nameProduct ? nameProduct : '';
    initialState.commpany = commpany ? commpany : '';
    initialState.price = price ? price : '';
    initialState.image = image ? image : '';
    initialState.description = description ? description : '';

    useEffect(() => {
        (async () => {

            if (Platform.OS !== 'web') {

                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (status !== 'granted') {
                    alert('Disculpa, se requieren permisos para acceder a tu galeria!');
                }

            }

        })();
    },[]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {

                const { status } = await ImagePicker.requestCameraPermissionsAsync();

                if (status !== 'granted') {
                    alert('Disculpa, se requieren permisos para acceder a la camara!');
                }

            }
        })();
    },[]);

    const [imageNew, setImageNew] = useState(initialState.image);
    const [imageChange, setImageChange] = useState(false);

    const setProductImage = (image) => {
        // props.setFieldValue('imageUri', image.uri);
        setImageNew(image.uri);
        setImageChange(true);
        
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

    useEffect(() => {
        setImageNew(image);
    }, [image]);

    if (cargando) {
        return (
            <View>
                <View style={{height:200}}/>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                <Formik
                    initialValues={{ imageUri: imageNew ? imageNew : image, nameProduct: nameProduct, commpany: commpany, description: description, price: price, id: id, creator: creator, createdAt: createdAt }}
                    enableReinitialize
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        
                        uploadProduct(values, ()=>{console.log('Correct')}, { updating: true, imageChange: image !== imageNew ? true : false });
                        props.navigation.navigate("Home");
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
                        <View>
                            <Button onPress={handleSubmit} title="Guardar" />
                        </View>
                        <View style={{marginTop: 10}}>
                            <Button onPress={() => props.navigation.goBack(null)} title="Cancelar" />
                        </View>
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

