import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, TextInput, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';
import { ConnectionContext } from '../context/connectionContext';
import { darkMode,lightMode } from '../Components/ColorSchema';
import { SettingsContext } from '../context/settingsContext';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import StickyBottomNav from '../Components/BottomNav';

const { width, height } = Dimensions.get('window');
type RootStackParamList = {
    Home: undefined;
};

const ConfigPresenter = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isScannerActive, setScannerActive] = useState(false);
    const [ipAddress, setIpAddress] = useState('');
    const [port, setPort] = useState('');
    const { Connect, Disconnect, connectionUrl, connectionStatus } = useContext(ConnectionContext);
    const { ColorTheme } = useContext(SettingsContext);

    let textColor = ColorTheme === 'light' ? lightMode.color : darkMode.color
    let bgColor = ColorTheme === 'light' ? lightMode.backgroundColor : darkMode.backgroundColor
    let bg2= ColorTheme === 'light' ? lightMode.backgroundColor2 : darkMode.backgroundColor2
    let bg3= ColorTheme === 'light' ? lightMode.backgroundColor3 : darkMode.backgroundColor3
//style={[styles.container, { backgroundColor: bgColor }]}

    useEffect(() => {
        setPort(connectionUrl.split(':')[1])
        setIpAddress(connectionUrl.split(':')[0])
    }, [connectionUrl])


    const handleQRCodeData = (data: string) => {
        let remainder = data.split("://")[1];
        let hostname = remainder.split(':')[0];
        let port = remainder.split(':')[1].split('/')[0];
        Connect(hostname + ":" + port)
        setIpAddress(hostname)
        setPort(port)
        navigation.navigate("Home")
    };

    const HandleConnect = () => {
        if (connectionStatus === false) {
            if (ipAddress && port) {
                Connect(ipAddress + ":" + port)
                navigation.navigate("Home")
            }
        } else {
            Disconnect()
        }
    }

    const onSuccess = (e: any) => {
        setScannerActive(false);
        handleQRCodeData(e.data); // Pass the scanned data to the handler function
    };

    const toggleScanner = () => {
        setScannerActive(!isScannerActive);
    };

    const closeScanner = () => {
        setScannerActive(false);
    };
    console.log(ipAddress, port)
    return (
        <SafeAreaView style={[Camerastyles.safeArea, { backgroundColor: bgColor }]}>
            <View style={[headerstyles.header, { backgroundColor: bgColor, }]}>
                    <Text style={[headerstyles.headerText, { color: textColor }]}>VerseLink</Text>
                    <TouchableWithoutFeedback onPress={toggleScanner}>
                        <Icon name="qrcode-scan" size={width * 0.06} color={textColor} />
                    </TouchableWithoutFeedback>
                </View>
            <ScrollView>
                

                <View style={styles.container}>

                    <View style={Imagestyles.container}>
                        <Image source={require('./assets/VerseLink.png')} style={Imagestyles.image} />
                        <Icon name="link-variant" size={width * 0.07} color="#000" style={Imagestyles.icon} />
                        <Image source={require('./assets/images.jpg')} style={Imagestyles.image} />
                    </View>
                    <View style={styles.content}>
                        <Text style={[styles.title, { color: textColor }]}>Connect to VerseView</Text>
                        <Text style={[styles.description, { color: textColor }]}>
                            Connect to control your presentations seamlessly. Please enter the IP Address and Port number of VerseView remote to establish a connection.
                        </Text>
                        <View style={styles.ipaddress}>
                            <Text  style={[styles.label, { color: textColor }]}>IP Address</Text>
                            <TextInput
                                value={ipAddress}
                                style={[styles.input, { color: textColor }]}
                                onChangeText={setIpAddress}
                                placeholderTextColor={textColor}
                                placeholder='Enter IP Address'
                            />
                        </View>
                        <View style={styles.portContainer}>
                            <Text style={[styles.label, { color: textColor }]}>Port</Text>
                            <TextInput
                                value={port}
                                onChangeText={setPort}
                                placeholder='Enter Port'
                                placeholderTextColor={textColor}
                                style={[styles.portInput, { color: textColor }]}
                            />
                        </View>
                        <TouchableOpacity
                            disabled={false}
                            style={[
                                Camerastyles.startButton,
                                { backgroundColor: connectionStatus === true ? '#bd0000' : '#007118' }
                            ]}
                            onPress={HandleConnect}
                        >
                            <Text style={[Camerastyles.buttonText, { color: "#FFFFFF"}]}>
                                {connectionStatus === true ? 'Disconnect' : 'Connect'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {isScannerActive && (
                        <View style={Camerastyles.scannerWrapper}>
                            <QRCodeScanner
                                onRead={onSuccess}
                                flashMode={RNCamera.Constants.FlashMode.off}
                                containerStyle={Camerastyles.scannerContainer}
                            />
                            <TouchableOpacity style={Camerastyles.closeButton} onPress={closeScanner}>
                                <Icon name="close" size={35} color="#FFFFFF" />
                            </TouchableOpacity>
                            <View style={Camerastyles.overlayContainer}>
                                <View style={Camerastyles.overlay}>
                                    <View style={Camerastyles.cornerTopLeft} />
                                    <View style={Camerastyles.cornerTopRight} />
                                    <View style={Camerastyles.cornerBottomLeft} />
                                    <View style={Camerastyles.cornerBottomRight} />
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginTop: width * 0.01,
        marginBottom: width * 0.01,
        textAlign: 'center',
    },
    description: {
        fontSize: width * 0.035,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    label: {
        fontSize: width * 0.03,
        marginBottom: 5,
    },
    ipaddress: {
        marginTop: 20,
        marginBottom: 15,
    },
    portContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        padding: width * 0.025,
        borderRadius: 5,
        color:"#000000"
    },
    portInput: {
        borderWidth: 1,
        borderColor: '#dddddd',
        padding: width * 0.025,
        borderRadius: 5,
        color:"#000000"
    },
});

const Camerastyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginBottom:height*0.055
    },
    startButton: {
        padding: width * 0.04,
        width: "100%",
        borderRadius: 8,
        marginTop: 20,
        
    },
    buttonText: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scannerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerContainer: {
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    overlayContainer: {
        position: 'absolute',
        justifyContent: 'center',
        width: width * 0.8,
        height: width * 0.8,
    },
    overlay: {
        flex: 1,
        position: 'relative',
    },
    cornerTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderTopWidth: 2.5,
        borderLeftWidth: 2.5,
        borderColor: '#FFF',
        borderTopLeftRadius: 15,
    },
    cornerTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        borderTopWidth: 2.5,
        borderRightWidth: 2.5,
        borderColor: '#FFF',
        borderTopRightRadius: 15,
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 2.5,
        borderLeftWidth: 2.5,
        borderColor: '#FFF',
        borderBottomLeftRadius: 15,
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 2.5,
        borderRightWidth: 2.5,
        borderColor: '#FFF',
        borderBottomRightRadius: 15,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const headerstyles = StyleSheet.create({
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
})

const Imagestyles = StyleSheet.create({
    container: {
        marginTop: 70,
        flexDirection: 'row',
        justifyContent: "center", // Aligns items in a row
        alignItems: 'center', // Aligns items vertically centered
    },
    image: {
        width: width * 0.20,  // Set the desired width of the images
        height: width * 0.20, // Set the desired height of the images
        marginHorizontal: 8,
        borderRadius:18 // Adds space between images and the icon
    },
    icon: {
        marginHorizontal: width * 0.05,
    },
});

export default ConfigPresenter;
