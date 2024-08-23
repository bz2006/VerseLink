import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, SafeAreaView, FlatList, TouchableWithoutFeedback, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { BibleContext } from '../context/bibleContext';
import { Bible } from '../Components/Books';
import { ConnectionContext } from '../context/connectionContext';
import Presenter from '../VerseView-Presenter/presenter';
import ClosePresenter from '../VerseView-Presenter/close-presenter';
import gindic from './Translator';

type Props = {};
const { width, height } = Dimensions.get('window');

const SearchPage = (props: Props) => {
    const [text, onChangeText] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const { SearchResults, SearchBible } = useContext(BibleContext);
    const { currentPresenting, connectionUrl, connectionStatus, PresentingData } = useContext(ConnectionContext);

    const [isSelectingFromDropdown, setIsSelectingFromDropdown] = useState(false);

    const handleSearch = () => {
        gindic(text, (words) => {
            SearchBible(words[1][0][1][0])
            console.log(words[1][0][1][0]);
        });
    };

    useEffect(() => {
        if (text && !isSelectingFromDropdown) {
            gindic(text, (words) => {
                let data = words[1][0][1];
                setSearchData(data);
                setShowDropdown(true);
            });
        } else if (!text) {
            setSearchData([]);
            setShowDropdown(false);
        }
        setIsSelectingFromDropdown(false);
    }, [text]);

    const handleAutocompleteSelection = (selectedText) => {
        setIsSelectingFromDropdown(true);
        onChangeText(selectedText);
        setSearchData([]);
        setShowDropdown(false);
        Keyboard.dismiss();
    };

    const HandlePresent = (book, Chapter, versenum) => {
        if (connectionStatus) {
            const res = Bible.find(b => b.bookNumber === book);
            const prbook = res?.title;
            Presenter(book, Chapter, versenum, connectionUrl);
            PresentingData(`${prbook} ${Chapter}:${versenum + 1}`);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
            <View style={headerstyles.header}>
                <Text style={headerstyles.headerText}>VerseLink</Text>
                {currentPresenting ? (
                    <TouchableWithoutFeedback onPress={() => {
                        ClosePresenter(connectionUrl);
                        PresentingData("");
                    }}>
                        <View style={headerstyles.present}>
                            <Text style={headerstyles.presenttx}>{currentPresenting}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ) : null}
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Search Book"
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                    onFocus={() => setShowDropdown(true)}
                />
                {showDropdown && searchData.length > 0 && (
                    <View style={styles.dropdown}>
                        <FlatList
                            data={searchData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleAutocompleteSelection(item)}>
                                    <View style={styles.autocompleteItem}>
                                        <Text style={styles.autocompleteText}>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            style={styles.autocompleteContainer}
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )}
            </View>
            <FlatList
                style={styles.scroll}
                data={SearchResults}
                keyExtractor={(item) => item.wordId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.verseContainer}>
                        <TouchableWithoutFeedback onPress={() => HandlePresent(item.bookNum, item.chNum, item.verseNum - 1)}>
                            <View>
                                <Text style={styles.bkname}>{item.bookName} {item.chNum}</Text>
                                <View style={styles.verse}>
                                    <Text style={styles.versenum}>{item.verseNum}</Text>
                                    <Text style={styles.versetxt}>{item.word}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 45,
        margin: 5,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        padding: 10,
        width: '100%',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        width: '100%',
        maxHeight: 200,
        backgroundColor: '#FFF',
        borderRadius: 8,
        zIndex: 1,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    autocompleteContainer: {
        maxHeight: '100%',
    },
    autocompleteItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ECECEC',
    },
    autocompleteText: {
        fontSize: 16,
        color: '#333',
    },
    scroll: {
        marginBottom: height * 0.05,
        paddingHorizontal: 10,
    },
    flatListContent: {
        paddingBottom: height * 0.05,
    },
    verseContainer: {
        flex: 1,
    },
    verse: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 5,
        borderRadius: 10,
        marginBottom:5
    },
    versetxt: {
        fontSize: width * 0.045,
        lineHeight: width * 0.055,
        color: '#000',
        flex: 1,
        flexWrap: 'wrap',
    },
    versenum: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#777',
        marginRight: width * 0.02,
    },
    bkname: {
        fontSize: width * 0.04,
        color: '#777',
        marginLeft: width * 0.01,
        marginBottom:-4
    },
    break: {
        height: 20, // Adjust the height as needed for spacing
      },
});

const headerstyles = StyleSheet.create({
    present: {
        padding: 8,
        backgroundColor: '#006400',
        borderRadius: 10,
    },
    presenttx: {
        fontSize: width * 0.04,
        color: '#fff',
        fontWeight: 'bold',
    },
    header: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default SearchPage;
