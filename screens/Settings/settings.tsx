import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Switch, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { ConnectionContext } from '../context/connectionContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SettingsContext } from '../context/settingsContext';
import ClosePresenter from '../VerseView-Presenter/close-presenter';
import { lightMode, darkMode } from '../Components/ColorSchema';
import Slider from '@react-native-community/slider';

type Props = {}
const { width, height } = Dimensions.get('window');


const SettingsPage = (props: Props) => {
    const { ColorTheme, toggleTheme, fontSize, setFontSize } = useContext(SettingsContext);
    const { currentPresenting, connectionUrl, connectionStatus, PresentingData } = useContext(ConnectionContext);
    const [isEnabled, setIsEnabled] = useState(false);
    const [cc, setValue] = useState(0);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    let textColor = ColorTheme === 'light' ? lightMode.color : darkMode.color
    let bgColor = ColorTheme === 'light' ? lightMode.backgroundColor : darkMode.backgroundColor
    let bg2 = ColorTheme === 'light' ? lightMode.backgroundColor2 : darkMode.backgroundColor2
    let bg3 = ColorTheme === 'light' ? lightMode.backgroundColor3 : darkMode.backgroundColor3
    console.log(fontSize - 1, fontSize)

    return (
        <SafeAreaView style={{ backgroundColor: bg2, flex: 1 }}>
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

            <View style={{ padding: width * 0.01 }}>
                <View style={{ marginTop: height * 0.02 }}>
                    <View style={{ padding: width * 0.01 }}>
                        <Text style={{ fontSize: width * 0.03, color: textColor }}>Theme Color</Text>
                    </View>
                    <View style={[themestyles.themes, { backgroundColor: bgColor }]}>
                        <View style={[themestyles.prtheme, { backgroundColor: bgColor }]}>
                            {isEnabled === false ? (
                                <>
                                    <Icon name="light-mode" size={width * 0.05} style={{ marginRight: width * 0.05 }} color="#000000" />
                                    <Text style={[{ color: textColor }]}>Light Mode</Text>
                                </>
                            ) : (
                                <>
                                    <Icon name="dark-mode" size={width * 0.05} style={{ marginRight: width * 0.05 }} color="grey" />
                                    <Text style={[{ color: textColor }]}>Dark Mode</Text>
                                </>
                            )}


                        </View>
                        <Switch
                            trackColor={{ false: '#000000', true: '#FFFFFF' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#949494'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                toggleSwitch();
                                toggleTheme()
                            }}
                            value={isEnabled}
                        />
                    </View>
                </View>

                <View style={{ marginTop: height * 0.02 }}>
                    <View style={{ padding: width * 0.01, }}>
                        <Text style={{ fontSize: width * 0.03, color: textColor }}>Content Font Size</Text>
                    </View>

                    <View style={[sliderstyles.slidercont, { backgroundColor: bgColor }]}>
                        <View style={sliderstyles.sample}>
                            <Text style={{ color: textColor, fontSize: fontSize }}>സത്യവേദപുസ്തകം</Text>
                        </View>

                        <View style={sliderstyles.slider}>
                            <Slider
                                style={{ width: width * 0.9, height: height * 0.04 }}
                                minimumValue={width * 0.04}
                                maximumValue={width * 0.07}
                                minimumTrackTintColor="#00c21d"
                                maximumTrackTintColor="#8B9CB6"
                                thumbTintColor="#00c21d"
                                step={1}
                                value={fontSize}
                                onValueChange={setFontSize}
                            />
                        </View>


                    </View>

                </View>

            </View>
        </SafeAreaView>
    )
}
const sliderstyles = StyleSheet.create({
    slidercont: {
        borderRadius: 5,

    },
    sample: {
        alignItems: "center",
        padding: width * 0.03
    },
    slider: {
        alignItems: "center"
    }
})

const themestyles = StyleSheet.create({
    themes: {
        flexDirection: "row",
        padding: width * 0.03,
        paddingHorizontal: width * 0.05,
        justifyContent: "space-between",
        borderRadius: 5
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