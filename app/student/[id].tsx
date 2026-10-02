import { useCallback, useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type Student } from '@/components/StudentCard';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';

function isStudent(value: unknown): value is Student {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const student = value as Record<string, unknown>;

  return typeof student.id === 'number'
    && Number.isFinite(student.id)
    && typeof student.name === 'string'
    && typeof student.email === 'string'
    && typeof student.course === 'string';
}

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const studentId = (Array.isArray(id) ? id[0] : id)?.trim() ?? '';
  const router = useRouter();
  const { token } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = useCallback(async () => {
    if (!studentId) {
      setStudent(null);
      setError('A valid student id is required.');
      setLoading(false);
      return;
    }

    if (!token) {
      setStudent(null);
      setError('Please sign in to view student details.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    setStudent(null);

    try {
      const response = await fetch(`${API_BASE_URL}/students/${encodeURIComponent(studentId)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Your session is not authorized to view this student.');
        }

        if (response.status === 404) {
          throw new Error('Student not found.');
        }

        throw new Error('The student service is unavailable. Please try again.');
      }

      let data: unknown;

      try {
        data = await response.json();
      } catch {
        throw new Error('The student service returned an invalid response.');
      }

      if (!isStudent(data)) {
        throw new Error('The student service returned an invalid response.');
      }

      setStudent(data);
    } catch (caughtError) {
      if (caughtError instanceof TypeError) {
        setError('Unable to connect to the student service. Check the API and try again.');
      } else {
        setError(caughtError instanceof Error ? caughtError.message : 'Unable to load this student. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [studentId, token]);

  useEffect(() => {
    void loadStudent();
  }, [loadStudent]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Details</Text>
      {!studentId ? <Text style={styles.error} accessibilityLiveRegion="polite">A valid student id is required.</Text>
        : loading ? <View style={styles.state}><ActivityIndicator color="#245bb2" /><Text style={styles.text}>Loading student…</Text></View>
        : error ? <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text>
        : !student ? <Text style={styles.text}>No student record available.</Text> : null}
      <View style={styles.card}>
        <Text style={styles.text}>ID: {studentId || 'Not available'}</Text>
        <Text style={styles.text}>Name: {student?.name || '—'}</Text>
        <Text style={styles.text}>Email: {student?.email || '—'}</Text>
        <Text style={styles.text}>Course: {student?.course || '—'}</Text>
      </View>
      <Pressable accessibilityRole="button" style={styles.button} onPress={() => router.back()}><Text style={styles.buttonText}>Back</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 20, backgroundColor: '#f2f5fa' },
  title: { color: '#17324d', fontSize: 28, fontWeight: '700' },
  state: { gap: 12, alignItems: 'center' },
  card: { backgroundColor: '#ffffff', padding: 20, gap: 16, borderRadius: 12 },
  text: { color: '#536579', fontSize: 16 },
  error: { color: '#b42318' },
  button: { backgroundColor: '#245bb2', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '600' },
});
