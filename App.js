import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import PersonalDetailsScreen from './screens/PersonalDetailsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="PersonalDetails"
          component={PersonalDetailsScreen}
          options={{ title: 'Personal Details' }}
        />
        {/* Add more screens to the stack navigator here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu-outline" size={24} />
          </TouchableOpacity>
        ),
        headerShown: false  // this hides the default react native header in navigation
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetailsScreen}
        options={{ title: 'Personal Details' }}
      />
      {/* Add more screens to the stack navigator here */}
    </Stack.Navigator>
  );
}

export default App;