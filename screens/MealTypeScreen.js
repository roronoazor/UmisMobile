import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { primaryColor, stripedColor } from '../constants/colors';

import { fetchData, postData } from '../modules/utilQuery';
import { useMutation, useQuery } from 'react-query';
import { checkAndHandleAPIError } from '../modules/utilQuery';
import { GET_USER_MEAL_TYPES } from '../config/serverUrls';
import { useSelector } from 'react-redux';
import UActivityIndicator from '../components/ActivityIndicatorComponent';

const Table = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const [userMealTypes, setUserMealTypes] = useState([]);
  const auth = useSelector(state => state.auth.auth);


  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(data.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = itemId => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const { mutate, isLoading: mutationLoading } = useMutation(postData, {
    onSuccess: ({ data }) => {
      Toast.show('Saved', Toast.LONG);
    },
    onError: (error) => {
     checkAndHandleAPIError(error); 
    }
  });

  const handleSubmit = () => {
    mutate({
      url: GET_USER_MEAL_TYPES, 
      payload_data: selectedItems,
      authenticate: true,
      token: auth?.token
    })
  }

  let payload_data = {};
  const {  isLoading, isError, error, isFetching } = useQuery(['personalDetails',
                          { 
                            url: GET_USER_MEAL_TYPES,
                            payload_data,
                            authenticate:true,
                            token: auth.token
                           }],
                          fetchData, 
                          {
                            retry:false,
                            onSuccess: ({ data }) => {
                              console.log('d: ', data);
                              const { detail: { meal_types, user_meal_types } } = data;
                              setMealTypes(meal_types);
                              setUserMealTypes(user_meal_types);
                              let userMealIds = user_meal_types.map(meal=>meal.meal_type)
                              setSelectedItems(userMealIds);
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
    <View style={styles.table}>
      <View style={[styles.row, styles.header]}>
        <BouncyCheckbox
          style={styles.checkboxContainer}
          isChecked={selectAll}
          disableBuiltInState
          fillColor={'#fff'}
          unfillColor="transparent"
          iconStyle={{ borderColor: '#ccc', borderRadius: 0 }}
          textStyle={{ fontSize: 16, color: '#000', marginLeft: 8 }}
          innerIconStyle={{
            borderRadius: 0,
          }}
          onPress={handleSelectAll}
        />
        <Text style={styles.headerText}>Selection</Text>
        <Text style={styles.headerText}>Details</Text>
      </View>
      {mealTypes.map((item, index) => (
        <View style={ index % 2 == 0 ? styles.row : [styles.row, styles.stripedRow]} key={item.id}>
          <BouncyCheckbox 
            isChecked={selectedItems.includes(item.id)}
            onPress={() => handleSelectItem(item.id)}
            disableBuiltInState
            fillColor={primaryColor}
            unfillColor='transparent'
            iconStyle={{ borderColor: '#ccc', borderRadius: 0 }}
            textStyle={{ fontSize: 16, color: '#000', marginLeft: 8 }}
            innerIconStyle={{
              borderRadius: 0,
            }}
          />
          <Text style={styles.text}>{item.selection}</Text>
          <Text style={styles.text}>{item.details}</Text>
        </View>
      ))}
        <View style={{  alignItems: 'center', padding: 10, backgroundColor: '#fff'}}>
            {
              mutationLoading ? 
              (
                <TouchableOpacity style={styles.button}>
                  <ActivityIndicator size="small" color="#000000" />
                </TouchableOpacity>
              ) :
              (
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Save</Text>    
                </TouchableOpacity>
              )
            }
         </View>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff'
  },
  stripedRow: {
    backgroundColor: stripedColor
  },
  header: {
    backgroundColor: primaryColor,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#fff'
  },
  checkboxContainer: {
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    backgroundColor: primaryColor,
    padding: 16,
    minWidth: 150,
    borderRadius: 10
  },
});

export default Table;