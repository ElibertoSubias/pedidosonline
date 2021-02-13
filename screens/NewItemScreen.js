import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native'
import { Input, Image, Button } from 'react-native-elements'
import firebase from '../database'
import * as ImagePicker from 'expo-image-picker'
import CurryImagePicker from '../components/ui/CurryImagePicker'
import { addProduct, updateProduct, uploadProduct } from '../components/api/products';
import { Formik } from 'formik';
import * as yup from 'yup';

const STATE_INICIAL = {
    nameProduct: '',
    company: '',
    image: '',
    url: '',
    description: ''
};

export const NewItemScreen = (props) =>{

    // crear el objeto de nuevo producto
    // const product = {
    //     nameProduct,
    //     company,
    //     url,
    //     urlImage,
    //     description,
    //     votes: 0,
    //     comments: [],
    //     createdAt: Date.now(),
    //     creator: {
    //       id: usuario.uid,
    //       name: usuario.displayName
    //     },
    //     whoHasVote: []
    // }

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Publicar Nuevo Producto'
        })
    });

    // const [nombre, setNombre] = useState("Cargador");
    // const [descripcion, setDescripcion] = useState("Mi descripcion");
    // const [empresa, setEmpresa] = useState("mi empresa");
    // const [precio, setPrecio] = useState("28");

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
        setImage(result.uri);
        }
    };

    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const [image, setImage] = useState(null);

    const setProductImage = (image) => {
        // props.setFieldValue('imageUri', image.uri);
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
            <View style={styles.inputContainer}>
            <Formik
                initialValues={{ imageUri: image, nameProduct: '', commpany: '', description: '', price: '', id: null }}
                enableReinitialize
                validationSchema={SignupSchema}
                onSubmit={values => {
                    
                    uploadProduct(values, props.onProductAdded, { updating: false });
                    // if (id) {
                    //     values.id = product.id;
                    //     values.createdAt = product.createdAt;
                    //     values.image = product.image;
                    //     console.log(values)
                    //     uploadProduct(values, props.onProductUpdated, { updating: true });
                    // } else {
                    //     console.log(values)
                    //     uploadProduct(values, props.onProductAdded, { updating: false });
                    // }
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
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({})

