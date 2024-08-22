import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, TextInput, Button, TouchableWithoutFeedback } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';

const { width, height } = Dimensions.get('window');

const ConfigPresenter = () => {
    const [isScannerActive, setScannerActive] = useState(false);

    const handleQRCodeData = (data) => {
        console.log("QR Code Data:", data);
        let urlObject = new URL(data);
        let baseUrl = urlObject.origin;
        console.log(baseUrl);
        // Process the data here, e.g., navigate to another screen, make an API call, etc.
    };

    const onSuccess = (e) => {
        //setScannerActive(false); 
        handleQRCodeData(e.data); // Pass the scanned data to the handler function
    };

    const toggleScanner = () => {
        setScannerActive(!isScannerActive);
    };

    const closeScanner = () => {
        setScannerActive(false);
    };

    return (
        <SafeAreaView style={Camerastyles.safeArea}>
            <View style={headerstyles.header}>
                <Text style={headerstyles.headerText}>VerseLink</Text>
                <TouchableWithoutFeedback onPress={toggleScanner}>
                    <Icon name="qrcode-scan" size={28} color="#000" />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Connect to VerseView</Text>
                    <Text style={styles.description}>
                        Connect to control your presentations seamlessly. Please enter the IP Address and Port number of VerseView remote to establish a connection.
                    </Text>
                    <View style={styles.ipaddress}>
                        <Text style={styles.label}>IP Address:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Enter IP Address'
                        />
                    </View>
                    <View style={styles.portContainer}>
                        <Text style={styles.label}>Port:</Text>
                        <TextInput
                            placeholder='Enter Port'
                            style={styles.portInput}
                        />
                    </View>
                    <TouchableOpacity style={Camerastyles.startButton} onPress={toggleScanner}>
                        <Text style={Camerastyles.buttonText}>Connect</Text>
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
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
    ipaddress: {
        marginBottom: 15,
    },
    portContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    portInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
});

const Camerastyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    startButton: {
        padding: width * 0.05,
        backgroundColor: '#28a745',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
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

export default ConfigPresenter;
