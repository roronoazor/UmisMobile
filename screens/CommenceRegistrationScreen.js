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


const CommenceRegistrationScreen = () => {

    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Session</Text>
                <Text style={styles.value}>2022/2023</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Semester Name</Text>
                <Text style={styles.value}>2022/2023.2</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Starting</Text>
                <Text style={styles.value}>01-Jan-2023</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Last day for registration</Text>
                <Text style={styles.value}>16-Apr-2023</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Ending</Text>
                <Text style={styles.value}>16-Apr-2023</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Start Registration</Text>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('MealType')}}>
                    <Text style={styles.buttonText}>Commence Registration</Text>
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

export default CommenceRegistrationScreen;