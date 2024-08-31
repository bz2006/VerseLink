import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, SafeAreaView, FlatList, TouchableWithoutFeedback, Dimensions, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { BibleContext } from '../context/bibleContext';
import { Bible } from '../Components/Books';
import Icon from 'react-native-vector-icons/AntDesign';
import { SettingsContext } from '../context/settingsContext';
import { darkMode, lightMode } from '../Components/ColorSchema';
import { ConnectionContext } from '../context/connectionContext';
import Presenter from '../VerseView-Presenter/presenter';
import ClosePresenter from '../VerseView-Presenter/close-presenter';
import gindic from './Translator';
import { bookAbbreviations } from '../Components/bookAbbreviations';

type Props = {};
const { width, height } = Dimensions.get('window');

const SearchPage = (props: Props) => {
    const [text, onChangeText] = useState('');
    const [searchtext, setsearchtext] = useState('');
    const [Notfound, setNotfound] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [isFiltered, setisFiltered] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false);
    const { SearchResults, SearchBible, bookNames, SearchBiblebyBook, GetBibleByBookNumberRaw } = useContext(BibleContext);
    const { currentPresenting, connectionUrl, connectionStatus, PresentingData } = useContext(ConnectionContext);

    const [isSelectingFromDropdown, setIsSelectingFromDropdown] = useState(false);
    const { ColorTheme, fontSize } = useContext(SettingsContext);

    let textColor = ColorTheme === 'light' ? lightMode.color : darkMode.color
    let textColor2 = ColorTheme === 'light' ? lightMode.color2 : darkMode.color2
    let bgColor = ColorTheme === 'light' ? lightMode.backgroundColor : darkMode.backgroundColor
    let bg2 = ColorTheme === 'light' ? lightMode.backgroundColor2 : darkMode.backgroundColor2
    let bg3 = ColorTheme === 'light' ? lightMode.backgroundColor3 : darkMode.backgroundColor3

    

    const handleSearch = () => {
        // Regex to match patterns like "book chapter verse" and "book chapter"
        const bibleRefPattern = /^(\d?\s?\w+)\s(\d+)(?:\s(\d+))?$/i;
        const match = text.match(bibleRefPattern);

        if (match) {
            let bookAbbreviation = match[1].toLowerCase().replace(/\s+/g, '');
            let chapter = match[2];
            let verse = match[3] ? parseInt(match[3], 10) : null;  // Handle verse if provided

            // Check for direct abbreviation match
            let fullBookName = bookAbbreviations[bookAbbreviation] || null;

            if (!fullBookName) {
                // Check for abbreviations with spaces (e.g., "1 john")
                fullBookName = bookAbbreviations[`${bookAbbreviation} ${chapter}`] || null;
            }

            if (fullBookName) {
                const bookn = Bible.find((b) => b.title === fullBookName);
                if (bookn) {
                    let bookNum = bookn.bookNumber;
                    if (verse !== null) {
                        // Handle the search with verse if provided
                        HandlePresent(bookNum, chapter, verse - 1);  // Assuming verses are 0-indexed in your system
                    }
                    // Handle the search for the chapter (with or without verse)
                    GetBibleByBookNumberRaw(bookNum, chapter);
                    setsearchtext(`${fullBookName} ${chapter}${verse !== null ? `:${verse}` : ''}`);
                    setShowDropdown(false);
                } else {

                }
            } else {

            }
        } else {
            // If not a Bible reference, translate with gindic and proceed
            gindic(text, (words) => {
                let str = words[1][0][1][0].replace(/\s+$/, '');
                SearchBible(str);
                setsearchtext(str);
            });
        }

        setShowDropdown(false);
        if (isFiltered) {
            setisFiltered(false);
        }
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
        <SafeAreaView style={{ flex: 1, marginBottom: -height * 0.15, backgroundColor: bg2 }}>

            <View style={[headerstyles.header, { backgroundColor: bgColor }]}>
                <Text style={[headerstyles.headerText, { color: textColor }]}>VerseLink</Text>
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

                <View style={[textInStyeles.container, { backgroundColor: bgColor }]}>
                    <TextInput
                        style={[textInStyeles.input, { color: textColor, backgroundColor: bgColor }]}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Search Book"
                        placeholderTextColor={textColor}
                        returnKeyType="search"
                        onSubmitEditing={handleSearch}
                        onFocus={() => setShowDropdown(true)}
                    />
                    <View style={textInStyeles.close}>
                        <Icon name="closecircle" onPress={() => { onChangeText(""); setShowDropdown(false) }} size={width * 0.04} color="grey" />
                    </View>
                </View>

                {showDropdown && searchData.length > 0 && (
                    <View style={[styles.dropdown, { backgroundColor: bgColor }]}>
                        <FlatList
                            data={searchData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleAutocompleteSelection(item)}>
                                    <View style={styles.autocompleteItem}>
                                        <Text style={[styles.autocompleteText, { color: textColor }]}>{item}</Text>
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
            {SearchResults.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 10, marginTop:height*0.25}}>
                    <Text style={{ color: textColor, lineHeight: 22,fontSize:width*0.04, textAlign: "center" }}>
                        Search through Malayalam Bible using:
                    </Text>
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: textColor, marginTop: 10, lineHeight: 22, textAlign: "center",fontSize:width*0.04 }}>
                             A Malayalam phrase, eg: yahova ente idayannakunnu
                        </Text>
                        <Text style={{ color: textColor, marginTop: 10, lineHeight: 22, textAlign: "center",fontSize:width*0.04 }}>
                             A direct reference, like "ps 23"
                        </Text>
                        <Text style={{ color: textColor, marginTop: 10, lineHeight: 22, textAlign: "center",fontSize:width*0.04 }}>
                             For fast presentation, "ps 23 1"
                        </Text>
                    </View>
                </View>
            ) : null}

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
                            <View style={[scrollStyles.button, { backgroundColor: bgColor }]}>
                                <Text style={[scrollStyles.buttonText, { color: textColor }]}>{book}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </ScrollView>
                {isFiltered === true ? (
                    <Icon name="closecircle" style={[scrollStyles.fixedButton, { backgroundColor: bg2 }]} onPress={() => {
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
                    <View style={[styles.verseContainer, { backgroundColor: bgColor }]}>
                        <TouchableWithoutFeedback onPress={() => HandlePresent(item.bookNum, item.chNum, item.verseNum - 1)}>
                            <View >
                                <Text style={[styles.bkname, { color: textColor2, fontSize: fontSize - 3 }]}>{item.bookName} {item.chNum}:{item.verseNum}</Text>
                                <View style={styles.verse}>
                                    <Text style={[styles.versetxt, { color: textColor, fontSize: fontSize }]}>{item.word}</Text>
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
        justifyContent: "center",
        alignItems: "center"
    }
})

const scrollStyles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Align children horizontally
        justifyContent: 'space-between', // Distribute space between children
        padding: 8,
        marginTop: -5,
        paddingBottom: 5,
        marginBottom: 5
    },
    button: {
        borderRadius: 7,
        justifyContent: "center",
        paddingHorizontal: width * 0.02,
        paddingVertical: width * 0.02,
        overflow: 'hidden',
        marginRight: 5,
    },
    buttonText: {
        fontSize: 16,
    },
    fixedButton: { // Background color of the button
        padding: 10, // Padding of the button
        borderRadius: 10, // Border radius of the button
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
    },
    scroll: {
        marginBottom: height * 0.21,
        paddingHorizontal: 10,
    },
    flatListContent: {
        paddingBottom: height * 0.05,
    },
    verseContainer: {
        flex: 1,
        borderRadius: 10,
        padding: width * 0.02,
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
        fontSize: width * 0.05,
        lineHeight: width * 0.075,
        flex: 1,
        flexWrap: 'wrap',
    },
    bkname: {
        fontSize: width * 0.04,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
});

export default SearchPage;
