# WiseWallet

A comprehensive mobile application for personal financial management, featuring offline capabilities, expense tracking, and visual analytics.

## Features

-   **Dashboard**: Real-time overview of your finances with a total balance and quick summary.
-   **Transaction Tracking**: Easily add income and expenses with categories and notes.
-   **Visual Analytics**: Interactive pie charts to visualize your spending habits.
-   **Transaction History**: Scrollable list of your recent financial activity.
-   **Responsive Design**: optimized for both Android and iOS (and Web).
-   **Offline-First Architecture**: Built to be fast and work without an internet connection (using local storage principles).

## Tech Stack

-   **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
-   **Language**: TypeScript
-   **UI Library**: [React Native Paper](https://callstack.github.io/react-native-paper/)
-   **Navigation**: Expo Router
-   **Charts**: `react-native-chart-kit`
-   **Gradients**: `expo-linear-gradient`
-   **Backend (Dev)**: `json-server` (Mock API)

## Prerequisites

-   [Node.js](https://nodejs.org/) (LTS recommended)
-   [npm](https://www.npmjs.com/) (Node Package Manager)
-   Specific for Android: Android Studio & Emulator
-   Specific for iOS: Xcode (macOS only)

## How to Run

### 1. Install Dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

### 2. Start the Mock Backend

This project uses `json-server` to simulate a backend API. This **must be running** for the app to load and save data.

```bash
npm run server
```

*This will start a local server at `http://localhost:3000` (or `0.0.0.0:3000`).*

### 3. Start the App

Open a **new terminal window** (keep the server running in the first one) and run one of the following commands:

**For Android:**
```bash
npm run android
```
*(Requires an Android Emulator running or a physical device connected via USB with USB Debugging enabled)*

**For iOS (Mac only):**
```bash
npm run ios
```

**For Web (Browser):**
```bash
npm run web
```

## Troubleshooting

-   **App updates but data doesn't?**
    Ensure the `npm run server` command is still running. The app fails to fetch data if this server stops.

-   **"Network Error" on Android?**
    The app is configured to use `10.0.2.2` for Android emulators to reach localhost. If you are using a PHYSICAL device, you need to replace `API_URL` in `hooks/useTransactions.ts` with your computer's local IP address (e.g., `http://192.168.1.5:3000`).

-   **Charts look blank?**
    Add some transactions! The charts need data to render.
