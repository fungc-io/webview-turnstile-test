/**
 * Turnstile WebView Test App
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const WEBVIEW_URL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [showWebView, setShowWebView] = useState(false);

  const handleOpenTurnstile = () => {
    setShowWebView(true);
  };

  const handleCloseWebView = () => {
    setShowWebView(false);
  };

  if (showWebView) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseWebView}
          >
            <Text style={styles.closeButtonText}>← Close</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Turnstile Test</Text>
        </View>

        <WebView
          source={{ uri: WEBVIEW_URL }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onError={(error) => {
            console.log('WebView error:', error);
            Alert.alert(
              'WebView Error',
              'Failed to load the page. Make sure the server is running on localhost:3000'
            );
          }}
          onLoad={() => {
            console.log('WebView loaded successfully');
          }}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>🛡️ Turnstile WebView Test</Text>

        <Text style={styles.description}>
          Test Cloudflare Turnstile integration in a WebView
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleOpenTurnstile}
        >
          <Text style={styles.buttonText}>Open Turnstile Test</Text>
        </TouchableOpacity>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            • Make sure the server is running: npm run server{'\n'}
            • Server should be accessible at: {WEBVIEW_URL}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: '#0066cc',
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginRight: 50, // Balance the close button
  },
  webview: {
    flex: 1,
  },
});

export default App;
