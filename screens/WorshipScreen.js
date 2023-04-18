import React, { useState } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { primaryColor, stripedColor } from '../constants/colors';

import { fetchData, postData } from '../modules/utilQuery';
import { useMutation, useQuery } from 'react-query';
import { checkAndHandleAPIError } from '../modules/utilQuery';
import { GET_USER_WORSHIP_CENTER_TYPES } from '../config/serverUrls';
import { useSelector } from 'react-redux';
import UActivityIndicator from '../components/ActivityIndicatorComponent';
import { useQueryClient } from 'react-query';


const WorshipScreen = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [worshipTypes, setWorshipTypes] = useState([]);
  const [userWorshipTypes, setUserWorshipTypes] = useState([]);
  const auth = useSelector(state => state.auth.auth);
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries('worship');
    },
    onError: (error) => {
     checkAndHandleAPIError(error); 
    }
  });

  const handleSubmit = () => {
    mutate({
      url: GET_USER_WORSHIP_CENTER_TYPES, 
      payload_data: { ids: selectedItems },
      authenticate: true,
      token: auth?.token
    })
  }

  let payload_data = {};
  const {  isLoading } = useQuery(['worship',
                          { 
                            url: GET_USER_WORSHIP_CENTER_TYPES,
                            payload_data,
                            authenticate:true,
                            token: auth.token
                           }],
                          fetchData, 
                          {
                            retry:false,
                            onSuccess: ({ data }) => {
                              const { detail: { worships, user_worships } } = data;
                              setWorshipTypes(worships);
                              setUserWorshipTypes(user_worships);
                              let userWorshipIds = user_worships.map(worship=>worship.worship_center)
                              setSelectedItems(userWorshipIds);
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
    <ScrollView>
        <ScrollView horizontal={true}>
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
                <Text style={[styles.headerText, styles.alignCenter, { width: 200 }]}>Worship Center</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width: 160 }]}>Location on campus</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width: 150 }]}>Pastor in Charge</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width: 80 }]}>Space Left</Text>
            </View>
            {worshipTypes.map((item, index) => (
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
                <Text style={[styles.text, styles.alignCenter, { width: 200 }]}>{item?.worship_center}</Text>
                <Text style={[styles.text, styles.alignCenter, { width: 160 }]}>{item?.location_on_campus}</Text>
                <Text style={[styles.text, styles.alignCenter, { width: 150 }]}>{item?.pastor_in_charge}</Text>
                <Text style={[styles.text, styles.alignCenter, { width: 80 }]}>{item?.space_left}</Text>
                </View>
            ))}
            </View>
        </ScrollView>
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
    </ScrollView>
  );

};


const data = [
    { id:1, worshipCenter: 'Bethel Chapel', campusLocation: 'Bethel Hall Auditorium', pastor: 'Adebowale Adesanya', spaceLeft: '-1'},
    { id:2, worshipCenter: 'Beula', campusLocation: 'Platinum Hall Auditorium', pastor: 'Emmanuel Eregare', spaceLeft: '98'},
    { id:3, worshipCenter: 'Canaan Land Chapel', campusLocation: '	Nelson Mandela Auditorium', pastor: 'Olugbenga Idowu', spaceLeft: '0'},
    { id:4, worshipCenter: 'Christ Our Foundation Chapel', campusLocation: 'Law Activity Hall Iperu Campus', pastor: 'JAF Adeoti', spaceLeft: '336'},
    { id:5, worshipCenter: 'Covenant Chapel', campusLocation: 'White Hall Auditorium', pastor: 'Gambo Daudu', spaceLeft: '1'},
    { id:6, worshipCenter: 'Dominion Chapel', campusLocation: 'Ogden Hall Auditorium', pastor: 'Biague Laguibilssial', spaceLeft: '-3'},
    { id:7, worshipCenter: 'Glory Land Chapel', campusLocation: 'Winslow Hall', pastor: 'Gift Okan-Gbenedio', spaceLeft: '-4'},
    { id:8, worshipCenter: 'Grace Chapel', campusLocation: 'WRA', pastor: 'Kingsley Ananabe', spaceLeft: '25'},
    { id:9, worshipCenter: 'Grace Chapel', campusLocation: 'WRA', pastor: 'Kingsley Ananabe', spaceLeft: '25'},
    { id:10, worshipCenter: 'Heir of the Kingdom Chapel', campusLocation: 'BUTH 600 Seater', pastor: 'John Sotunsa', spaceLeft: '-178'},
    { id:11, worshipCenter: 'Heritage Church', campusLocation: 'Old Cafeteria', pastor: 'Chukwuemeka Abaribe', spaceLeft: '4'},
    { id:12, worshipCenter: 'Light house Chapel', campusLocation: 'Queen Esther Auditorium', pastor: 'Jonathan Ikhane', spaceLeft: '-11'},
    { id:13, worshipCenter: 'Living Spring Chapel', campusLocation: 'Samuel Akande Auditorium', pastor: 'Michael Akpa', spaceLeft: '-1'},
    { id:14, worshipCenter: 'Maranatha Chapel', campusLocation: 'Alalade Complex (Top of Registry)', pastor: 'Abel Akinpelu', spaceLeft: '88'},    
    { id:15, worshipCenter: 'Mount Zion Chapel', campusLocation: 'Gideon Troopers', pastor: 'Evans Nwaomah', spaceLeft: '-1'},    
    { id:16, worshipCenter: 'New Creation Chapel', campusLocation: 'FAD Hall Auditorium', pastor: 'Theodore Dickson', spaceLeft: '-19' },
    { id:17, worshipCenter: 'New Life Chapel', campusLocation: 'BBS Auditorium B', pastor: 'University Pastor', spaceLeft: '1' },
    { id:18, worshipCenter: 'Pioneer Church', campusLocation: 'Pioneer Church', pastor: 'Oladosu Opeyemi', spaceLeft: '0' },
    { id:19, worshipCenter: 'Prince Emmanuel Chapel', campusLocation: 'BBS Auditorium A', pastor: 'Promise Nwaka', spaceLeft: '-14' },
    { id:20, worshipCenter: 'Redemption Chapel', campusLocation: 'Ameyoh Auditorium', pastor: 'Gabriel Masfa', spaceLeft: '-1' },
    { id:21, worshipCenter: 'Siloam Valley Church', campusLocation: 'BUTH', pastor: 'Sylvester Afanga', spaceLeft: '155' },
    { id:22, worshipCenter: 'Solid Rock Chapel', campusLocation: 'Justice Deborah Hall, Iperu Campus', pastor: 'Ayo Adeoye', spaceLeft: '315' },
    { id:23, worshipCenter: 'Testimony Chapel', campusLocation: 'Crystal Hall Auditorium', pastor: 'Seun Ajila', spaceLeft: '0' },
    { id:24, worshipCenter: 'Community (for part-time students not worshiping on campus)', campusLocation: 'Community	University', pastor: 'Chaplain', spaceLeft: '176' },
    { id:25, worshipCenter: 'Shekainah Glory', campusLocation: 'Amphitheatre', pastor: 'Peter Azorondu', spaceLeft: '0' },
    { id:26, worshipCenter: 'Christ Our Shepherd', campusLocation: 'BBS Room C101', pastor: 'Makpa Charles', spaceLeft: '-5' },
    { id:27, worshipCenter: 'Praise Chapel', campusLocation: 'Chiemela Ikonne LTA', pastor: 'Babalola James', spaceLeft: '115' },
    { id:28, worshipCenter: 'Millennium	BBS', campusLocation: 'Aud. C', pastor: 'Joseph Monday A', spaceLeft: '1' },
    { id:29, worshipCenter: 'Youth Church (Senior)', campusLocation: 'Youth Center', pastor: 'Oyerinde Wole', spaceLeft: '65' },
    { id:30, worshipCenter: 'Victoryland', campusLocation: 'Diamond Hall', pastor: 'Ronald Nwosu', spaceLeft: '128' },
    { id:31, worshipCenter: 'Ebenezer', campusLocation: 'Silvanus Chioma LTA', pastor: 'Lucky Echigbue', spaceLeft: '179' },
    { id:32, worshipCenter: 'Salem', campusLocation: 'Topaz Hall', pastor: 'Muyi Oyinloye', spaceLeft: '0' }
]

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
    backgroundColor: primaryColor
  },
  alignCenter: {
    alignItems: 'center'
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    marginHorizontal: 7,
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

export default WorshipScreen;

