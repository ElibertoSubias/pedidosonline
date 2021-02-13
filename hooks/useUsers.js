import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../database';

const useUsers = orden => {
    
    const [ users, guardarUsers ] = useState([]);
  
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerUsers = () => {
            firebase.db.collection('users').onSnapshot(manejarSnapshot);
        }
        obtenerUsers();
    }, []);

    function manejarSnapshot (snapshot) {
        
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        guardarUsers(users);
    }

    return {
        users
    }
}

export default useUsers;