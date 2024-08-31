import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Switch, StyleSheet, SafeAreaView, FlatList, TouchableWithoutFeedback, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { ConnectionContext } from '../context/connectionContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SettingsContext } from '../context/settingsContext';
import ClosePresenter from '../VerseView-Presenter/close-presenter';
import { lightMode, darkMode } from '../Components/ColorSchema';

type Props = {}
const { width, height } = Dimensions.get('window');


const SettingsPage = (props: Props) => {
    const { ColorTheme, toggleTheme } = useContext(SettingsContext);
    const { currentPresenting, connectionUrl, connectionStatus, PresentingData } = useContext(ConnectionContext);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    let textColor = ColorTheme === 'light' ? lightMode.color : darkMode.color
    let bgColor = ColorTheme === 'light' ? lightMode.backgroundColor : darkMode.backgroundColor
    console.log("color", textColor, bgColor)

    return (
        <SafeAreaView style={{ backgroundColor: bgColor }}>
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

            <View style={[themestyles.themes, { backgroundColor: bgColor }]}>
                <View style={[themestyles.prtheme, { backgroundColor: bgColor }]}>
                    {isEnabled === false ? (
                        <>
                            <Icon name="light-mode" size={width * 0.05} style={{marginRight:width*0.05}}  color="#000000" />
                            <Text style={[ { color: textColor }]}>Light Mode</Text>
                        </>
                    ) : (
                        <>
                            <Icon name="dark-mode" size={width * 0.05} style={{marginRight:width*0.05}}  color="grey" />
                            <Text style={[ { color: textColor }]}>Dark Mode</Text>
                        </>
                    )}


                </View>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>{
                        toggleSwitch();
                        toggleTheme()
                    }}
                    value={isEnabled}
                />
            </View>

        </SafeAreaView>
    )
}

const themestyles = StyleSheet.create({
    themes: {
        flexDirection: "row",
        padding:width*0.03,
        paddingHorizontal:width*0.05,
        justifyContent:"space-between"
    },
    prtheme: {
        flexDirection: "row",
    }
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

export default SettingsPage