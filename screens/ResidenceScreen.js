import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { primaryColor, stripedColor } from '../constants/colors';

const ResidenceScreen = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

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
                <Text style={[styles.headerText, styles.alignCenter]}>Residence ID</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width:200 }]}>Residence Name</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width:60 }]}>Capacity</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width:120 }]}>Available Space</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width:120 }]}>Minimum Level</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width:120 }]}>Maximum Level</Text>
            </View>
            {data.map((item, index) => (
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
                <Text style={[styles.text, styles.alignCenter]}>{item.residenceId}</Text>
                <Text style={[styles.text, styles.alignCenter, { width: 200 }]}>{item.residenceName}</Text>
                <Text style={[styles.text, styles.alignCenter, { width:60 }]}>{item.capacity}</Text>
                <Text style={[styles.text, styles.alignCenter, { width:120 }]}>{item.availableSpace}</Text>
                <Text style={[styles.text, styles.alignCenter, { width:120 }]}>{item.minimumLevel}</Text>
                <Text style={[styles.text, styles.alignCenter, { width:120 }]}>{item.maximumLevel}</Text>
                </View>
            ))}
            </View>
        </ScrollView>
    </ScrollView>
  );

};


const data = [
    { id:1, residenceId: 'TE', residenceName: 'TEST', capacity: -1, availableSpace: '', minimumLevel: '', maximumLevel: '' },
    { id:2, residenceId: 'OC', residenceName: 'Off Campus', capacity: '3500', availableSpace: '2721', minimumLevel: '100', maximumLevel: '1000' },
    { id:3, residenceId: 'OG2', residenceName: 'Ogden2', capacity: -1, availableSpace: '', minimumLevel: '200', maximumLevel: '200' },
    { id:4, residenceId: 'BC', residenceName: 'Bethel Splendor1', capacity: '500', availableSpace: '210', minimumLevel: '300', maximumLevel: '400' },
    { id:5, residenceId: 'PM2', residenceName: 'Gideon Troopers2(Medical)', capacity: '249', availableSpace: '156', minimumLevel: '100', maximumLevel: '600' },
    { id:6, residenceId: 'I2', residenceName: 'Gamaliel Hall1', capacity: '262', availableSpace: '120', minimumLevel: '100', maximumLevel: '500' },
    { id:7, residenceId: 'ROYL', residenceName: 'Nelson Mandela1(Royal)', capacity: '800', availableSpace: '280', minimumLevel: '300', maximumLevel: '900' },
    { id:8, residenceId: 'REHB2', residenceName: 'Samuel Akande Hall2', capacity: '249', availableSpace: '-1', minimumLevel: '400', maximumLevel: '500' },
    { id:9, residenceId: 'PM', residenceName: 'Gideon Troopers1(NonMedical)', capacity: '343', availableSpace: '-1', minimumLevel: '400', maximumLevel: '500' },
    { id:10, residenceId: 'WE', residenceName: 'Welch1', capacity: '374', availableSpace: '-1', minimumLevel: '300', maximumLevel: '300' },
    { id:11, residenceId: 'WI', residenceName: 'Winslow1', capacity: '374', availableSpace: '-1', minimumLevel: '100', maximumLevel: '200' },
    { id:12, residenceId: 'BIG', residenceName: 'BIG(Transit)Hall', capacity: '238', availableSpace: '50', minimumLevel: '100', maximumLevel: '200' },
    { id:13, residenceId: 'NM', residenceName: 'Neal Wilson1', capacity: '790', availableSpace: '310', minimumLevel: '100', maximumLevel: '200' },
    { id:14, residenceId: 'TOP1', residenceName: 'Topaz Hall', capacity: '637', availableSpace: '295', minimumLevel: '100', maximumLevel: '500' },
    { id:15, residenceId: 'ALUM1', residenceName: 'Alumni Classic (Transit)Hall', capacity: '90', availableSpace: '30', minimumLevel: '100', maximumLevel: '200' },
    { id:16, residenceId: 'ALUM2', residenceName: 'Alumni Premium (Transit)Hall', capacity: '204', availableSpace: '149', minimumLevel: '100', maximumLevel: '200' },
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
});

export default ResidenceScreen;

