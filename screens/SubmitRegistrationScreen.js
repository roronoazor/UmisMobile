import React, { useState } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { primaryColor, stripedColor } from '../constants/colors';
import {Picker} from '@react-native-picker/picker';
import AppHeader from '../components/AppHeader';
import { useNavigation } from '@react-navigation/native';


const SubmitRegistrationScreen = () => {

    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Semester</Text>
                <Text style={styles.value}>2022/2023</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Matric No.</Text>
                <Text style={styles.value}>19/0492</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Student Name</Text>
                <Text style={styles.value}>OSAI, PRAISE CHIDIEBUBE</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>School</Text>
                <Text style={styles.value}>Computing and Engineering Sciences</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Study Level</Text>
                <Text style={styles.value}>400</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Selected Meal</Text>
                <Text style={styles.value}>LS</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Selected Resident</Text>
                <Text style={styles.value}>Bethel Splendor1</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Off Campus</Text>
                <Text style={styles.value}>No</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Financial Approval</Text>
                <Text style={styles.value}>Yes</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Completed Registration</Text>
                <Text style={styles.value}>No</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Selected Credit Hours</Text>
                <Text style={styles.value}>25</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Submit Registration</Text>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('MealType')}}>
                    <Text style={styles.buttonText}>Submit Registration</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#ffffff'
    },
    stripe: {
      backgroundColor: stripedColor
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      marginRight: 16,
    },
  value: {
      fontSize: 16,
      color: '#000',
    },
    tabView: {
      width: '100%',
    },
    tabLabel: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
      textTransform: 'capitalize',
    },
    tabIndicator: {
      backgroundColor: primaryColor,
      height: 4,
      borderRadius: 4,
    },
    tabBar: {
      backgroundColor: primaryColor,
    },
    input: {
      height: 30,
      width: '100%',
      borderWidth: 1,
      borderColor: 'gray',
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: '#f0f0f0',
      color: '#ccc',
      padding: 9,
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 1
    },
    buttonText: {
      color: '#000',
      fontSize: 18,
      textAlign: 'center'
    },
  });

export default SubmitRegistrationScreen;