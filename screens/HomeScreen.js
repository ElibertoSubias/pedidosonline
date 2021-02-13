import React, { Component, useLayoutEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CustomListItem } from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../database/firebase'
import {Button} from 'react-native-elements'

export const HomeScreen = (props) => {

    return (
        <SafeAreaProvider>
            <ScrollView>
                <CustomListItem/>
            </ScrollView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({})
