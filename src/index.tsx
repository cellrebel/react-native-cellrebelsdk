import { NativeModules } from 'react-native';

type CellRebelSDKType = {
  init(clientKey: string): void;
  startTracking(): void;
  stopTracking(): void;
  getVersion(): Promise<string>;
  clearUserData(): Promise<boolean>;
};

const { CellRebelSDK } = NativeModules;

export default CellRebelSDK as CellRebelSDKType;
