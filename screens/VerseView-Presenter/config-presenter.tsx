import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';
import { ConnectionContext } from '../context/connectionContext';
import { useNavigation, NavigationProp } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');
type RootStackParamList = {
    Home: undefined;
};

const ConfigPresenter = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isScannerActive, setScannerActive] = useState(false);
    const [ipAddress, setIpAddress] = useState('');
    const [port, setPort] = useState('');
    const { Connect, connectionUrl, connectionStatus } = useContext(ConnectionContext);

    useEffect(() => {
        console.log("log", connectionStatus)
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
        if (ipAddress && port) {
            Connect(ipAddress + ":" + port)
            navigation.navigate("Home")
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
        <SafeAreaView style={Camerastyles.safeArea}>
            <View style={headerstyles.header}>
                <Text style={headerstyles.headerText}>VerseLink</Text>
                <TouchableWithoutFeedback onPress={toggleScanner}>
                    <Icon name="qrcode-scan" size={28} color="#000" />
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.container}>

                <View style={Imagestyles.container}>
                    <Image source={require('./assets/VerseLink.png')} style={Imagestyles.image} />
                    <Icon name="link-variant" size={25} color="#000" style={Imagestyles.icon} />
                    <Image source={require('./assets/images.jpg')} style={Imagestyles.image} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Connect to VerseView</Text>
                    <Text style={styles.description}>
                        Connect to control your presentations seamlessly. Please enter the IP Address and Port number of VerseView remote to establish a connection.
                    </Text>
                    <View style={styles.ipaddress}>
                        <Text style={styles.label}>IP Address:</Text>
                        <TextInput
                            value={ipAddress}
                            style={styles.input}
                            onChangeText={setIpAddress}
                            placeholder='Enter IP Address'
                        />
                    </View>
                    <View style={styles.portContainer}>
                        <Text style={styles.label}>Port:</Text>
                        <TextInput
                            value={port}
                            onChangeText={setPort}
                            placeholder='Enter Port'
                            style={styles.portInput}
                        />
                    </View>
                    <TouchableOpacity style={Camerastyles.startButton} onPress={HandleConnect}>
                        <Text style={Camerastyles.buttonText}>{connectionStatus === true ? "Connected" : "Connect"}</Text>
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
        fontSize: width*0.07,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: width*0.045,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    label: {
        fontSize: width*0.04,
        marginBottom: 5,
    },
    ipaddress: {
        marginTop:20,
        marginBottom: 15,
    },
    portContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#555',
        padding: width*0.025,
        borderRadius: 5,
    },
    portInput: {
        borderWidth: 1,
        borderColor: '#555',
        padding: width*0.025,
        borderRadius: 5,
    },
});

const Camerastyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    startButton: {
        padding: width*0.04,
        width:"100%",
        backgroundColor: '#28a745',
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        fontSize: width * 0.04,
        color: '#FFF',
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
        padding: 15,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
})

const Imagestyles = StyleSheet.create({
    container: {
        marginTop:70,
        flexDirection: 'row',
        justifyContent: "center", // Aligns items in a row
        alignItems: 'center', // Aligns items vertically centered
    },
    image: {
        width: width * 0.20,  // Set the desired width of the images
        height: width * 0.20, // Set the desired height of the images
        marginHorizontal: 8, // Adds space between images and the icon
    },
    icon: {
        marginHorizontal: width * 0.05,
    },
});

export default ConfigPresenter;
