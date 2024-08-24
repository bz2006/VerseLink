import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, SafeAreaView, FlatList, TouchableWithoutFeedback, Dimensions, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { BibleContext } from '../context/bibleContext';
import { Bible } from '../Components/Books';
import Icon from 'react-native-vector-icons/AntDesign';
import { ConnectionContext } from '../context/connectionContext';
import Presenter from '../VerseView-Presenter/presenter';
import ClosePresenter from '../VerseView-Presenter/close-presenter';
import gindic from './Translator';

type Props = {};
const { width, height } = Dimensions.get('window');

const SearchPage = (props: Props) => {
    const [text, onChangeText] = useState('');
    const [searchtext, setsearchtext] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [isFiltered, setisFiltered] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false);
    const { SearchResults, SearchBible, bookNames, SearchBiblebyBook } = useContext(BibleContext);
    const { currentPresenting, connectionUrl, connectionStatus, PresentingData } = useContext(ConnectionContext);

    const [isSelectingFromDropdown, setIsSelectingFromDropdown] = useState(false);

    

    const handleSearch = () => {
        gindic(text, (words) => {
            SearchBible(words[1][0][1][0])
            setsearchtext(words[1][0][1][0])
        });
        setShowDropdown(false)
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
        setShowDropdown(false);
        setIsSelectingFromDropdown(true);
        onChangeText(selectedText);
        setSearchData([]);
        
        //Keyboard.dismiss();
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
        <SafeAreaView style={{ backgroundColor: '#F0F0F0' }}>

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
            <View style={styles.content}>

                <View style={textInStyeles.container}>
                    <TextInput
                        style={textInStyeles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Search Book"
                        returnKeyType="search"
                        onSubmitEditing={handleSearch}
                        onFocus={() => setShowDropdown(true)}
                    />
                    <View style={textInStyeles.close}>
                        <Icon name="closecircle" onPress={()=>onChangeText("")} size={width * 0.05} color="grey" />
                    </View>
                </View>

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

            <View style={scrollStyles.container}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }} // Ensures ScrollView takes up available space
                >
                    {bookNames.map((book, index) => (
                        <TouchableWithoutFeedback key={index} onPress={() => {
                            SearchBiblebyBook(searchtext, book);
                            setisFiltered(true)
                        }}>
                            <View style={scrollStyles.button}>
                                <Text style={scrollStyles.buttonText}>{book}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </ScrollView>
                {isFiltered === true ? (
                         <Icon name="closecircle" style={scrollStyles.fixedButton} onPress={() => {
                        SearchBible(searchtext);
                        setisFiltered(false)
                    }} size={width * 0.04} color="grey" />
                    
                ) : null}
            </View>

            <FlatList
                style={styles.scroll}
                data={SearchResults}
                keyExtractor={(item) => item.wordId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.verseContainer}>
                        <TouchableWithoutFeedback onPress={() => HandlePresent(item.bookNum, item.chNum, item.verseNum - 1)}>
                            <View >
                                <Text style={styles.bkname}>{item.bookName} {item.chNum}:{item.verseNum}</Text>
                                <View style={styles.verse}>
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

const textInStyeles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        backgroundColor: "#FFFFFF",
        elevation: 2,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    input: {
        height: 50,
        backgroundColor: "transparent",
        padding: 10,
        width: '90%',
    },
    close: {
        marginRight: 15,
        justifyContent:"center",
        alignItems:"center"
    }
})

const scrollStyles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Align children horizontally
        justifyContent: 'space-between', // Distribute space between children
        padding: 8,
        marginTop: -8,
        paddingBottom: 5,
    },
    button: {
        borderRadius: 7,
        justifyContent: "center",
        paddingHorizontal: width * 0.02,
        paddingVertical:width * 0.02,
        backgroundColor:"#FFFFFF",
        overflow: 'hidden',
        marginRight: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
    },
    fixedButton: {
        backgroundColor: '#FFFFFF', // Background color of the button
        padding: 10, // Padding of the button
        borderRadius: 10, // Border radius of the button
    },
    fixedButtonText: {
        color: '#000', // Text color of the button
    },
})
const styles = StyleSheet.create({


    content: {
        alignItems: 'center',
        padding: width * 0.015,
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        width: '100%',
        maxHeight: 200,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
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
        borderRadius: 10,
        padding: width * 0.02,
        backgroundColor: '#fff',
        marginBottom: height * 0.01,
    },
    verse: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 5,
        borderRadius: 10,
        marginBottom: 5
    },
    versetxt: {
        fontSize: width * 0.045,
        lineHeight: width * 0.075,
        color: '#000',
        flex: 1,
        flexWrap: 'wrap',
    },
    bkname: {
        fontSize: width * 0.04,
        color: '#777',
        marginLeft: width * 0.01,
        marginBottom: -4
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
        padding: width * 0.035,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default SearchPage;
