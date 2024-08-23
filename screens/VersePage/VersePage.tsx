import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Text, View, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useRoute } from '@react-navigation/native';
import { BibleContext } from '../context/bibleContext';
import { ConnectionContext } from '../context/connectionContext';
import { Bible } from '../Components/Books';
import Presenter from "../VerseView-Presenter/presenter"

// Get screen dimensions
const { width, height } = Dimensions.get('window');

type Props = {}

type VerseParams = {
    book: string;
    selected: number;
    booknumber: number;
    limit: number;
}
type Book = {
    book: string;
    limit: number;
}

const VersePage = (props: Props) => {

    const route = useRoute();
    const [selectedBookName, setBookName] = useState({
        book: "",
        limit: 0,
    });
    const [selectedBook, setBookNumber] = useState<number>(0);
    const [selectedChapter, setChapter] = useState<number>(0);
    const { Book, GetBibleByBookNumber } = useContext(BibleContext);
    const {  Connect,connectionUrl,connectionStatus,PresentingData } = useContext(ConnectionContext);

    console.log("mainlog", selectedBook, selectedChapter);

    const IncrementChapter = () => {
        const chapter = selectedChapter + 1;
        const chapterlimit = selectedBookName?.limit ?? 0
        if (chapter > chapterlimit) {
            console.log(true)
            const newBookNum = selectedBook + 1;
            console.log("newmmin", newBookNum)
            const newBook = Bible.find(b => b.bookNumber === newBookNum);
            const newBookName = newBook?.title
            const newBookLimit = newBook?.limit
            setBookName({
                ...selectedBookName,
                book: newBookName || "",
                limit: newBookLimit || 0,
            });
            setBookNumber(newBookNum);
            setChapter(1)
            GetBibleByBookNumber(newBookNum, 1)
        } else {
            GetBibleByBookNumber(selectedBook, chapter)
            setChapter(chapter);
        }

    }

    const DecrementChapter = () => {
        const newChapter = Math.max((selectedChapter ?? 1) - 1, 1);
        console.log(newChapter)
        GetBibleByBookNumber(selectedBook, newChapter);
        setChapter(newChapter);
    }

    useEffect(() => {
        const { booknumber, book, selected, limit } = route.params as VerseParams;
        console.log("effect", book, booknumber, selected)
        GetBibleByBookNumber(booknumber, selected)
        setBookName({
            ...selectedBookName,
            book: book,
            limit: limit,
        });
        setBookNumber(booknumber);
        setChapter(selected);

    }, [route.params]);

    const HandlePresent = (book:number,Chapter:number,versenum:number) => {
        if(connectionStatus===true){
            const res = Bible.find(b => b.bookNumber === book);
            const prbook = res?.title
            Presenter(book,Chapter,versenum,connectionUrl)
            PresentingData(`${prbook} ${Chapter}:${versenum+1}`)
        }
       
    }
    console.log(Book)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity>
                    <Icon name="left" onPress={DecrementChapter} size={width * 0.06} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headingText}>{selectedBookName?.book} {selectedChapter}</Text>
                <TouchableOpacity onPress={IncrementChapter}>
                    <Icon name="right" size={width * 0.06} color="#000000" />
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.scroll}
                data={Book}
                keyExtractor={(item) => item.verseNum.toString()} 
                renderItem={({ item }) => (
                    <View style={styles.verseContainer}>
                        <TouchableWithoutFeedback onPress={()=>HandlePresent(selectedBook,selectedChapter,item.verseNum-1)}> 
                            <View style={styles.verse}>
                                <Text style={styles.versenum}>{item.verseNum}</Text>
                                <Text style={styles.versetxt}>{item.word}</Text>
                            </View>
                        </TouchableWithoutFeedback>
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
