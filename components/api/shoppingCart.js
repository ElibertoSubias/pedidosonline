import firebase from '../../database'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export async function updateProduct(product) {
  product.updatedAt = Date.now();
  console.log("Updating product in firebase");

  await firebase.db
    .collection('carrito')
    .doc(product.id).set(product)
    .then(() => console.log('Updated correctly'))
    .catch((error) => console.log(error));
}

export async function deleteProduct(id) {
  
  await firebase.db
    .collection("carrito")
    .doc(id).delete()
    .then(() => console.log('correct'))
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

export async function addProduct(id) {
    
    const currentUser = firebase.auth.currentUser;

    let producto = {};

    await firebase.db.collection("carrito").where("creador", "==", currentUser.uid).where("idProducto", "==", id).get().then(
        function(querySnapshot) {
            
            querySnapshot.forEach(function(doc) {
                producto = doc.data();
                producto.id = doc.id;
            });
            console.log('crea'+id)
        })
        
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    if (Object.keys(producto).length > 0) {
                
        // // console.log(producto);
        // const nuevoTotal = producto.cantidad + 1;
        
        // // Actualizar la cantidad de producto en la BD
        // await firebase.db.collection('carrito').doc(producto.id).update({
        //     cantidad: nuevoTotal
        // }).then(
        //   console.log('actualiza'+id)
        // ).catch(function(error) {
        //   console.log("Error getting documents: ", error);
        // });              

    } else {
        
        // // agregar el producto al carrito
        // const item = {
        //     idProducto: id,
        //     creado: Date.now(),
        //     creador: currentUser.uid,
        //     cantidad: 1
        // }

        // // Insertamos en la base de datos
        // await firebase.db.collection('carrito').add(item).then(
        //   console.log('insert'+item)
        // ).catch(function(error) {
            
        // });

    }

}