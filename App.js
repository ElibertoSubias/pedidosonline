import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'

import { LoginScreen } from './screens/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import { HomeScreen } from './screens/HomeScreen'
import { NewItemScreen } from './screens/NewItemScreen'
import { CustomListItem } from './components/CustomListItem'
import { DetailsScreen } from './screens/DetailsScreen'
import { UpdateProductScreen } from './screens/UpdateProductScreen'
import { ShoppingCartScreen } from './screens/ShoppingCartScreen'
import firebase from './database'
import Icon from 'react-native-vector-icons/FontAwesome'

import CustomSidebarMenu from './components/CustomSidebarMenu'
import { CarritoScreen } from './screens/ShoppingCartScreen'
import useCarrito from './hooks/useCarrito'
import { useFonts, PoiretOne_400Regular  } from '@expo-google-fonts/poiret-one';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const NavigationDrawerStructure = (props) => {
  
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawer.png',
          }}
          style={{ width: 35, height: 35, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const HomeStackNavigator = ({navigation}) => {
 
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F1F1F1',
        },
        // cardStyle: {
        //   backgroundColor: 'red'
        // },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },     
      }}
    >
      <Stack.Screen 
        name="Home"
        component={CustomListItem}
        options={{
          title: 'Pedidos Online',
          headerRight: () => {
            const { carrito } = useCarrito('createdAt');
            const [shoppingCart, setShoppingCart] = useState([]);
            useEffect(() => {
              console.log(carrito);
              if (carrito) {
                setShoppingCart(carrito)
              }
            },[carrito]);
            
            return <View style={styles.containerShopping}>
              {shoppingCart.length ? 
              (
                <>
                  <Text style={styles.textIcon}>{shoppingCart.length}</Text> 
                  <Icon name="shopping-cart" size={30} color="black" onPress={()=>{navigation.navigate('ShoppingCart')}}/>
                </>
              ): null}
            </View>
          },
          headerLeft: () => (
            <NavigationDrawerStructure style={{width: '100%'}} navigationProps={navigation}/>
          ),
          headerStyle: {
            backgroundColor: 'white', //Set Header color
          },
          headerTintColor: '#eb7d30', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
            fontFamily: 'PoiretOne_400Regular',
            fontSize: 30,
            textAlign: 'center',
            width: '100%'
          },
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ 
          title: 'Pedidos Online',
          headerStyle: {
            backgroundColor: 'white', //Set Header color
          },
          fontFamily: 'PoiretOne_400Regular',
          headerTintColor: '#eb7d30', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
            fontFamily: 'PoiretOne_400Regular'
          },
        }}
      />
      <Stack.Screen
        name="UpdateProduct"
        component={UpdateProductScreen}
        options={{ 
          title: 'Pedidos Online',
          headerStyle: {
            backgroundColor: '#F1F1F1', //Set Header color
          },
          fontFamily: 'PoiretOne_400Regular',
          headerTintColor: '#eb7d30', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
            fontFamily: 'PoiretOne_400Regular'
          },
        }}
      />
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{ 
          title: 'Carrito de Compras',
          headerStyle: {
            backgroundColor: '#F1F1F1', //Set Header color
          },
          fontFamily: 'PoiretOne_400Regular',
          headerTintColor: '#eb7d30', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
            fontFamily: 'PoiretOne_400Regular'
          },
        }}
      />
    </Stack.Navigator>
  );
}

const NuevoProductoStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Nuevo Producto"
      screenOptions={{
        headerLeft: () => (
          <HeaderBackButton onPress={() => navigation.goBack(null)} />
        ),
        headerStyle: {
          backgroundColor: '#F1F1F1', //Set Header color
        },
        headerTintColor: 'black', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    >
      <Stack.Screen 
        name="NuevoProductoScreen" 
        component={NewItemScreen}
        options={{title: 'Pedidos Online'}}
      />
    </Stack.Navigator>
  );
}

const IniciarSesionStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Iniciar Sesión"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation}/>
        ),
        headerStyle: {
          backgroundColor: '#F1F1F1', //Set Header color
        },
        headerTintColor: 'black', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    >
      <Stack.Screen 
        //Este usa el navigate para cambiar de pantalla
        name="Login"
        component={LoginScreen} 
        options={{title: 'Pedidos Online'}}
      />
    </Stack.Navigator>
  );
}

const CrearCuentaStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="Crear Cuenta"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation}/>
        ),
        headerStyle: {
          backgroundColor: '#F1F1F1', //Set Header color
        },
        headerTintColor: 'black', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    >
      <Stack.Screen 
        name="CrearCuentaScreen" 
        component={RegisterScreen} 
        options={{title: 'Pedidos Online'}}
      />
    </Stack.Navigator>
  );
}


export default function App(props) {

  // CON ESTA FUNCION PODEMOS FILTAR LAS PAGINAS QUE PODRAN SER VISTAS DEPENDIENDO SI EL USUARIO ESTA LEGGED O NOT LOGGED
  function filterScreen (Screen) {
    if (firebase.auth.currentUser) {
      if (Screen.name !== 'Login' && Screen.name !== 'Register') {
        return Screen
      }
    } else {
      if (Screen.name !== 'NewItem' && Screen.name !== 'Salir') {
        return Screen
      }
    }
  }

  let [fontsLoaded] = useFonts({
    PoiretOne_400Regular,
  });

  if (!fontsLoaded) {
    return <View>
              <View style={{height:200}}/>
              <ActivityIndicator size="large" color="#9e9e9e"/>
          </View>;
  }

  return (
    <>
    <StatusBar/>
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => 
          {
            const filteredProps = {
              ...props,
              state: {
                ...props.state,
                routeNames: props.state.routeNames.filter(filterScreen),
                routes: props.state.routes.filter(filterScreen),
              },
            };
            return (
              <CustomSidebarMenu {...filteredProps}/>
            );
          }}
        
      >
        <Drawer.Screen
          name="Home"
          options={{ drawerLabel: 'Home' }}
          component={HomeStackNavigator}
        />
        <Drawer.Screen
          name="NewItem"
          options={{ drawerLabel: 'Nuevo Producto' }}
          component={NuevoProductoStackNavigator}
        />
        <Drawer.Screen
          name="Login"
          options={{ drawerLabel: 'Iniciar Sesión' }}
          component={IniciarSesionStackNavigator}
          // drawerContent={(props) => props}
        />
        <Drawer.Screen
          name="Register"
          options={{ drawerLabel: 'Crear Cuenta' }}
          component={CrearCuentaStackNavigator}
          // drawerContent={(props) => props}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
