import Toast from 'react-native-simple-toast';
import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useNetInfo} from "@react-native-community/netinfo";
import { Alert } from "react-native";
import axios from 'axios';

export const checkAndHandleAPIError = (error) => {
    // accepts an error object,
    // and determine how to display the error to user
    let error_message = error.response?.data?.detail;
    let message_2_display = error_message ? error_message : error.toString();
  
    Toast.show(`${message_2_display}`, Toast.LONG);      
  }


export async function netInfoNetworkCheck(){

    var connected = false;
    await NetInfo.fetch().then(state => {
      connected = (state.isConnected && state.isInternetReachable)
    });
    return connected
  }

export const fetchData = async ({queryKey}) => {
    // a hook that fetches data
    const [_key, {payload_data, url, authenticate, token}] = queryKey;
    let config;
    console.log("p: ", payload_data, "u: ", url);
  
    // check network connection strength
    let is_connected = await netInfoNetworkCheck();
    if (!is_connected){
      return Toast.show("Could not detect an active network connection", Toast.LONG);
    }
  
      // add authorization token from state
      // get access token for this user
      if (authenticate) {
        // if theres is no registered access token
        if (!token){
            throw new Error("you are not authenticated, please try logging in again");
            return  
        }
        
        config = {
          headers: { Authorization: `Bearer ${token}` }
        };
      }
  
    let response_data = await axios.get(url, config);
  
    return response_data;
  }
  
  
  export const postData = async (data) => {
    // a hook that fetches data
    console.log("data: ", data);
    const {payload_data, url, authenticate, token} = data;
    let config;
    console.log("pstea: ", payload_data, "u: ", url);
  
      // check network connection strength
      let is_connected = await netInfoNetworkCheck();
      if (!is_connected){
        return Toast.show("Could not detect an active network connection", Toast.LONG);
      }
      
  
      if (authenticate) {
       
      
        // if theres is no registered access token
        if (!token){
            throw new Error("you are not authenticated, please try logging in again");
            return  
        }
        
        config = {
          headers: { Authorization: `Bearer ${token}` }
        };
      }
  
    let response_data = await axios.post(url, payload_data, config);
  
    return response_data;
  }