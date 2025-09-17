# WebView Turnstile Test App

A React Native application that demonstrates Cloudflare Turnstile integration within a WebView component. The app includes both iOS and Android support with a Node.js Express server for backend verification.

## Features

- React Native WebView integration with Cloudflare Turnstile
- Cross-platform support (iOS and Android)
- Environment variable configuration for security
- Express server with Turnstile token verification
- Platform-specific network handling

## Setup

> **Note**: Make sure you have completed the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### 1. Install dependencies

```bash
npm install
```

### 2. iOS setup

```bash
cd ios && pod install && cd ..
```

### 3. Environment configuration

- Copy `.env.example` to `.env`
- Add your Cloudflare Turnstile keys:
  ```
  TURNSTILE_SECRET=your_secret_key_here
  TURNSTILE_SITEKEY=your_site_key_here
  ```

## Running the Application

### 1. Start the Express server

```bash
npm run server
```
Server runs on `http://localhost:3000`

### 2. Run the React Native app

**iOS:**
```bash
npm run ios
```
Uses `localhost:3000` in iOS Simulator

**Android:**
```bash
npm run android
```
Uses `10.0.2.2:3000` for Android Emulator

## Network Configuration

The app automatically handles different network configurations:
- **iOS Simulator**: `localhost:3000`
- **Android Emulator**: `10.0.2.2:3000`
- **Physical devices**: Use your machine's local IP address

## Security

- Environment variables are used for API keys
- `.env` file is excluded from version control
- Site keys are dynamically injected by the server

## Development

- `npm start` - Start Metro bundler
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Troubleshooting

If you're having issues:

1. **Build failures**: Try cleaning caches:
   ```bash
   # iOS
   cd ios && rm -rf build && cd ..
   # React Native
   npx react-native start --reset-cache
   ```

2. **Network issues**:
   - iOS Simulator: Use `localhost:3000`
   - Android Emulator: Use `10.0.2.2:3000`
   - Physical devices: Use your machine's IP address

3. **Environment variables**: Ensure `.env` file exists with proper keys

For more React Native troubleshooting, see the [official docs](https://reactnative.dev/docs/troubleshooting).