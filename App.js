import React from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import SemesterResultScreen from './screens/SemesterResultScreen';
import PersonalDetailsScreen from './screens/PersonalDetailsScreen';
import SemesterCoursesScreen from './screens/SemesterCoursesScreen';
import CommenceRegistrationScreen from './screens/CommenceRegistrationScreen';
import WorshipScreen from './screens/WorshipScreen';
import ResidenceScreen from './screens/ResidenceScreen';
import { NativeBaseProvider, Box } from "native-base";
import { 
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
  FontAwesome5
} from '@expo/vector-icons';
import MealTypeScreen from './screens/MealTypeScreen';
import SubmitRegistrationScreen from './screens/SubmitRegistrationScreen';
import SelectCoursesScreen from './screens/SelectCoursesScreen';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Provider } from "react-redux";
import  store  from "./store";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      checkAndHandleAPIError(error);
    }
  })
});


function PersonalDetailsStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity  onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu-outline" size={24} />
          </TouchableOpacity>
        ),
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff', // Customize your header color here
        },
        headerTintColor: '#000', // Customize your header text color here
      }}
    >
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetailsScreen}
        options={{ title: 'Personal Details' }}
      />
      <Stack.Screen
        name="SemesterResult"
        component={SemesterResultScreen}
        options={{ title: 'Semester Result' }}
      />
      <Stack.Screen
        name="SemesterCourses"
        component={SemesterCoursesScreen}
        options={{ title: 'Semester Courses' }}
      />
      {/* Add more screens to the stack navigator here */}
    </Stack.Navigator>
  );
}

function SemesterStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerLeft: () => (
          <TouchableOpacity  onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu-outline" size={24} />
          </TouchableOpacity>
        ),
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff', // Customize your header color here
        },
        headerTintColor: '#000',
      })}
    >
      <Stack.Screen
        name="SemesterResult"
        component={SemesterResultScreen}
        options={{ title: 'Semester Result', headerShown: true }}
      />
      <Stack.Screen
        name="SemesterCourses"
        component={SemesterCoursesScreen}
        options={{ title: 'Semester Courses', headerShown: true }}
      />
      {/* Add more screens to the stack navigator here */}
    </Stack.Navigator>
  );
}

const LogoutButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ paddingVertical: 20, paddingHorizontal: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
    </View>
  </TouchableOpacity>
);

function AppDrawerContent(props){
  return (
     <DrawerContentScrollView {...props} contentContainerStyle={{flex:1}}>
       {/*all of the drawer items*/}
       <DrawerItemList {...props}  style={{borderWidth:1}}/>
       <View style={{flex:1,marginVertical:20,borderWidth:1}}>
         {/* here's where you put your logout drawer item*/}
         <DrawerItem 
           label="Log out"
           onPress={()=>{
             props.navigation.replace("Login");
           }}
           style={{flex:1,justifyContent:'flex-end'}}
           icon={() => <FontAwesome name="sign-out" size={24} color="black" />}
         />
       </View>
     </DrawerContentScrollView>
   );
 }

function DrawerNavigator({ navigation }) {
  
  return (
    <Drawer.Navigator drawerContent={props=><AppDrawerContent {...props} />}>
    <Drawer.Screen
      name="PersonalDetails"
      component={PersonalDetailsScreen}
      options={{
        headerShown: true,
        drawerIcon: ({ color, size }) => (
          <FontAwesome name="user" size={32} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Semester Result"
      component={SemesterResultScreen}
      options={{
        headerShown: true,
        drawerIcon: ({ color, size }) => (
          <Foundation name="results-demographics" size={28} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="SemesterCourses"
      component={SemesterCoursesScreen}
      options={{
        headerShown: true,
        drawerIcon: ({ color, size }) => (
          <FontAwesome name="book" size={24} color={color} />
        ),
        title: "Semester Courses"
      }}
    />
    <Drawer.Screen
      name="CommenceRegistration"
      component={CommenceRegistrationScreen}
      options={{
        headerShown: true,
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="insert-invitation" size={24} color={color} />
        ),
        title: "Register For Semester"
      }}
    />
    <Drawer.Screen
      name="MealType"
      component={MealTypeScreen}
      options={{
        headerShown: true,
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="fastfood" size={24} color={color} />
        ),
        title: "Select Meal"
      }}
    />
    <Drawer.Screen
      name="ResidenceScreen"
      component={ResidenceScreen}
      options={{
        headerShown: true,
        drawerIcon: ({ color, size }) => (
          <FontAwesome name="home" size={24} color={color} />
        ),
        title: "Select Residence"
      }}
    />
    <Drawer.Screen
      name="WorshipCenter"
      component={WorshipScreen}
      options={{
        headerShown: true,
        drawerIcon: ({ color, size }) => (
          <FontAwesome5 name="place-of-worship" size={24} color={color} />
        ),
        title: "Select Worship Center"
      }}
    />
    <Drawer.Screen
      name="SelectCourses"
      component={SelectCoursesScreen}
      options={{
        headerShown: true,
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="selection-ellipse-arrow-inside" size={24} color={color} />
        ),
        title: "Select Courses"
      }}
    />
    <Drawer.Screen
      name="SubmitRegistration"
      component={SubmitRegistrationScreen}
      options={{
        headerShown: true,
        drawerIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="content-save-move" size={24} color={color} />
        ),
        title: "Submit Registration"
      }}
    />
  </Drawer.Navigator>
  );
}



function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
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
            name="Drawer"
            component={DrawerNavigator}
          />
          {/* Add more screens to the stack navigator here */}
        </Stack.Navigator>
        </NativeBaseProvider>
        </QueryClientProvider>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
