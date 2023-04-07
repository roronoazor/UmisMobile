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
} from 'react-native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
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
          <TouchableOpacity style={[styles.loginButton, { width: '50%' }]}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
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