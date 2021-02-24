import firebase from '../../database'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// export function login({ email, password }) {
//   firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((value) => console.log(value))
// }

// export function signup({ email, password, displayName }) {
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userInfo) => {
//       console.log(userInfo)
//       userInfo.user.updateProfile({ displayName: displayName.trim() })
//         .then(() => { })
//     })
// }

// export function subscribeToAuthChanges(authStateChanged) {
//   firebase.auth().onAuthStateChanged((user) => {
//     authStateChanged(user);
//   })
// }

// export function signout(onSignedOut) {
//   firebase.auth().signOut()
//     .then(() => {
//       onSignedOut();
//     })
// }

export function updateProduct(product, updateComplete) {
  product.updatedAt = Date.now();
  console.log("Updating product in firebase");

  firebase.db
    .collection('products')
    .doc(product.id).set(product)
    .then(() => console.log('Updated correctly'))
    .catch((error) => console.log(error));
}

export function deleteProduct(product, deleteComplete) {
  firebase.db
    .collection('products')
    .doc(product.id).delete()
    .then(() => deleteComplete())
    .catch((error) => console.log(error));
}

export async function getProducts(productsRetreived) {

  let productList = [];

  let snapshot = await firebase.db
    .collection('products')
    .orderBy('createdAt')
    .get()

  snapshot.forEach((doc) => {
    const productItem = doc.data();
    productItem.id = doc.id;
    productList.push(productItem);
  });

  productsRetreived(productList);
}

export function getProduct(idProducto) {


  return firebase.db.collection('products').doc(idProducto).get();

  // snapshot.forEach((doc) => {
  //   const productItem = doc.data();
  //   productItem.id = doc.id;
  //   productList.push(productItem);
  // });

  

}

export async function uploadProduct(product, onProductUploaded, { updating, imageChange }) {
  if (product.imageUri) {

    if (imageChange) {
      // const fileExtension = product.imageUri.split('.').pop();
      const fileExtension = product.imageUri.split(';')[0].split('/')[1];
        
      let uuid = uuidv4();

      const fileName = `${uuid}.${fileExtension}`;

      const fileData = await firebase.storage.ref(`products/images/${fileName}`).putString(product.imageUri, `data_url`, {contentType:`image/${fileExtension}`});
      const imageSrc = await fileData.ref.getDownloadURL();
      // console.log(imageSrc);
      product.image = imageSrc;
    } else {
      product.image = product.imageUri;
    }

    delete product.imageUri;

    try {
      
      if (updating) {
        console.log("Updating....");
        updateProduct(product, onProductUploaded);
        alert("Producto actualizado con éxito.");
      } else {
        console.log("adding...");
        addProduct(product, onProductUploaded);
        alert("Producto creado con éxito.");
      }

    } catch (error) {
      
      alert("Ocurrio un error al subir la imagen del producto.");
      console.log(error);

    }

  } else {

    try {
      
      console.log("Skipping image upload");
      
      delete product.imageUri;

      if (updating) {
        console.log("Updating....");
        updateProduct(product, onProductUploaded);
        alert("Producto actualizado con éxito.");
      } else {
        console.log("adding...");
        addProduct(product, onProductUploaded);
        alert("Producto creado con éxito.");
      }

    } catch (error) {
      
      alert("Ocurrio un error al subir la imagen del producto.");
      console.log(error);

    }
  }
}

export function addProduct(product, addComplete) {
  const currentUser = product.currentUser;
  delete product.currentUser;
  product.createdAt = Date.now();
  firebase.db
  .collection('products')
  .add(product)
  .then((snapshot) => {
      product.id = snapshot.id;
      product.votes = 0;
      product.comments = [];
      product.creator = {
        uid: currentUser.uid,
        name: String(currentUser.displayName).split('|')[0]
      };
      product.whoHasVote = [];
      snapshot.set(product);
  }).then(() => console.log('Add correctly'))
  .catch((error) => console.log(error));
}