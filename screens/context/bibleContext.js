import React, { createContext, useState, useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

const BibleContext = createContext();
const db = SQLite.openDatabase(
    {
        name: 'kjv.db',
        createFromLocation: "~www/kjv.db",
        location: 'Library'
    },
    () => { console.log("Connected") },
    error => { console.log(error, "Can't Connect") }
);

const BibleProvider = ({ children }) => {
    const [currentChapter, setCurrentChapter] = useState(null);
    const [Book, setBook] = useState([]);


    const GetBibleByBookNumber = async (bookNumber,chapternumber) => {
        try {
            console.log(bookNumber,chapternumber)
          await db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM words WHERE bookNum = ? AND chNum=?',
              [bookNumber,chapternumber],
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

    return (
        
        <BibleContext.Provider value={{ Book, currentChapter, GetBibleByBookNumber }}>
            {children}
        </BibleContext.Provider>
    );
};

export { BibleContext, BibleProvider };
