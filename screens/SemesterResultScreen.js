import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { primaryColor, stripedColor } from '../constants/colors';
import UActivityIndicator from '../components/ActivityIndicatorComponent';
import axios from 'axios';
import { connect } from 'react-redux';
import { GET_USER_SEMESTERS } from '../config/serverUrls';

class SemesterResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Semester', 'Study Level', 'Hours', 'GPA', 'C.Hours', 'C.GPA'],
      widthArr: [180, 100, 80, 80, 80, 80],
      tableData: null,
      loading: true
    };
  }

  componentDidMount() {
    axios.get(GET_USER_SEMESTERS, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
    .then(response => {
      const tableData = response.data;
      const { detail: { semester } } = tableData;
      
      let xData = [];
      semester.map((sem, index) => {
        let yData = [];
        yData.push(sem?.semester?.id);
        yData.push(sem?.semester?.semester);
        yData.push(sem?.study_level);
        yData.push(sem?.hours);
        yData.push(sem?.gpa);
        yData.push(sem?.credit_hours);
        yData.push(sem?.credit_gpa);
        xData.push(yData);
      });
      this.setState({ tableData: xData , loading: false });
    })
    .catch(error => {
      console.log(error);
      this.setState({ loading: false });
      Alert.alert('Error', 'Failed to fetch data');
    });
  }

  _alertIndex(id) {
    this.props.navigation.navigate('SemesterCourses', { id });
  }

  render() {
    const { tableData, loading, error } = this.state;
    

    if (loading) {
      return (
        <UActivityIndicator />
      );
    }

    const element = (data, id) => {
      return(
      <TouchableOpacity onPress={() => this._alertIndex(id)}>
        <View>
          <Text style={styles.linkText}>{data}</Text>
        </View>
      </TouchableOpacity>);
    };

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row
                data={this.state.tableHead}
                widthArr={this.state.widthArr}
                style={styles.header}
                textStyle={[
                  styles.text,
                  { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
                ]}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#fff' }}>
                {tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={[styles.row, index % 2 && { backgroundColor: stripedColor }]}>
                    {rowData.slice(1).map((cellData, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        data={cellIndex === 0 ? element(cellData, rowData[0]) : cellData}
                        width={this.state.widthArr[cellIndex]}
                        textStyle={[styles.text, { textAlign: 'center' }]}
                      />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: primaryColor, color: '#fff' },
  text: { fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, flexDirection: 'row', alignItems: 'center' },
  linkBtn: {
    backgroundColor: 'transparent',
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

const mapStateToProps = state => ({
  token: state.auth.auth.token
});

export default connect(mapStateToProps)(SemesterResultScreen);
