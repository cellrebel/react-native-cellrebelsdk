import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-cellrebelsdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const CellRebelSDK = NativeModules.Cellrebelsdk
  ? NativeModules.Cellrebelsdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

type CellRebelSDKType = {
  init(clientKey: string): void;
  startTracking(): void;
  stopTracking(): void;
  getVersion(): Promise<string>;
  clearUserData(): Promise<boolean>;
};

export default CellRebelSDK as CellRebelSDKType;
