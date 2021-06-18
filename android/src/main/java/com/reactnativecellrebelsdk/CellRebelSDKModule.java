package com.reactnativecellrebelsdk;

import androidx.annotation.NonNull;

import com.cellrebel.sdk.workers.TrackingManager;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = CellRebelSDKModule.NAME)
public class CellRebelSDKModule extends ReactContextBaseJavaModule {
    public static final String NAME = "CellRebelSDK";
    private ReactApplicationContext context;

    public CellRebelSDKModule(ReactApplicationContext reactContext) {
      super(reactContext);

      context = reactContext;
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void init(String clientKey) {
      if (null != context) {
        TrackingManager.init(context, clientKey);
      }
    }

    @ReactMethod
    public void startTracking() {
      if (null != context) {
        TrackingManager.startTracking(context);
      }
    }

    @ReactMethod
    public void stopTracking() {
      if (null != context) {
        TrackingManager.stopTracking(context);
      }
    }

    @ReactMethod
    public void clearUserData(Promise promise) {
      if (null != context) {
        TrackingManager.clearUserData(context, new TrackingManager.OnCompleteListener() {
          @Override
          public void onCompleted(boolean b) {
            promise.resolve(b);
          }
        });
      }
    }

    @ReactMethod
    public void getVersion(Promise promise) {
      promise.resolve(TrackingManager.getVersion());
    }

}
