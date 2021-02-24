import React, { useState, useEffect, useContext } from 'react'
import firebase, { FirebaseContext } from '../database'

const useProductos = orden => {
    
    const [ products, guardarProdutos ] = useState([]);
  
    useEffect(() => {
        const obtenerProductos = () => {
        firebase.db.collection('products').orderBy(orden, 'desc').onSnapshot(manejarSnapshot);
        }
        obtenerProductos();
    }, []);

    function manejarSnapshot (snapshot) {
        
        const products = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
        });

        guardarProdutos(products);
    }

    return {
        products
    }
}

export default useProductos;