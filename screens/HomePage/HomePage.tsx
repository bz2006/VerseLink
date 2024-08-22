import React, { useState,useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import BookCollapse from '../Components/BookCollapse';
import Header from '../Components/header';

type Props = {}


const HomePage = (props: Props) => {
    const [text, onChangeText] = useState('');



    return (
      <SafeAreaView style={styles.safeArea}>
        <Header/>
        
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Search Book"
          />
          <BookCollapse filterText={text}/>
        </View>
        
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 4,
    paddingBottom: 60, // Add padding for the bottom nav
  },
  input: {
    height: 40,
    margin: 5,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: '95%',
  },
  bookCollapse: {
    width: '100%',
  },
});

export default HomePage;
