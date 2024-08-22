import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens'
import HomePage from './screens/HomePage/HomePage';
import VersePage from './screens/VersePage/VersePage';
import StickyBottomNav from './screens/Components/BottomNav';
import { BibleProvider } from './screens/context/bibleContext';
import SearchPage from './screens/SearchPage/SearchPage';
import ConfigPresenter from './screens/VerseView-Presenter/config-presenter';
import { ConnectionProvider } from './screens/context/connectionContext';
enableScreens()
// Define the navigation stack param list
type RootStackParamList = {
  Home: undefined;  // No params expected
  VersePage: undefined;
  SearchPage: undefined;
  ConfigPresenter: undefined; // Added Verse here
};

// Create a Stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Define the main App component
export default function App() {

  useEffect(() => {
  }, [])


  return (
    <BibleProvider>
      <ConnectionProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="VersePage" component={VersePage} options={{ headerShown: false }} />
            <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerShown: false }} />
            <Stack.Screen name="ConfigPresenter" component={ConfigPresenter} options={{ headerShown: false }} />
          </Stack.Navigator>
          <StickyBottomNav />
        </NavigationContainer>
      </ConnectionProvider>
    </BibleProvider>
  );
}
