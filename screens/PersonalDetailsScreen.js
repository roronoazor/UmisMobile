import React, { useState } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity, 
    ActivityIndicator
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { primaryColor, stripedColor } from '../constants/colors';
import {Picker} from '@react-native-picker/picker';
import { fetchData, postData } from '../modules/utilQuery';
import { useMutation, useQuery } from 'react-query';
import { checkAndHandleAPIError } from '../modules/utilQuery';
import { GET_PERSONAL_DETAILS } from '../config/serverUrls';
import { useSelector } from 'react-redux';
import UActivityIndicator from '../components/ActivityIndicatorComponent';
import { useQueryClient } from 'react-query';

const religionOptions = [
    'Christianity',
    'Islam',
    'Traditional Religion',
    'Other',
  ];

const statesOptions = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'FCT - Abuja',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
    'Not Nigerian',
  ];


const PersonalDetails = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'personal', title: 'Personal Details' },
    { key: 'degree', title: 'Degree Details' },
    { key: 'edit', title: 'Review Details'}
  ]);
  const [userData, setUserData] = useState({});
  const auth = useSelector(state => state.auth.auth);

  
  const RenderPersonalDetails = ({ userData }) => (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Matric No.</Text>
        <Text style={styles.value}>{userData?.matric_no}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Student Name</Text>
        <Text style={styles.value}>{userData?.user_data?.last_name} {userData?.user_data?.first_name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Programme</Text>
        <Text style={styles.value}>{userData?.programme}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Department</Text>
        <Text style={styles.value}>{userData?.department}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Entry Level</Text>
        <Text style={styles.value}>{userData?.entry_level}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Study Level</Text>
        <Text style={styles.value}>{userData?.study_level}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Religion</Text>
        <Text style={styles.value}>{userData?.religion}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Denomination</Text>
        <Text style={styles.value}>{userData?.denomination}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Sex</Text>
        <Text style={styles.value}>{userData?.sex}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Marital Status</Text>
        <Text style={styles.value}>{userData?.marital_status}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nationality</Text>
        <Text style={styles.value}>{userData?.nationality}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{userData?.address}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Town</Text>
        <Text style={styles.value}>{userData?.town}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Country</Text>
        <Text style={styles.value}>{userData?.country}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>On Probation</Text>
        <Text style={styles.value}>{userData?.on_probation}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Off Campus</Text>
        <Text style={styles.value}>{userData?.off_campus}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>School Details</Text>
        <Text style={styles.value}>{userData?.school_details}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Department Details</Text>
        <Text style={styles.value}>{userData?.department_details}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Account Number</Text>
        <Text style={styles.value}>{userData?.account_number}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>ETranzact Card Number</Text>
        <Text style={styles.value}>{userData?.etranzact_number}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userData?.email}</Text>
      </View>
    </ScrollView>
  );

  const RenderDegreeDetails = ({ userData }) => (
    <ScrollView style={styles.container}>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Level</Text>
        <Text style={styles.value}>{userData?.level}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Sub</Text>
        <Text style={styles.value}>{userData?.sub}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Degree</Text>
        <Text style={styles.value}>{userData?.degree}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Department</Text>
        <Text style={styles.value}>{userData?.department}</Text>
      </View>
      <View style={[styles.row, styles.stripe]}>
        <Text style={styles.label}>Programme</Text>
        <Text style={styles.value}>{userData?.programme}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Core Area</Text>
        <Text style={styles.value}>Yes</Text>
      </View>
    </ScrollView>
  );

  const RenderEditReviewDetails = ({ userData, auth }) => {
    const [mobileNo, setMobileNo] = useState(userData?.mobile_number);
    const [telNo, setTelNo] = useState(userData?.telephone_number);
    const [email, setEmail] = useState(userData?.user_data?.email);
    const [address, setAddress] = useState(userData?.address);
    const [zipCode, setZipCode] = useState(userData?.zip_code);
    const [town, setTown] = useState(userData?.town);
    const [religion, setReligion] = useState(userData?.religion);
    const [state, setState] = useState(userData?.state);
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(postData, {
      onSuccess: ({ data }) => {
        Toast.show('Success', Toast.LONG);
        queryClient.invalidateQueries('personalDetails')
      },
      onError: (error) => {
       checkAndHandleAPIError(error); 
      }
    });


    const handleSubmit = () => {
        // Save the form data here

        const payload_data = {
          mobile_number: mobileNo,
          telephone_number: telNo,
          email,
          address,
          zip_code: zipCode,
          town,
          religion,
          state
        }

        mutate({
          url: GET_PERSONAL_DETAILS,
          data: payload_data,
          authenticate: true,
          token: auth.token
        });
      };

      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile No.</Text>
            <TextInput
              style={styles.input}
              value={mobileNo}
              onChangeText={setMobileNo}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tel No.</Text>
            <TextInput
              style={styles.input}
              value={telNo}
              onChangeText={setTelNo}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Zip Code</Text>
            <TextInput
              style={styles.input}
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Town</Text>
            <TextInput
              style={styles.input}
              value={town}
              onChangeText={setTown}
            />
          </View>
          <View style={styles.row}>
               <Text style={styles.label}>Religious Affiliation</Text>
                <Picker
                style={styles.picker}
                selectedValue={religion}
                onValueChange={setReligion}
                >
                  {religionOptions.map((religion, index) => {
                    return <Picker.Item key={index} label={religion} value={religion} />
                  })}
                </Picker>
          </View>
          <View style={styles.row}>
               <Text style={styles.label}>State of Origin/LGA:</Text>
                <Picker
                style={styles.picker}
                selectedValue={state}
                onValueChange={setState}
                >
                  {statesOptions.map((state, index) => {
                    return <Picker.Item key={index} label={state} value={state} />
                  })}
                </Picker>
          </View>
          <View style={{ flex: 1, alignItems: 'center', padding: 10, backgroundColor: '#fff'}}>
            {
              isLoading ? 
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
      )
  }

  const renderScene = SceneMap({
    personal: () => <RenderPersonalDetails userData={userData} />,
    degree: () => <RenderDegreeDetails userData={userData} />,
    edit: () => <RenderEditReviewDetails userData={userData} auth={auth} />
  });

  let payload_data = {};
  const {  isLoading, isError, data, error, isFetching } = useQuery(['personalDetails',
                          { 
                            url: GET_PERSONAL_DETAILS,
                            payload_data,
                            authenticate:true,
                            token: auth.token
                           }],
                          fetchData, 
                          {
                            retry:false,
                            onSuccess: ({ data }) => {
                              setUserData(data?.detail);
                            },
                            onError: (error) => {
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
    <>
        {/* <AppHeader title="Welcome Isaac" /> */}
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={styles.tabView}
        renderTabBar={(props) => (
            <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
            />
        )}
        />
    </>
  );
};

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
    backgroundColor: primaryColor,
    padding: 16,
    minWidth: 150,
    borderRadius: 10
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  picker: {
    flex: 2,
    height: 40,
    borderColor: 'gray',
    borderWidth: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  }
});

export default PersonalDetails;