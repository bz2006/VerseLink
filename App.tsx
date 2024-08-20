import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens'
import HomePage from './screens/HomePage/HomePage';
import VersePage from './screens/VersePage/VersePage';
import StickyBottomNav from './screens/Components/BottomNav';
enableScreens()
// Define the navigation stack param list
type RootStackParamList = {
  Home: undefined;  // No params expected
  VersePage: undefined; // Added Verse here
};

// Create a Stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Define the main App component
export default function App() {

useEffect(() => {
}, [])


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="VersePage" component={VersePage} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StickyBottomNav/>
    </NavigationContainer>
  );
}
