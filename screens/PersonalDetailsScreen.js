import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        // source={require('./background-image.jpg')}
        source={{uri: 'https://reactjs.org/logo-og.png'}}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.logoContainer}>
          <Image
            // source={require('./school-logo.png')}
            source={{uri: 'https://reactjs.org/logo-og.png'}}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#808080"
              onChangeText={setUsername}
              value={username}
            />
          </View>
          <View style={styles.inputContainer}>
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
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordButtonText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    width: '80%',
    maxWidth: 300,
  },
  formContainer: {
    flex: 2,
    justifyContent: 'center',
    width: '80%',
    maxWidth: 300,
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
    borderRadius: 5,
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