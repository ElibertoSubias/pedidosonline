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
    .then(() => updateComplete(product))
    .catch((error) => console.log(error));
}

export function deleteProduct(product, deleteComplete) {
  console.log(product);

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

export async function uploadProduct(product, onProductUploaded, { updating }) {
  
  if (product.imageUri) {
    const fileExtension = product.imageUri.split('.').pop();

    let uuid = uuidv4();

    const fileName = `${uuid}.${fileExtension}`;

    const fileData = await firebase.storage.ref(`products/images/${uuid}`).put(product.imageUri);
    const imageSrc = await fileData.ref.getDownloadURL();
    console.log(imageSrc);
    product.image = imageSrc;

    delete product.imageUri;

    if (updating) {
      console.log("Updating....");
      updateProduct(product, onProductUploaded);
    } else {
      console.log("adding...");
      addProduct(product, onProductUploaded);
    }
  } else {
    console.log("Skipping image upload");

    delete product.imageUri;

    if (updating) {
      console.log("Updating....");
      updateProduct(product, onProductUploaded);
    } else {
      console.log("adding...");
      addProduct(product, onProductUploaded);
    }
  }
}

export function addProduct(product, addComplete) {
    product.createdAt = Date.now();
    firebase.db
    .collection('products')
    .add(product)
    .then((snapshot) => {
        product.id = snapshot.id;
        snapshot.set(product);
    }).then(() => addComplete(product))
    .catch((error) => console.log(error));
}