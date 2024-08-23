import React, { useState,useContext } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View,Dimensions,TouchableWithoutFeedback } from 'react-native';
import BookCollapse from '../Components/BookCollapse';
import { ConnectionContext } from '../context/connectionContext';
import Header from '../Components/header';
import ClosePresenter from '../VerseView-Presenter/close-presenter';

type Props = {}
const { width, height } = Dimensions.get('window');

const HomePage = (props: Props) => {
    const [text, onChangeText] = useState('');
    const { currentPresenting,PresentingData,connectionUrl } = useContext(ConnectionContext);


    return (
      <SafeAreaView style={styles.safeArea}>
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
        
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Search Book"
          />
          <BookCollapse filterText={text}/>
        </View>
        
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 4,
    paddingBottom: 60, // Add padding for the bottom nav
  },
  input: {
    height: 40,
    margin: 5,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: '95%',
  },
  bookCollapse: {
    width: '100%',
  },
});
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
      padding: width*0.035,
      backgroundColor: '#f8f8f8',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc',
  },
  headerText: {
      fontSize: width*0.06,
      fontWeight: 'bold',
      color: '#333',
  },
})

export default HomePage;
