import React, { useState, useEffect, useContext } from 'react'
import firebase, { FirebaseContext } from '../database'


const useCarrito = orden => {

    const [ carrito, guardarCarrito ] = useState([]);

    let data = {};

    useEffect(() => {
        
        const obtenerCarrito = () => {

            firebase.db.collection('carrito').where('creador', '==', firebase.auth.currentUser.uid).orderBy('creado','desc').onSnapshot(manejarSnapshot);

        }
        
        if (firebase.auth.currentUser) {
            obtenerCarrito();   
        }
        
    }, [firebase.auth.currentUser]);

    function manejarSnapshot (snapshot) {
        
        const carrito = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        
        guardarCarrito(carrito);

    }

    return {
        carrito
    }
}

export default useCarrito;