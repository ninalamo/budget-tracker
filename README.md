# WiseWallet

A comprehensive personal financial management app built with React Native and Expo.

## Features

-   📊 **Dashboard**: See your total balance, income vs expenses, and recent transactions at a glance.
-   💡 **Financial Tips**: Get random money management advice to improve your financial habits.
-   📈 **Expense Chart**: Visualize where your money goes with an interactive pie chart.
-   🧾 **Receipt Capture**: Attach photos of receipts to any transaction (Camera or Gallery).
-   💳 **Payment Methods**: Track whether you paid with Cash, Card, Bank Transfer, or E-Wallet.
-   📍 **Establishment Tracking**: Log where the transaction happened (e.g., "Jollibee", "SM Mall").
-   📅 **Calendar View**: See your transactions on a calendar with day-by-day details.
-   💰 **Budgeting**: Set monthly spending limits and track your progress with visual bars.

## Tech Stack

-   **Framework**: React Native + Expo
-   **Language**: TypeScript
-   **UI**: React Native Paper (Material Design)
-   **Charts**: react-native-chart-kit
-   **Calendar**: react-native-calendars
-   **Camera**: expo-image-picker
-   **API (Dev)**: json-server

## Prerequisites

-   Node.js (LTS)
-   npm
-   Android Studio (for Android) or Xcode (for iOS)

## How to Run

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Mock Backend

This app uses `json-server` for development. You **must** run this for data to load/save:

```bash
npm run server
```

Keep this terminal open.

### 3. Start the App

Open a **new** terminal:

**For Web:**
```bash
npm run web
```

**For Android Emulator:**
```bash
npm run android
```

**For iOS Simulator (Mac only):**
```bash
npm run ios
```

## Usage

1.  **View Dashboard**: See your balance and recent activity.
2.  **Tap "Add" Button**: Add a new transaction with all details.
3.  **Attach a Receipt**: Use the "Take Photo" or "Gallery" buttons.
4.  **Tap Calendar Icon**: View transactions by date.
5.  **Tap Budget Icon**: Set and track your spending limits.

## Troubleshooting

-   **Data not loading?** Make sure `npm run server` is running.
-   **Network error on Android?** The app uses `10.0.2.2` for emulators. For physical devices, update `API_URL` in `hooks/useTransactions.ts` to your computer's IP.
-   **Charts empty?** Add some expense transactions first!
