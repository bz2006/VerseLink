import React,{useContext} from 'react';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SettingsContext } from '../context/settingsContext';
import { darkMode,lightMode } from './ColorSchema';

type RootStackParamList = {
  Home: undefined;
  SearchPage: undefined;
  ConfigPresenter: undefined;
  SettingsPage: undefined;
};

const StickyBottomNav = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { ColorTheme } = useContext(SettingsContext);

  let textColor = ColorTheme === 'light' ? lightMode.color : darkMode.color
  let bgColor = ColorTheme === 'light' ? lightMode.backgroundColor : darkMode.backgroundColor

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <TouchableOpacity  style={[styles.button, { backgroundColor: bgColor }]} onPress={() => { navigation.navigate("Home") }}>
        <Text style={[styles.buttonText, { color: textColor }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]} onPress={() => { navigation.navigate("SearchPage") }}>
        <Text style={[styles.buttonText, { color: textColor }]}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]} onPress={() => { navigation.navigate("ConfigPresenter") }}>
        <Text style={[styles.buttonText, { color: textColor }]}>Connect</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]} onPress={() => { navigation.navigate("SettingsPage") }}>
        <Text style={[styles.buttonText, { color: textColor }]}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  button: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',
    paddingVertical: 10, 
  },
  buttonText: {
    fontSize: 16,
  },
});

export default StickyBottomNav;
