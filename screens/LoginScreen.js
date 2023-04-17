import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { checkAndHandleAPIError } from '../modules/utilQuery';
import { BackHandler, Alert } from "react-native";
import { useMutation } from 'react-query';
import { postData } from '../modules/utilQuery';
import { storeData } from '../modules/utilFunctions';
import Toast from 'react-native-simple-toast';
import { LOGIN_URL } from '../config/serverUrls';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';

const LoginScreen = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { navigation } = props;
    const dispatch = useDispatch();

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const backAction = () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
      BackHandler.exitApp();

      return true;
    };
  
    React.useEffect(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
  
      return () => {console.log("removing backhandler"); backHandler.remove();}
    }, []);

    const { mutate, isLoading } = useMutation(postData, {
      onSuccess: ({ data }) => {
        storeData(data);
        dispatch(setUser(data));
        navigation.navigate("Drawer");
        Toast.show('Login Successful', Toast.LONG);
      },
      onError: (error) => {
       checkAndHandleAPIError(error); 
      }
    });

    const handleSubmit = () => {
      if (!username || !password) {
        Toast.show(`Please fill all required fields`, Toast.LONG);  
        return;
      }

      const data = {username, password}

      mutate({
        url: LOGIN_URL, 
        payload_data: data
      })

    }
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo-light.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={[styles.formContainer, { width: '100%' }]}>
          <View style={[styles.inputContainer, { width: '80%' }]}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#808080"
              onChangeText={setUsername}
              value={username}
            />
          </View>
          <View style={[styles.inputContainer, { width: '80%' }]}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#808080"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={toggleShowPassword}
            >
              <Text style={styles.showPasswordButtonText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.forgotPasswordButton, { margin: '10%' }]}>
            <Text style={styles.forgotPasswordButtonText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          {
            isLoading ? (
              <TouchableOpacity style={[styles.loginButton, { width: '50%' }]}>
                <ActivityIndicator size="small" color="#000000" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.loginButton, { width: '50%' }]} onPress={handleSubmit}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: '#004282',
    },
    logoContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    logo: {
      height: 100,
      width: '80%',
      //maxWidth: 300,
    },
    formContainer: {
      flex: 2,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '80%',
      //maxWidth: 300,
      marginTop: 20
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    input: {
    flex: 1,
    height: 40,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    borderRadius: 5
  },
  showPasswordButton: {
    padding: 10,
  },
  showPasswordButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  forgotPasswordButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});


export default LoginScreen;