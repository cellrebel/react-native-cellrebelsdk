import * as React from 'react';
import { StyleSheet, View, Text, PermissionsAndroid, Button } from 'react-native';
import CellRebelSDK from "react-native-cellrebelsdk";

export default class App extends React.Component {
  state = {
    isMeasurementsDisabled: false,
    cellRebelSDKVersion: '',
  };

  constructor(props) {
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

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to provide location-based services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        // You can now use the location services
      } else {
        console.log('Location permission denied');
        // Handle the case where the user denied the permission
      }
    } catch (err) {
      console.warn(err);
    }
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
        <View style={styles.buttonContainer}>
          <Button
            title="Request location permission"
            onPress={() => {
              console.log('Request location permission pressed');
              this.requestLocationPermission();
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
