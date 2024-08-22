import React,{useState,useContext,useEffect} from 'react'
import { Text, View ,TextInput,StyleSheet,Button, SafeAreaView, FlatList, TouchableWithoutFeedback, Dimensions} from 'react-native'
import { BibleContext } from '../context/bibleContext'
import Presenter from '../VerseView-Presenter/presenter';
import ClosePresenter from '../VerseView-Presenter/close-presenter';

type Props = {}
const { width, height } = Dimensions.get('window');
const SearchPage = (props: Props) => {
    const [text, onChangeText] = useState('');
    const { SearchResults,SearchBible } = useContext(BibleContext);

    

    const handleSearch=()=>{
        SearchBible(text)
    }

console.log(SearchResults)

  return (
    <SafeAreaView>
        <View>
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Search Book"
          />
          <Button title="Search" onPress={handleSearch} />
          <Button title="Close" onPress={ClosePresenter} />
          
    </View>
        <FlatList
                style={styles.scroll}
                data={SearchResults}
                keyExtractor={(item) => item.wordId.toString()} 
                renderItem={({ item }) => (
                    <View style={styles.verseContainer}>
                        <TouchableWithoutFeedback onPress={()=>Presenter(item.bookNum,item.chNum,item.verseNum-1)}> 
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

export default SearchPage