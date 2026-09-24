import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';

export default function App() {
  // Task 2 State Variables
  const [username, setUsername] = useState('emilys'); //[cite: 1]
  const [password, setPassword] = useState('emilyspass'); //[cite: 1]
  const [profile, setProfile] = useState(null); //[cite: 1]
  const [loading, setLoading] = useState(false); //[cite: 1]
  const [error, setError] = useState(''); //[cite: 1]

  async function handleLogin() {
    // Temporary placeholder for handleLogin (Task 3)
    console.log('Logging in with:', username);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Profile</Text>

      {/* Display readable error message if present */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Password Input with secureTextEntry */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry //[cite: 1]
      />

      {/* Login Button with loading state handling */}
      <Button
        title={loading ? "Logging in..." : "Login"} //[cite: 1]
        onPress={handleLogin} //[cite: 1]
        disabled={loading} //[cite: 1]
      />

      {loading && <ActivityIndicator style={{ marginTop: 15 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});