### Run iOS

1. Install xcode
2. For Intel Mac : `sudo gem install cocoapods`
3. For M1 Mac

```bash
# Mac M1 architecture is not directly compatible with Cocoapods. If you encounter issues when installing pods, you can solve it by running:

sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
```

4. Install dependencies by `yarn`
5. Run `yarn dev` to run Metro server
6. Run `yarn ios`

### Run Android

1. Install Java
2. Check java installed by `java --version`
3. Install android studio
4. Create virtual device (Pixel 2, S version)
5. SDK Manager -> Appearance & Behavior -> System Settings -> Android SDK -> SDK Tools -> Check **Android SDK Command-line Tools **
6. Create `local.properties` in `/android`
7. In `local.properties`, `sdk.dir = YOUR_ANDROID_SDK_PATH`
8. Update PATH

```
vi ~/.zshrc

export ANDROID_SDK_ROOT=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools:$PATH
export PATH=$HOME:$ANDROID_SDK_ROOT/tools:$PATH
export PATH=$HOME:$ANDROID_SDK_ROOT/emulator:$PATH

source ~/.zshrc
```

9.  Install dependencies by `yarn`
10. Run `yarn dev` to run Metro server
11. Run android virtual device
12. Run `yarn android`

### Build release for iOS

1. Run xcode by opening `/ios/Slid.xcworkspace`
2. Product - Scheme - Edit Scheme - Change `Build Configuration` to `Release`
3. Product - Archive
4. Window - Organizer - Distribute App

### Build release for Android

1. Get `slid-android-key.keystore` and put it in `/android/app`
2. Run `yarn android:bundleRelease`
3. Then, `.aab` file will be generated in `/android/app/build/outputs/bundle/release/app-release.aab`
