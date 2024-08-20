import React, { useState,useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import BookCollapse from '../Components/BookCollapse';

type Props = {}
// const db = SQLite.openDatabase(
//   {
//     name: 'kjv.db',
//     createFromLocation : "~www/kjv.db", 
//     location: 'Library'
//   },
//   () => { console.log("Connected")},
//   error => { console.log(error,"cant Connect") }
// );

const HomePage = (props: Props) => {
    const [text, onChangeText] = useState('');

    useEffect(() => {
      // queryData()
      // getTableNames()
  }, []);

  // const getTableNames = async () => {
  //   try {
  //     await db.transaction(tx => {
  //       tx.executeSql(
  //         "SELECT name FROM sqlite_master WHERE type='table';",
  //         [],
  //         (_, { rows }) => {
  //           // rows is an object with a raw() method to get the data as an array
  //           const tableNames = rows.raw().map(row => row.name);
  //           console.log('Table names:', tableNames);
  //         },
  //         error => {
  //           console.log('Error retrieving table names:', error);
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     console.log('Error during transaction:', error);
  //   }
  // };
  // const queryData = async () => {
  //   try {
  //     await db.transaction(tx => {
  //       tx.executeSql(
  //         'SELECT * FROM words',
  //         [],
  //         (_, { rows }) => {
  //           console.log('Data retrieved:', rows);
  //           // for (let i = 0; i < rows.length; i++) {
  //           //   console.log(rows.item(i));  // Correctly access each row item
  //           // }
  //         },
  //         (tx, error) => {
  //           console.log('Error querying data:', error);
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     console.log('Error querying data:', error);
  //   }
  // };
  
  // const insertData = async () => {
  //   try {
  //     await db.transaction(tx => {
  //       tx.executeSql(
  //         'INSERT INTO users (name, email) VALUES (?, ?)',
  //         ['John Doe', 'johndoe@example.com'],
  //         (_, { rowsAffected, insertId }) => {
  //           console.log('Data inserted successfully', rowsAffected);
  //         },
  //         error => {
  //           console.log('Error inserting data:', error);
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     console.log('Error inserting data:', error);
  //   }
  // };
  // const createTable = async () => {
  //   try {
  //     await db.transaction(tx => {
  //       tx.executeSql(
  //         `CREATE TABLE IF NOT EXISTS users (
  //           id INTEGER PRIMARY KEY AUTOINCREMENT,
  //           name TEXT,
  //           email TEXT   
  
  //         );`,
  //         [],
  //         (_, { rowsAffected, insertId }) => {
  //           console.log('Table created successfully', rowsAffected);
  //         },
  //         error => {
  //           console.log('Error creating table:', error);
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     console.log('Error creating table:', error);
  //   }
  // };

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerText}>VerseSync</Text>
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
