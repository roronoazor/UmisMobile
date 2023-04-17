import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { primaryColor, stripedColor } from '../constants/colors';
import axios from 'axios';
import { connect } from 'react-redux';
import { GET_USER_SEMESTER_COURSES } from '../config/serverUrls';
import UActivityIndicator from '../components/ActivityIndicatorComponent';


class SemesterCoursesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Course ID', 'Course Title', 'Score', 'Credit', 'Grade', 'GP'],
      widthArr: [80, 200, 80, 80, 80, 80],
      tableData: [],
      loading: true,
      error: null
    };
  }

  

  componentDidMount() {
    console.log(this.props);
    console.log(this.props);
    let id = this.props?.route?.params?.id
    console.log('id: ', id);
    id = id || 99999;
    console.log(`${GET_USER_SEMESTER_COURSES}${id}/`);
    axios.get(`${GET_USER_SEMESTER_COURSES}${id}/`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
    .then(response => {
      const tableData = response.data;
      console.log('t: ', tableData);
      const { detail: { courses } } = tableData;
      console.log('c: ', courses);
      let xData = [];
      courses.map((sem, index) => {
        let yData = [];
        yData.push(sem?.course_data?.course_id);
        yData.push(sem?.course_data?.course_title);
        yData.push(sem?.course_data?.score);
        yData.push(sem?.course_data?.credit);
        yData.push(sem?.course_data?.grade);
        yData.push(sem?.course_data?.gp);
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
  

  render() {
    const { tableData, loading, error } = this.state;
    

    if (loading) {
      return (
        <UActivityIndicator />
      );
    }

    const element = (data, index) => (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.btn}>
          <Text style={styles.text}>{data}</Text>
        </View>
      </TouchableOpacity>
    );

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
                {this.state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={[styles.row, index % 2 && { backgroundColor: stripedColor }]}>
                    {rowData.map((cellData, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        data={cellIndex === 0 ? element(cellData, cellIndex) : cellData}
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
  text: { fontWeight: '400' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, flexDirection: 'row', alignItems: 'center' },
});

const mapStateToProps = state => ({
  token: state.auth.auth.token
});

export default connect(mapStateToProps)(SemesterCoursesScreen);
