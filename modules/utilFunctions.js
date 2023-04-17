import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('auth', jsonValue)
    } catch (e) {
      // saving error
      console.log('error: ',  e);
    }
  }

export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('auth')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log('error: ', e);
    }
  }