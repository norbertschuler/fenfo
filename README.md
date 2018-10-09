# Fenfo

This is just a small demo project for [react native development](https://facebook.github.io/react-native/docs/getting-started.html).
It is a clone of the known Simon (or Senso) game training your memory by rembering a sequence of random colors.

## About the repository

This repository is using native project for iOS and Android in order to be able to install the game on physical devices with using the the [expo client](https://expo.io/). Open the project either with Android Studio or Xcode and install it on your device.

## Tweaks for running iOS project on real device

In order to be able to install the iOS app with Xcode on a real device I had to fix the following stuff:

Go to the directory of the third party product "glog" and make it manually to avoid the problem discussed [here](https://github.com/facebook/react-native/issues/19839)

    cd node_modules/react-native/third-party/glog-0.3.4/; ./configure; make; make install

Also change the definition of PC_FROM_UCONTEXT in the file node_modules/react-native/third-party/glog-0.3.4/src/config.h:

    #if defined(__arm__) || defined(__arm64__)
    #define PC_FROM_UCONTEXT uc_mcontext->__ss.__pc
    #else
    #define PC_FROM_UCONTEXT uc_mcontext->__ss.__rip
    #endif

At last I had to manually add the library libfishhook.a to RTCWebSocket project again as described [here](https://github.com/facebook/react-native/issues/19569).