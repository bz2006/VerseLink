import React, { useState,useContext } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Bible } from './Books';
import { SettingsContext } from '../context/settingsContext';
import { darkMode,lightMode } from './ColorSchema';
import { useNavigation } from '@react-navigation/native'; 


const { width } = Dimensions.get('window');



const Collapse = ({ book, onClickFunction, expanded,navigation }) => {

  const { ColorTheme } = useContext(SettingsContext);

  let textColor = ColorTheme === 'light' ? lightMode.color : darkMode.color
  let bgColor = ColorTheme === 'light' ? lightMode.backgroundColor : darkMode.backgroundColor
  let bg2= ColorTheme === 'light' ? lightMode.backgroundColor2 : darkMode.backgroundColor2



  return (
    <View style={[styles.bookContainer, { backgroundColor: bgColor }]}>
      <TouchableWithoutFeedback onPress={onClickFunction}>
        <View style={[styles.book, { backgroundColor: bgColor }]}>
          <Text style={[styles.bookTitle, { color: textColor }]}>
            {book.title}
          </Text>
          <Text style={styles.arrow}>
            {expanded ? <Icon name="up" size={20} color={textColor} /> : <Icon name="down" size={20} color={textColor} />}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {expanded && (
        <View style={[styles.chapterContainer, { backgroundColor: bgColor }]}>
          <View style={styles.chaptersContainer}>
            {book.chapters.map((chapter: number, index: any) => (
              <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("VersePage", { booknumber:book.bookNumber,book: book.title, selected: chapter,limit:book.limit });
              }}
              >
                <View key={index}style={[styles.chapterBox, { backgroundColor: bg2 }]}>
                  <Text style={[styles.chapterText, { color: textColor }]}>{chapter}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const BookCollapse = ({ filterText}) => {
  const { ColorTheme } = useContext(SettingsContext);
  let bg2= ColorTheme === 'light' ? lightMode.backgroundColor2 : darkMode.backgroundColor2

  const [expandedBookIndex, setExpandedBookIndex] = useState(null);
  const navigation = useNavigation();
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

  const updateLayout = (index:any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedBookIndex(index === expandedBookIndex ? null : index);
  };

  const filteredContent = Bible.filter(book =>
    book.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg2 }]} >
      <ScrollView
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>
        {filteredContent.map((book, index) => (
          <Collapse
            key={index}
            book={book}
            expanded={index === expandedBookIndex}
            onClickFunction={() => updateLayout(index)}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookCollapse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  bookContainer: {
    width: width * 0.95,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  book: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrow: {
    fontSize: 20,
  },
  bookTitle: {
    fontSize: width*0.04,
    fontWeight: '600',
    textAlign: 'center',
  },
  chapterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  chaptersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    justifyContent: 'center',
  },
  chapterBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    margin: 5,
  },
  chapterText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
