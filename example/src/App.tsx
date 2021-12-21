import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import CellRebelSDK from 'react-native-cellrebelsdk';

export default class App extends React.Component {
  state = {
    isMeasurementsDisabled: false,
    cellRebelSDKVersion: '',
  };

  backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  textStyle = {
    textAlign: 'center',
  };

  constructor(props: any) {
    super(props);

    // Initialize CellRebelSDK with CLIENT_KEY
    CellRebelSDK.init('d7mrw1n1ig');

    this.getSDKversion();
  }

  getSDKversion = async () => {
    // Use getVersion to retrieve current version of CellRebelSDK from Android module
    const sdkVersion = await CellRebelSDK.getVersion();
    this.setState({
      cellRebelSDKVersion: sdkVersion,
    });
  };

  clearUserData = async () => {
    // Call clearUserData to request user removal based on GDPR "right to be forgotten"
    const result = await CellRebelSDK.clearUserData();
    this.setState({
      isMeasurementsDisabled: result,
    });
  };

  render() {
    return (
      <View>
        <Text style={styles.container}>
          "CellRebelSDK version: {this.state.cellRebelSDKVersion}"
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Start tracking"
            onPress={() => {
              console.log('Start tracking pressed');
              // Call startTracking to begin CellRebelSDK measurements
              CellRebelSDK.startTracking();
            }}
            color="#841584"
            disabled={this.state.isMeasurementsDisabled}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Stop tracking"
            onPress={() => {
              console.log('Stop tracking pressed');
              CellRebelSDK.stopTracking();
            }}
            color="#841584"
            disabled={this.state.isMeasurementsDisabled}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Clear user data (Remove user and deinit CellRebelSDK)"
            onPress={() => {
              console.log('Clear user data pressed');
              this.clearUserData();
            }}
            color="#841584"
            disabled={this.state.isMeasurementsDisabled}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 35,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    top: 200,
    marginBottom: 25,
  },
  button: {
    bottom: 20,
  },
});
