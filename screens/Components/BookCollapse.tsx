import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native'; 


const { width } = Dimensions.get('window');



const Collapse = ({ book, onClickFunction, expanded,navigation }) => {
  return (
    <View style={styles.bookContainer}>
      <TouchableWithoutFeedback onPress={onClickFunction}>
        <View style={styles.book}>
          <Text style={styles.bookTitle}>
            {book.title}
          </Text>
          <Text style={styles.arrow}>
            {expanded ? <Icon name="up" size={20} color="#FFFFFF" /> : <Icon name="down" size={20} color="#FFFFFF" />}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {expanded && (
        <View style={styles.chapterContainer}>
          <View style={styles.chaptersContainer}>
            {book.chapters.map((chapter: number, index: any) => (
              <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("VersePage", { booknumber:book.bookNumber,book: book.title, selected: chapter });
              }}
              >
                <View key={index} style={styles.chapterBox}>
                  <Text style={styles.chapterText}>{chapter}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const BookCollapse = ({ filterText }) => {
  const [expandedBookIndex, setExpandedBookIndex] = useState(null);
  const navigation = useNavigation();
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedBookIndex(index === expandedBookIndex ? null : index);
  };

  const filteredContent = Bible.filter(book =>
    book.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  bookContainer: {
    width: width * 0.95,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  book: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrow: {
    fontSize: 20,
    color: '#333',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  chapterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#e9ecef',
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
    backgroundColor: '#CDCDCD',
    justifyContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    margin: 5,
  },
  chapterText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
});
