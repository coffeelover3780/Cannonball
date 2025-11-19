
# Cannonball! - Mobile App Conversion

This project has been configured to be built as a native mobile application for both iOS and Android using [Capacitor](https://capacitorjs.com/). Capacitor wraps the web application in a native WebView, allowing it to be deployed to the Apple App Store and Google Play Store.

## Prerequisites

Before you begin, you need to have the following tools installed on your system:

1.  **[Node.js](https://nodejs.org/)**: Required for running JavaScript and managing packages.
2.  **[Android Studio](https://developer.android.com/studio)**: Required for building and running the app on Android.
3.  **[Xcode](https://developer.apple.com/xcode/)**: Required for building and running the app on iOS (macOS only).

You will also need developer accounts for the respective platforms to publish the app:
*   [Apple Developer Program](https://developer.apple.com/programs/enroll/)
*   [Google Play Developer Account](https://play.google.com/apps/publish/signup/)

## Step 1: Installation

First, install all the project dependencies using npm (or your preferred package manager).

```bash
npm install
```

## Step 2: Environment Variables

The game requires a Google Gemini API key to function.

1.  Create a new file in the root of the project named `.env.local`.
2.  Add your API key to this file as follows:

```
VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

Replace `YOUR_GEMINI_API_KEY_HERE` with your actual key. This file is ignored by version control, so your key will remain private.

## Step 3: Add Native Platforms

Capacitor manages native projects in `ios` and `android` directories. To add these platforms to your project, run the following commands:

```bash
# For iOS
npx cap add ios

# For Android
npx cap add android
```

These commands will create the `ios` and `android` folders containing the native Xcode and Android Studio projects, respectively.

## Step 4: Build and Sync

Whenever you make changes to the web application code, you need to build it and then sync the web assets with your native projects.

1.  **Build the Web App:** This command compiles the React/TypeScript code into static HTML, CSS, and JavaScript files in the `dist` directory.

    ```bash
    npm run build
    ```

2.  **Sync with Native Projects:** This command copies the built web assets into the native iOS and Android projects.

    ```bash
    npx cap sync
    ```

## Step 5: Run on Device/Emulator

After syncing, you can open the native projects in their respective IDEs to run them on a device or emulator.

### For iOS

```bash
npx cap open ios
```

This will open the project in Xcode. From there, you can select a target device (or simulator) and click the "Run" button.

### For Android

```bash
npx cap open android
```

This will open the project in Android Studio. From there, you can select a target device (or emulator) and click the "Run" button.

## Publishing to App Stores

Once you have tested your app and are ready to publish, you will need to follow the official documentation for generating signed release builds and submitting them to the stores.

*   [iOS Deployment Guide](https://capacitorjs.com/docs/ios)
*   [Android Deployment Guide](https://capacitorjs.com/docs/android)

This involves creating app icons, splash screens, and providing store metadata, all of which can be configured through Capacitor and the native IDEs.
