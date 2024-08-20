import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Text, View, Dimensions ,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

type Props = {}

type VerseParams = {
    book: string;
    selected: number;
    booknumber: number;
}

const db = SQLite.openDatabase(
    {
        name: 'kjv.db',
        createFromLocation: "~www/kjv.db",
        location: 'Library'
    },
    () => { console.log("Connected") },
    error => { console.log(error, "cant Connect") }
);

const VersePage = (props: Props) => {

    const route = useRoute();
    const [selectedBook, setBook] = useState<string | null>(null);
    const [selectedChapter, setChapter] = useState<number | null>(null);
    const [verse, setverse] = useState([])

    console.log("mainlog", selectedBook, selectedChapter);
    console.log(verse)

   
    useEffect(() => {
        const { booknumber, book, selected } = route.params as VerseParams;
        console.log("effect", book, booknumber)
       
        setBook(book); // Set the selected book as a string
        setChapter(selected); // Set the selected chapter as a number
    }, [route.params]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity>
                    <Icon name="left" size={width * 0.06} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headingText}>{selectedBook} {selectedChapter}</Text>
                <TouchableOpacity>
                    <Icon name="right" size={width * 0.06} color="#000000" />
                </TouchableOpacity>
            </View>
            <FlatList
            style={styles.scroll}
                data={verse}
                keyExtractor={(item) => item.wordId.toString()} // Use a unique key for each item
                renderItem={({ item }) => (
                    <View style={styles.verseContainer}>
                        <View style={styles.verse}>
                            <Text style={styles.versenum}>{item.verseNum}</Text>
                            <Text style={styles.versetxt}>{item.word}</Text>
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: width * 0.01,
    },
    scroll: {
        marginBottom: height * 0.05,
    },
    heading: {
        flexDirection: "row",
        marginVertical: height * 0.01,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.02,
    },
    headingText: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        color: '#333',
    },
    verseContainer: {
        flex: 1,
    },
    verse: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: width * 0.03,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: height * 0.01,
    },
    versetxt: {
        fontSize: width * 0.05,
        lineHeight: width * 0.06,
        color: '#000000',
        flex: 1,
        flexWrap: 'wrap',
    },
    versenum: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#777',
        marginRight: width * 0.02,
    }
});

export default VersePage;
