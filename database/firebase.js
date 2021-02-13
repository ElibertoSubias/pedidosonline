import app from 'firebase'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import firebaseConfig from './config';

class Firebase {
  constructor() {
      if (!app.apps.length) {
          app.initializeApp(firebaseConfig)
      }
      this.auth = app.auth();
      this.db = app.firestore();
      this.storage = app.storage();
  }

  // Registrar un usuario
  async registerUser(nombre, email, password) {

      const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => { 
        // crear el node con información del usuario
        const user = {
            uid: nuevoUsuario.user.uid,
            nombre: nombre.toLowerCase(),
            email: email,
            tipo: '1'
        }

        // // Insertamos en la base de datos
        firebase.db.collection('users').add(user);

        nombre = nombre.toLowerCase();
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);

        nuevoUsuario.user.updateProfile({
          displayName : nombre
        });

        return true;

      })
      .catch((error) => {

        let authError = error;
        let errorCode = authError.code;
        let errorMessage = authError.message;

        if (errorMessage === "auth/weak-password") {
          alert("La contraseña es poco segura.");
        } else if ('auth/email-already-in-use') {
          alert("El correo ya esta en uso.");
        }
        
      });;
      
      return false;
  }

  // Iniciar sesion del usuario
  async login(email, password) {

      // auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error));
      
      await this.auth.signInWithEmailAndPassword(email, password);

      await this.auth.onAuthStateChanged(function(user) {
          if (user) {
              let usuarioTipo = {};
              firebase.db.collection('users').where('uid', '==', user.uid).get().then(function(querySnapshot) {
  
                  querySnapshot.forEach(function(doc) {
                      usuarioTipo = doc.data();
                      user.tipo = usuarioTipo.tipo;
                      return user;
                  });
  
              });
          } else {
            // No user is signed in.
          }
      });
  }

  // Cerrar la sesión del usuario
  async cerrarSesion() {
      
    await this.auth.signOut().then(() => {
      return true
    });
    return false;
    
  }
}

  // let app;

  // if (firebase.apps.length === 0) {
  //   app = firebase.initializeApp(firebaseConfig);
  // } else {
  //     app = firebase.app();
  // }

  // const db = app.firestore();
  // const auth = firebase.auth();

  // export { db, auth };
  const firebase = new Firebase();

export default firebase;