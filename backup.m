NSURL *jsCodeLocation;
#if !(TARGET_IPHONE_SIMULATOR)
  NSLog(@"Running on device!");
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  // jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.132:8081/index.ios.bundle?platform=ios&dev=true"];
#else
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
#endif
