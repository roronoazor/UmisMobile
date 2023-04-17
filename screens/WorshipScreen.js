import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { primaryColor, stripedColor } from '../constants/colors';

const WorshipScreen = () => {
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
                <Text style={[styles.headerText, styles.alignCenter, { width: 200 }]}>Worship Center</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width: 160 }]}>Location on campus</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width: 150 }]}>Pastor in Charge</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width: 80 }]}>Space Left</Text>
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
                <Text style={[styles.text, styles.alignCenter, { width: 200 }]}>{item.worshipCenter}</Text>
                <Text style={[styles.text, styles.alignCenter, { width: 160 }]}>{item.campusLocation}</Text>
                <Text style={[styles.text, styles.alignCenter, { width: 150 }]}>{item.pastor}</Text>
                <Text style={[styles.text, styles.alignCenter, { width: 80 }]}>{item.spaceLeft}</Text>
                </View>
            ))}
            </View>
        </ScrollView>
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
});

export default WorshipScreen;

