import firebase from '../../database'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

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
    .collection('Products')
    .doc(product.id).set(product)
    .then(() => updateComplete(product))
    .catch((error) => console.log(error));
}

export function deleteProduct(product, deleteComplete) {
  console.log(product);

  firebase.db
    .collection('Products')
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

export function uploadProduct(product, onProductUploaded, { updating }) {
  
  if (product.imageUri) {
    const fileExtension = product.imageUri.split('.').pop();
    // console.log("EXT: " + fileExtension);

    let uuid = uuidv4();

    const fileName = `${uuid}.${fileExtension}`;
    // console.log(firebase);
    console.log(fileExtension);

    let storageRef = storage().ref(`products/images/${fileName}`);
    
    storageRef.putFile(product.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log("snapshot: " + snapshot.state);
          console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            console.log("Success");
          }
        },
        error => {
          unsubscribe();
          console.log("image upload error: " + error.toString());
        },
        () => {
          storageRef.getDownloadURL()
            .then((downloadUrl) => {
              console.log("File available at: " + downloadUrl);

              product.image = downloadUrl;

              delete product.imageUri;

              if (updating) {
                console.log("Updating....");
                updateFood(product, onProductUploaded);
              } else {
                console.log("adding...");
                addFood(product, onProductUploaded);
              }
            })
        }
      )
  } else {
    console.log("Skipping image upload");

    delete product.imageUri;

    if (updating) {
      console.log("Updating....");
      updateFood(product, onProductUploaded);
    } else {
      console.log("adding...");
      addFood(product, onProductUploaded);
    }
  }
}

export function addProduct(product, addComplete) {

    product.createdAt = Date.now();
    firebase.db
        .collection('Products')
        .add(product)
        .then((snapshot) => {
            product.id = snapshot.id;
            snapshot.set(product);
        }).then(() => addComplete(product))
        .catch((error) => console.log(error));
}