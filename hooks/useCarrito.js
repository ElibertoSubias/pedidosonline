import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../database';


const useCarrito = orden => {

    const [ carrito, guardarCarrito ] = useState([]);
    let data = {};
  
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        
        const obtenerCarrito = () => {

            firebase.db.collection('carrito').where('creador', '==', usuario.uid).orderBy('creado','desc').onSnapshot(manejarSnapshot);

        }
        
        if (usuario) {
            obtenerCarrito();   
        }
        
    }, [usuario]);

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