import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../fb';

const usePedidos = orden => {

    const [ pedidos, guardarPedido ] = useState([]);
    let data = {};
  
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        
        const obtenerPedido = () => {

            firebase.db.collection('pedidos').where('userId','==',usuario.uid).onSnapshot(manejarSnapshot);

        }
        
        if (usuario) {
            obtenerPedido();   
        }
        
    }, [usuario]);

    function manejarSnapshot (snapshot) {
        
        const pedidos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        guardarPedido(pedidos);

    }

    return {
        pedidos
    }
}

export default usePedidos;