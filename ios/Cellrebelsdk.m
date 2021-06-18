#import "Cellrebelsdk.h"

@implementation CellRebelSDK

RCT_EXPORT_MODULE(CellRebelSDK)

RCT_REMAP_METHOD(init,init_clientKey:(nonnull NSString*)clientKey)
{
  
}

RCT_EXPORT_METHOD(startTracking) {}

RCT_EXPORT_METHOD(stopTracking) {}

RCT_REMAP_METHOD(clearUserData,
				 withClearUserDataResolver:(RCTPromiseResolveBlock)resolve
				 withClearUserDataRejecter:(RCTPromiseRejectBlock)reject)
{
  resolve([NSNumber numberWithBool:TRUE]);
}

RCT_REMAP_METHOD(getVersion,
                 withVersionResolver:(RCTPromiseResolveBlock)resolve
                 withVersionRejecter:(RCTPromiseRejectBlock)reject)
{
	resolve(@"1.7.6");
}

@end
