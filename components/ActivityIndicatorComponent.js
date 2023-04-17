import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';


export default function UActivityIndicator(props) {
    
    const {text} = props 

    return (
        <View style={[styles.loading]}>
          
          <View style={{height: "100%", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column"}}>
            <ActivityIndicator size={50} color="#14264D"/>
            <Text style={{fontWeight: "bold" }}>{ text || "Loading...Please Wait"}</Text>
          </View>
        </View>
      ) 
}

const styles = StyleSheet.create({
    loading: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#F5FCFF88"
        }
    })
  