// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';
import { Avatar } from 'react-native-elements'
import firebase from '../database'

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {
    
    const BASE_PATH =
        'https://www.pavilionweb.com/wp-content/uploads/2017/03/';
    const proileImage = 'man-300x300.png';

    const signOut = () => {

      const salir = firebase.cerrarSesion();
      
      if (salir) {
        props.navigation.navigate("Login");
      } else {
        alert('Ocurrio un error intente más tarde');
      }
      
    }
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
              {firebase.auth.currentUser ? 
                <TouchableOpacity>
                  {/* <Avatar rounded source={{url: auth?.currentUser?.photoURL}}></Avatar> */}
                  <Avatar
                    source={{ uri: BASE_PATH + proileImage }}
                    style={styles.sideMenuProfileIcon}
                  />
                  <View style={{alignItems: 'center'}}>
                    <Text>{firebase.auth.currentUser.displayName}</Text>
                  </View>
                </TouchableOpacity>
              : 
                <TouchableOpacity>
                  {/* <Avatar rounded source={{url: auth?.currentUser?.photoURL}}></Avatar> */}
                  <Avatar
                    source={{ uri: BASE_PATH + proileImage }}
                    style={styles.sideMenuProfileIcon}
                  />
                  <View style={{alignItems: 'center'}}>
                  </View>
                </TouchableOpacity>
              }
              
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                {firebase.auth.currentUser ? 
                  <DrawerItem
                    label="Salir"
                    onPress={signOut}
                  />
                  :
                  null
                }
            </DrawerContentScrollView>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
