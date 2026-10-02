import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { API_BASE_URL } from '@/constants/api';
import { type User } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';

function isProfile(value: unknown): value is User {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const profile = value as Record<string, unknown>;

  return typeof profile.id === 'number'
    && Number.isFinite(profile.id)
    && typeof profile.name === 'string'
    && typeof profile.email === 'string'
    && typeof profile.role === 'string';
}

export default function ProfileScreen() {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = useCallback(async () => {
    if (!token) {
      setProfile(null);
      setError('Please sign in to view your profile.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    setProfile(null);

    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Your session is not authorized to view this profile.');
        }

        throw new Error('The profile service is unavailable. Please try again.');
      }

      let data: unknown;

      try {
        data = await response.json();
      } catch {
        throw new Error('The profile service returned an invalid response.');
      }

      if (!isProfile(data)) {
        throw new Error('The profile service returned an invalid response.');
      }

      setProfile(data);
    } catch (caughtError) {
      if (caughtError instanceof TypeError) {
        setError('Unable to connect to the profile service. Check the API and try again.');
      } else {
        setError(caughtError instanceof Error ? caughtError.message : 'Unable to load your profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>
      {loading ? (
        <View style={styles.state}><ActivityIndicator color="#245bb2" /><Text style={styles.text}>Loading profile…</Text></View>
      ) : error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text>
      ) : null}
      <View style={styles.card}>
        <Text style={styles.text}>Name: {profile?.name || '—'}</Text>
        <Text style={styles.text}>Email: {profile?.email || '—'}</Text>
        <Text style={styles.text}>Role: {profile?.role || '—'}</Text>
        {!loading && !error && !profile && <Text style={styles.note}>No profile loaded yet.</Text>}
      </View>
      <Text style={styles.text}>Session Status: {token ? 'Authenticated' : 'Not Available'}</Text>
      <Pressable accessibilityRole="button" style={styles.button} onPress={logout}><Text style={styles.buttonText}>LOGOUT</Text></Pressable>
      <Text style={styles.note}>Exam starter: complete logout() in AuthContext.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 20, backgroundColor: '#f2f5fa' },
  title: { color: '#17324d', fontSize: 24, fontWeight: '700' },
  state: { gap: 12, alignItems: 'center' },
  card: { backgroundColor: '#ffffff', padding: 20, gap: 16, borderRadius: 12 },
  text: { color: '#536579', fontSize: 16 },
  error: { color: '#b42318' },
  note: { color: '#536579', fontSize: 12 },
  button: { backgroundColor: '#245bb2', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '600' },
});
