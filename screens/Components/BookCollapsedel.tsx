import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Collapsible from 'react-native-collapsible';


const CONTENT = [
  {
    bookNumber: '01',
    title: 'Genesis',
    chapters: Array.from({ length: 50 }, (_, i) => i + 1),
  },
  {
    bookNumber: '02',
    title: 'Exodus',
    chapters: Array.from({ length: 40 }, (_, i) => i + 1),
  },
  {
    bookNumber: '03',
    title: 'Leviticus',
    chapters: Array.from({ length: 27 }, (_, i) => i + 1),
  },
  {
    bookNumber: '04',
    title: 'Numbers',
    chapters: Array.from({ length: 36 }, (_, i) => i + 1),
  },
  {
    bookNumber: '05',
    title: 'Deuteronomy',
    chapters: Array.from({ length: 34 }, (_, i) => i + 1),
  },
  {
    bookNumber: '06',
    title: 'Joshua',
    chapters: Array.from({ length: 24 }, (_, i) => i + 1),
  },
  {
    bookNumber: '07',
    title: 'Judges',
    chapters: Array.from({ length: 21 }, (_, i) => i + 1),
  },
  {
    bookNumber: '08',
    title: 'Ruth',
    chapters: Array.from({ length: 4 }, (_, i) => i + 1),
  },
  {
    bookNumber: '09',
    title: '1 Samuel',
    chapters: Array.from({ length: 31 }, (_, i) => i + 1),
  },
  {
    bookNumber: '10',
    title: '2 Samuel',
    chapters: Array.from({ length: 24 }, (_, i) => i + 1),
  },
  {
    bookNumber: '11',
    title: '1 Kings',
    chapters: Array.from({ length: 22 }, (_, i) => i + 1),
  },
  {
    bookNumber: '12',
    title: '2 Kings',
    chapters: Array.from({ length: 25 }, (_, i) => i + 1),
  },
  {
    bookNumber: '13',
    title: '1 Chronicles',
    chapters: Array.from({ length: 29 }, (_, i) => i + 1),
  },
  {
    bookNumber: '14',
    title: '2 Chronicles',
    chapters: Array.from({ length: 36 }, (_, i) => i + 1),
  },
  {
    bookNumber: '15',
    title: 'Ezra',
    chapters: Array.from({ length: 10 }, (_, i) => i + 1),
  },
  {
    bookNumber: '16',
    title: 'Nehemiah',
    chapters: Array.from({ length: 13 }, (_, i) => i + 1),
  },
  {
    bookNumber: '17',
    title: 'Esther',
    chapters: Array.from({ length: 10 }, (_, i) => i + 1),
  },
  {
    bookNumber: '18',
    title: 'Job',
    chapters: Array.from({ length: 42 }, (_, i) => i + 1),
  },
  {
    bookNumber: '19',
    title: 'Psalms',
    chapters: Array.from({ length: 150 }, (_, i) => i + 1),
  },
  {
    bookNumber: '20',
    title: 'Proverbs',
    chapters: Array.from({ length: 31 }, (_, i) => i + 1),
  },
  {
    bookNumber: '21',
    title: 'Ecclesiastes',
    chapters: Array.from({ length: 12 }, (_, i) => i + 1),
  },
  {
    bookNumber: '22',
    title: 'Song of Solomon',
    chapters: Array.from({ length: 8 }, (_, i) => i + 1),
  },
  {
    bookNumber: '23',
    title: 'Isaiah',
    chapters: Array.from({ length: 66 }, (_, i) => i + 1),
  },
  {
    bookNumber: '24',
    title: 'Jeremiah',
    chapters: Array.from({ length: 52 }, (_, i) => i + 1),
  },
  {
    bookNumber: '25',
    title: 'Lamentations',
    chapters: Array.from({ length: 5 }, (_, i) => i + 1),
  },
  {
    bookNumber: '26',
    title: 'Ezekiel',
    chapters: Array.from({ length: 48 }, (_, i) => i + 1),
  },
  {
    bookNumber: '27',
    title: 'Daniel',
    chapters: Array.from({ length: 12 }, (_, i) => i + 1),
  },
  {
    bookNumber: '28',
    title: 'Hosea',
    chapters: Array.from({ length: 14 }, (_, i) => i + 1),
  },
  {
    bookNumber: '29',
    title: 'Joel',
    chapters: Array.from({ length: 3 }, (_, i) => i + 1),
  },
  {
    bookNumber: '30',
    title: 'Amos',
    chapters: Array.from({ length: 9 }, (_, i) => i + 1),
  },
  {
    bookNumber: '31',
    title: 'Obadiah',
    chapters: Array.from({ length: 1 }, (_, i) => i + 1),
  },
  {
    bookNumber: '32',
    title: 'Jonah',
    chapters: Array.from({ length: 4 }, (_, i) => i + 1),
  },
  {
    bookNumber: '33',
    title: 'Micah',
    chapters: Array.from({ length: 7 }, (_, i) => i + 1),
  },
  {
    bookNumber: '34',
    title: 'Nahum',
    chapters: Array.from({ length: 3 }, (_, i) => i + 1),
  },
  {
    bookNumber: '35',
    title: 'Habakkuk',
    chapters: Array.from({ length: 3 }, (_, i) => i + 1),
  },
  {
    bookNumber: '36',
    title: 'Zephaniah',
    chapters: Array.from({ length: 3 }, (_, i) => i + 1),
  },
  {
    bookNumber: '37',
    title: 'Haggai',
    chapters: Array.from({ length: 2 }, (_, i) => i + 1),
  },
  {
    bookNumber: '38',
    title: 'Zechariah',
    chapters: Array.from({ length: 14 }, (_, i) => i + 1),
  },
  {
    bookNumber: '39',
    title: 'Malachi',
    chapters: Array.from({ length: 4 }, (_, i) => i + 1),
  },
];


const BookCollapse = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleExpanded = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      >
        {CONTENT.map((item, index) => (
          <View key={index} style={styles.collapsibleContainer}>
            <TouchableWithoutFeedback onPress={() => toggleExpanded(index)}>
              <View style={styles.header}>
                <Text style={styles.headerText}>{item.title}</Text>
                <Text style={styles.arrow}>
                  {activeIndex === index ? '△' : '▽'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <Collapsible collapsed={activeIndex !== index} align="center">
              <View style={styles.content}>
                <View style={styles.chaptersContainer}>
                  {item.chapters.map((chapter, chapterIndex) => (
                    <View key={chapterIndex} style={styles.chapterBox}>
                      <Text style={styles.chapterText}>{chapter}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </Collapsible>
          </View>
        ))}
      </ScrollView>
    </View>
  </SafeAreaView>
);
};

export default BookCollapse;

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#F5FCFF',
  paddingTop: 10,
},
collapsibleContainer: {
  marginBottom: 10,
  paddingHorizontal: 10,
},
header: {
  backgroundColor: '#FFFFFF',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between', // Adjust for space between title and arrow
},
headerText: {
  fontSize: 19,
  fontWeight: '500',
},
arrow: {
  fontSize: 20,
  color: '#333',
},
content: {
  padding: 5,
  backgroundColor: '#fff',
  borderRadius: 5,
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
  backgroundColor: '#e0e0e0',
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
