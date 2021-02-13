import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { NewItemScreen } from './screens/NewItemScreen';
import { CustomListItem } from './components/CustomListItem';
import { DetailsScreen } from './screens/DetailsScreen';
import firebase from './database';

import CustomSidebarMenu from './components/CustomSidebarMenu';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const NavigationDrawerStructure = (props) => {
  
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
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
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ 
          title: 'Pedidos Online',
          headerStyle: {
            backgroundColor: '#F1F1F1', //Set Header color
          },
          headerTintColor: 'black', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
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

  const signOut = (props) => {
    const salir = firebase.cerrarSesion();
    if (salir) {
      props.navigation.navigate("Login");
    } else {
      alert('Ocurrio un error intente más tarde');
    }
  }

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

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
