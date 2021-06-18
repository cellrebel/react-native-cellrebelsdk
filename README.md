# react-native-cellrebelsdk

ReactNative wrapper for CellRebelSDK

## Installation

To install CellRebelSDK run `npm install` command at the root of your React Native project

```sh
npm install react-native-cellrebelsdk
```

## Usage

In your application entry point import CellRebelSDK module and run `init` method using your unique CLIENT_KEY string:
```js
import CellRebelSDK from "react-native-cellrebelsdk";

// ...

CellRebelSDK.init(CLIENT_KEY)
```

Use `startTracking` to start measurement. On the first launch it's best to call this method after user response on location permission dialog. During the next sessions this method should be called when application finished launching:
```js
CellRebelSDK.startTracking()
```

In some (rare) cases, if very high load tasks need to be performed, `stopTracking` can be used to abort an ongoing measurement sequence:
```js
CellRebelSDK.stopTracking()
```

Call `getVersion` to retrieve current version of CellRebelSDK:
```js
const sdkVersion = await CellRebelSDK.getVersion()
```

Use `clearUserData` if you need to request the removal of user data collected (based on GDPR 'right to be forgotten'):
```js
const result = await CellRebelSDK.clearUserData();
```
Calling `clearUserData` will deinitialize CellRebelSDK and remove all local data. `init` method should be called before using CellRebelSDK again. 

## Demo project
https://github.com/cellrebel/react-native-cellrebelsdk/tree/master/example
