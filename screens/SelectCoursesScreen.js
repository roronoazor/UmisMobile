import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { primaryColor, stripedColor } from '../constants/colors';

const SelectCoursesScreen = () => {
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
                <Text style={[styles.headerText, styles.alignCenter]}>Year Taken</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width:200 }]}>Course ID</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width:60 }]}>Course Title</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width:120 }]}>Instructor</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width:120 }]}>Option</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width:120 }]}>Credit Hours</Text>
                <Text style={[styles.headerText, styles.alignCenter, { width:120 }]}>No. GPA</Text>
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
                <Text style={[styles.text, styles.alignCenter]}>{item.yearTaken}</Text>
                <Text style={[styles.text, styles.alignCenter, { width: 200 }]}>{item.courseId}</Text>
                <Text style={[styles.text, styles.alignCenter, { width:60 }]}>{item.courseTitle}</Text>
                <Text style={[styles.text, styles.alignCenter, { width:120 }]}>{item.instructor}</Text>
                <Text style={[styles.text, styles.alignCenter, { width:120 }]}>{item.option}</Text>
                <Text style={[styles.text, styles.alignCenter, { width:120 }]}>{item.creditHours}</Text>
                <Text style={[styles.text, styles.alignCenter, { width:120 }]}>{item.noGpa}</Text>
                </View>
            ))}
            </View>
        </ScrollView>
    </ScrollView>
  );

};


const data = [
    { id:1, yearTaken: 3, courseId: 'COSC328', courseTitle: 'Androids', instructor: 'Emmanuel Ojo', option: 'CS', creditHours: '1', noGpa: 'No' },
    { id:2, yearTaken: 3, courseId: 'COSC328', courseTitle: 'Androids', instructor: 'Emmanuel Ojo', option: 'CS', creditHours: '1', noGpa: 'No' },
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

export default SelectCoursesScreen;

