import React, { useState,useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import BookCollapse from '../Components/BookCollapse';

type Props = {}


const HomePage = (props: Props) => {
    const [text, onChangeText] = useState('');



    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>VerseLink</Text>
        </View>
        
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
  header: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f8f8f8',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
