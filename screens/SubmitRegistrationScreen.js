import React, { useState } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { primaryColor, stripedColor } from '../constants/colors';
import {Picker} from '@react-native-picker/picker';
import AppHeader from '../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-simple-toast";
import { fetchData, postData } from '../modules/utilQuery';
import { useMutation, useQuery } from 'react-query';
import { checkAndHandleAPIError } from '../modules/utilQuery';
import { GET_SUBMIT_REGISTRATION } from '../config/serverUrls';
import { useSelector } from 'react-redux';
import UActivityIndicator from '../components/ActivityIndicatorComponent';
import { useQueryClient } from 'react-query';

const SubmitRegistrationScreen = () => {

    const navigation = useNavigation();
    const [data, setData] = useState({});
    const auth = useSelector(state => state.auth.auth);
    const queryClient = useQueryClient();

    
  const { mutate, isLoading: mutationLoading } = useMutation(postData, {
    onSuccess: ({ data }) => {
      Toast.show('Saved', Toast.LONG);
      queryClient.invalidateQueries('submit');
    },
    onError: (error) => {
     checkAndHandleAPIError(error); 
    }
  });

  const handleSubmit = () => {
    mutate({
      url: GET_SUBMIT_REGISTRATION, 
      payload_data: { },
      authenticate: true,
      token: auth?.token
    })
  }

  let payload_data = {};
  const {  isLoading } = useQuery(['submit',
                          { 
                            url: GET_SUBMIT_REGISTRATION,
                            payload_data,
                            authenticate:true,
                            token: auth.token
                           }],
                          fetchData, 
                          {
                            retry:false,
                            onSuccess: ({ data }) => {
                              const { detail } = data;
                              setData(detail);
                            },
                            onError: (error) => {
                              console.log('e: ', error);
                              checkAndHandleAPIError(error)
                            }
                          }
                          );

  if (isLoading) {
    return (
      <UActivityIndicator />
    );
  }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>Semester</Text>
                <Text style={styles.value}>{data?.semester}</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Matric No.</Text>
                <Text style={styles.value}>{data?.matric_no}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{data?.student_name}</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>School</Text>
                <Text style={styles.value}>{data?.school}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Study Level</Text>
                <Text style={styles.value}>{data?.study_level}</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Selected Meal</Text>
                <Text style={styles.value}>{data?.selected_meal}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Selected Resident</Text>
                <Text style={styles.value}>{data?.selected_resident}</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Off Campus</Text>
                <Text style={styles.value}>{data?.off_campus ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Financial Approval</Text>
                <Text style={styles.value}>Yes</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Completed Registration</Text>
                <Text style={styles.value}>{data?.completed_registration ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Selected Credit Hours</Text>
                <Text style={styles.value}>25</Text>
            </View>
            <View style={[styles.row, styles.stripe]}>
                <Text style={styles.label}>Submit Registration</Text>
                {
                  mutationLoading ?
                  (
                    <TouchableOpacity style={styles.button}>
                      <ActivityIndicator size="small" color="#000000" />
                    </TouchableOpacity>
                  ) :
                  (
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                      <Text style={styles.buttonText}>Submit Registration</Text>
                    </TouchableOpacity>
                  )
                }
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