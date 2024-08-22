import React, { useState, useContext, useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, Button, SafeAreaView, FlatList, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { BibleContext } from '../context/bibleContext'
import { Bible } from '../Components/Books';
import { ConnectionContext } from '../context/connectionContext';
import Presenter from '../VerseView-Presenter/presenter';
import ClosePresenter from '../VerseView-Presenter/close-presenter';

type Props = {}
const { width, height } = Dimensions.get('window');
const SearchPage = (props: Props) => {
    const [text, onChangeText] = useState('');
    const { SearchResults, SearchBible } = useContext(BibleContext);
    const { currentPresenting, connectionUrl, connectionStatus,PresentingData } = useContext(ConnectionContext);


    const handleSearch = () => {
        SearchBible(text)
    }

    const HandlePresent = (book: number, Chapter: number, versenum: number) => {
        if(connectionStatus===true){
            const res = Bible.find(b => b.bookNumber === book);
            const prbook = res?.title
            Presenter(book,Chapter,versenum,connectionUrl)
            PresentingData(`${prbook} ${Chapter}:${versenum+1}`)
        }

    }

    return (
        <SafeAreaView>
            <View style={headerstyles.header}>
                <Text style={headerstyles.headerText}>VerseLink</Text>
                {currentPresenting ? (
                    <TouchableWithoutFeedback onPress={()=>{
                        ClosePresenter(connectionUrl);
                        PresentingData("")
                    }}>
                        <View style={headerstyles.present}>
                            <Text style={headerstyles.presenttx}>{currentPresenting}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ) : (null)}

            </View>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Search Book"
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
                <Text>{text}</Text>

            </View>
            <FlatList
                style={styles.scroll}
                data={SearchResults}
                keyExtractor={(item) => item.wordId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.verseContainer}>
                        <TouchableWithoutFeedback onPress={() => HandlePresent(item.bookNum, item.chNum, item.verseNum-1)}>
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
    input: {
        height: 40,
        margin: 5,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        padding: 10,
        width: '95%',
    },
    scroll: {
        marginBottom: height * 0.05,
    }, verseContainer: {
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
})
const headerstyles = StyleSheet.create({
    present: {
        padding: 6,
        backgroundColor: '#228B22',
        borderRadius: 10,
        shadowColor: '#000',
    },
    presenttx: {
        fontSize: width * 0.04,
        color: '#fff',
        fontWeight: 'bold',
    },
    header: {
        width: '100%',
        padding: 15,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
})

export default SearchPage