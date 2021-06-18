import { NativeModules } from 'react-native';

type CellrebelsdkType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Cellrebelsdk } = NativeModules;

export default Cellrebelsdk as CellrebelsdkType;
