import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import StudentCard, { type Student } from '@/components/StudentCard';
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

export default function StudentsScreen() {
  const { token } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const loadStudents = useCallback(async () => {
    if (!token) {
      setStudents([]);
      setError('Please sign in to view students.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Your session is not authorized to view students.');
        }

        throw new Error('The student service is unavailable. Please try again.');
      }

      let data: unknown;

      try {
        data = await response.json();
      } catch {
        throw new Error('The student service returned an invalid response.');
      }

      if (!Array.isArray(data) || !data.every(isStudent)) {
        throw new Error('The student service returned an invalid response.');
      }

      setStudents(data);
    } catch (caughtError) {
      if (caughtError instanceof TypeError) {
        setError('Unable to connect to the student service. Check the API and try again.');
      } else {
        setError(caughtError instanceof Error ? caughtError.message : 'Unable to load students. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void loadStudents();
  }, [loadStudents]);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredStudents = normalizedSearch
    ? students.filter((student) => student.name?.toLowerCase().includes(normalizedSearch))
    : students;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>
      <TextInput style={styles.input} accessibilityLabel="Search students" placeholder="Search by name" value={search} onChangeText={setSearch} />
      {loading ? (
        <View style={styles.state}><ActivityIndicator color="#245bb2" /><Text style={styles.text}>Loading students…</Text><Text style={styles.note}>Fetching records from the exam API.</Text></View>
      ) : error ? (
        <View style={styles.state} accessibilityLiveRegion="polite"><Text style={styles.error}>{error}</Text><Pressable accessibilityRole="button" onPress={loadStudents}><Text style={styles.link}>Try Again</Text></Pressable></View>
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item, index) => String(item.id ?? index)}
          renderItem={({ item }) => <StudentCard student={item} />}
          ListEmptyComponent={<View style={styles.state}><Text style={styles.text}>No students found.</Text></View>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f2f5fa' },
  title: { fontSize: 28, fontWeight: '700', color: '#17324d', marginBottom: 20 },
  input: { padding: 14, borderWidth: 1, borderColor: '#c6d2e1', borderRadius: 8, backgroundColor: '#ffffff', color: '#17324d', marginBottom: 20 },
  state: { padding: 24, gap: 12, alignItems: 'center' },
  text: { color: '#536579' },
  note: { color: '#536579', fontSize: 12 },
  error: { color: '#b42318' },
  link: { color: '#245bb2', padding: 12 },
});
