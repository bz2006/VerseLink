import React, { createContext, useState, useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

const BibleContext = createContext();
const db = SQLite.openDatabase(
  {
    name: 'Bible_Mal.db',
    createFromLocation: "~www/Bible_Mal.db",
    location: 'Library'
  },
  () => { console.log("Connected") },
  error => { console.log(error, "Can't Connect") }
);

const BibleProvider = ({ children }) => {

  const [Book, setBook] = useState([]);
  const [SearchResults, setSearchResults] = useState([]);
  const [bookNames, setBookNames] = useState([]);

  const GetBibleByBookNumber = async (bookNumber, chapternumber) => {
    try {
      console.log(bookNumber, chapternumber)
      await db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM words WHERE bookNum = ? AND chNum=?',
          [bookNumber, chapternumber],
          (_, { rows }) => {
            const bibleData = [];
            for (let i = 0; i < rows.length; i++) {
              bibleData.push(rows.item(i));
            }
            setBook(bibleData);
            console.log("Bible Get successful");
          },
          (tx, error) => {
            console.log('Error querying data:', error);
          }
        );
      });
    } catch (error) {
      console.log('Error querying data:', error);
    }
  };

  const SearchBible = async (searchTerm) => {
    try {
      console.log(`Searching for: ${searchTerm}`);
      console.log("Seraching")
      await db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM words WHERE word LIKE ?',
          [`%${searchTerm}%`],
          (_, { rows }) => {
            const searchData = [];
            for (let i = 0; i < rows.length; i++) {
              searchData.push(rows.item(i));
            }
            setSearchResults(searchData);
            const extractedBookNames = searchData.map(result => result.bookName);
            const distinctBookNames = Array.from(new Set(extractedBookNames));
            setBookNames(distinctBookNames);
            console.log("Search completed successfully");
          },
          (tx, error) => {
            console.log('Error querying data:', error);
          }
        );
      });
    } catch (error) {
      console.log('Error searching data:', error);
    }
  };

  const SearchBiblebyBook = async (searchTerm, book) => {
    try {
      await db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM words WHERE word LIKE ? AND bookName = ?',
          [`%${searchTerm}%`, book],
          (_, { rows }) => {
            const searchData = [];
            for (let i = 0; i < rows.length; i++) {
              searchData.push(rows.item(i));
            }
            setSearchResults(searchData);
  
            console.log("Search completed successfully");
          },
          (tx, error) => {
            console.log('Error querying data:', error.message);
          }
        );
      });
    } catch (error) {
      console.log('Error searching data:', error.message);
    }
  };
  

  return (

    <BibleContext.Provider value={{
      Book,
      GetBibleByBookNumber,
      SearchResults,
      bookNames,
      SearchBible,
      SearchBiblebyBook
    }}>
      {children}
    </BibleContext.Provider>
  );
};

export { BibleContext, BibleProvider };
