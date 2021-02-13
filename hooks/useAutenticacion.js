import React, { useEffect, useState } from 'react';
import firebase from '../database';

function useAuteticacion() {
    
    const [usuarioAutenticado, guardarUsuarioAutenticado ] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {

                let usuarioTipo = {};
                firebase.db.collection('users').where('uid', '==', usuario.uid).get().then(function(querySnapshot) {

                    querySnapshot.forEach(function(doc) {
                        usuarioTipo = doc.data();
                        usuario.tipo = usuarioTipo.tipo;
                        guardarUsuarioAutenticado(usuario);
                    });

                })

                
            } else {
                guardarUsuarioAutenticado(null);
            }
        });
        return () => unsuscribe();
    }, [usuarioAutenticado]);

    return usuarioAutenticado;

}

export default useAuteticacion;