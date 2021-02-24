import React, {useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import { getProduct } from '../api/products'

const DetailsCart = ({item}) => {
    
    const { idProducto, cantidad } = item;
    const [ product, guardarProduct] = useState({});
    const [error, guardarError] = useState(false);

    const getData = async () => {
        const res = await getProduct(item.idProducto);
        guardarProduct(res.data())
    }

    if (Object.keys(product).length === 0) {
        getData();            
    }

    

    return (
        <>
        <View>
            <Text>{product.nameProduct}- {cantidad}</Text>
        </View>
        </>
    )
}
export default DetailsCart;