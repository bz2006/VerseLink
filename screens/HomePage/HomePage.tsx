import React, { useState,useContext } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View,Dimensions,TouchableWithoutFeedback } from 'react-native';
import BookCollapse from '../Components/BookCollapse';
import { SettingsContext } from '../context/settingsContext';
import { ConnectionContext } from '../context/connectionContext';
import { darkMode,lightMode } from '../Components/ColorSchema';
import ClosePresenter from '../VerseView-Presenter/close-presenter';

type Props = {}
const { width, height } = Dimensions.get('window');

const HomePage = (props: Props) => {
    const [text, onChangeText] = useState('');
    const { currentPresenting,PresentingData,connectionUrl } = useContext(ConnectionContext);
    const { ColorTheme } = useContext(SettingsContext);

    let textColor = ColorTheme === 'light' ? lightMode.color : darkMode.color
    let bgColor = ColorTheme === 'light' ? lightMode.backgroundColor : darkMode.backgroundColor
    let bg2= ColorTheme === 'light' ? lightMode.backgroundColor2 : darkMode.backgroundColor2
    let bg3= ColorTheme === 'light' ? lightMode.backgroundColor3 : darkMode.backgroundColor3
//style={[styles.container, { backgroundColor: bgColor }]}
    return (
      <SafeAreaView style={styles.safeArea}>
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
        
        <View style={[styles.content, { backgroundColor: bg2 }]}>
          <TextInput
            style={[styles.input, { backgroundColor: bg3,color:textColor }]}
            onChangeText={onChangeText}
            value={text}
            placeholder="Search Book"
            placeholderTextColor={textColor} 
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
    height: 50,
    margin: 5,
    borderRadius: 8,
    padding: 10,
    width: '97%',
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
      fontSize: width*0.05,
      fontWeight: 'bold',
      color: '#333',
  },
})

export default HomePage;
