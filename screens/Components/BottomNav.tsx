// StickyBottomNav.js
import React from 'react';
import { useNavigation ,NavigationProp } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  SearchPage: undefined;
  ConfigPresenter: undefined;
  Settings: undefined;
  // Add any other routes here
};

const StickyBottomNav = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    // /onPress={() => { navigation.navigate("HomePage") }}
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Home") }}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("SearchPage") }}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("ConfigPresenter") }}>
        <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default StickyBottomNav;
