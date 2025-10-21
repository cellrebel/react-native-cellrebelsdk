import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform, Alert } from 'react-native';
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import CellRebelSDK from 'react-native-cellrebelsdk';

export default function App() {
  const [isMeasurementsDisabled, setIsMeasurementsDisabled] = useState(false);
  const [cellRebelSDKVersion, setCellRebelSDKVersion] = useState('');
  const [permissionStatus, setPermissionStatus] = useState('unknown');

  useEffect(() => {
    // Initialize CellRebelSDK with CLIENT_KEY
    CellRebelSDK.init('d7mrw1n1ig');

    // Get SDK version on mount
    getSDKVersion();

    // Check initial permission status
    checkLocationPermission();
  }, []);

  const getSDKVersion = async () => {
    try {
      const sdkVersion = await CellRebelSDK.getVersion();
      setCellRebelSDKVersion(sdkVersion);
      console.log('CellRebelSDK version:', sdkVersion);
    } catch (error) {
      console.error('Failed to get SDK version:', error);
    }
  };

  const checkLocationPermission = async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      if (permission) {
        const result = await check(permission);
        setPermissionStatus(result);
        console.log('Location permission status:', result);
      }
    } catch (error) {
      console.error('Failed to check permission:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      if (!permission) {
        Alert.alert('Error', 'Unsupported platform');
        return;
      }

      const result = await request(permission);
      setPermissionStatus(result);

      switch (result) {
        case RESULTS.GRANTED:
          console.log('Location permission granted');
          Alert.alert('Success', 'Location permission granted');
          // Auto-start tracking after permission is granted
          CellRebelSDK.startTracking();
          break;
        case RESULTS.DENIED:
          console.log('Location permission denied');
          Alert.alert('Permission Denied', 'Location permission was denied');
          break;
        case RESULTS.BLOCKED:
          console.log('Location permission blocked');
          Alert.alert(
            'Permission Blocked',
            'Location permission is blocked. Please enable it in Settings.'
          );
          break;
        case RESULTS.UNAVAILABLE:
          console.log('Location permission unavailable');
          Alert.alert('Error', 'Location permission is not available on this device');
          break;
      }
    } catch (error) {
      console.error('Failed to request permission:', error);
      Alert.alert('Error', 'Failed to request location permission');
    }
  };

  const handleStartTracking = () => {
    console.log('Start tracking pressed');
    if (permissionStatus !== RESULTS.GRANTED) {
      Alert.alert(
        'Permission Required',
        'Please grant location permission first',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Request Permission', onPress: requestLocationPermission },
        ]
      );
      return;
    }
    CellRebelSDK.startTracking();
    Alert.alert('Success', 'Tracking started');
  };

  const handleStopTracking = () => {
    console.log('Stop tracking pressed');
    CellRebelSDK.stopTracking();
    Alert.alert('Success', 'Tracking stopped');
  };

  const handleClearUserData = async () => {
    console.log('Clear user data pressed');
    Alert.alert(
      'Confirm',
      'Are you sure you want to clear all user data? This will deinitialize the SDK.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await CellRebelSDK.clearUserData();
              setIsMeasurementsDisabled(result);
              if (result) {
                Alert.alert('Success', 'User data cleared. SDK deinitialized.');
              }
            } catch (error) {
              console.error('Failed to clear user data:', error);
              Alert.alert('Error', 'Failed to clear user data');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CellRebelSDK Example</Text>
        <Text style={styles.version}>
          SDK Version: {cellRebelSDKVersion || 'Loading...'}
        </Text>
        <Text style={styles.status}>
          Permission: {permissionStatus}
        </Text>
        {isMeasurementsDisabled && (
          <Text style={styles.warning}>SDK Deinitialized</Text>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Request Location Permission"
            onPress={requestLocationPermission}
            color="#4CAF50"
            disabled={isMeasurementsDisabled}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Start Tracking"
            onPress={handleStartTracking}
            color="#2196F3"
            disabled={isMeasurementsDisabled}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Stop Tracking"
            onPress={handleStopTracking}
            color="#FF9800"
            disabled={isMeasurementsDisabled}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Clear User Data"
            onPress={handleClearUserData}
            color="#F44336"
            disabled={isMeasurementsDisabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#841584',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  version: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  warning: {
    fontSize: 14,
    color: '#ffeb3b',
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonWrapper: {
    marginBottom: 15,
  },
});
