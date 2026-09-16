import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppButton from '../../components/AppButton';
import StatCard from '../../components/StatCard';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';
import { profile } from '../../data/profile';
import { tasks } from '../../data/tasks';

const PROFILE_KEY = '@studyflow_profile';

export default function DashboardScreen() {
  const router = useRouter();

  const [studentName, setStudentName] = useState(profile.fullName);
  const [totalTasks, setTotalTasks] = useState(tasks.length);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  const updateDashboard = () => {
    setTotalTasks(tasks.length);

    setPendingTasks(
      tasks.filter((task) => task.status === 'Pending').length
    );

    setCompletedTasks(
      tasks.filter((task) => task.status === 'Completed').length
    );
  };

  const loadProfile = async () => {
    try {
      const savedProfile =
        await AsyncStorage.getItem(PROFILE_KEY);

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);

        profile.fullName = parsed.fullName;
        profile.program = parsed.program;

        setStudentName(parsed.fullName);
      } else {
        setStudentName(profile.fullName);
      }
    } catch {
      setStudentName(profile.fullName);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
      updateDashboard();
    }, [])
  );

  const firstName =
    studentName.trim().split(' ')[0] || 'Student';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Welcome back,
          </Text>

          <Text style={styles.name}>
            {firstName}!
          </Text>
        </View>

        <View style={styles.iconCircle}>
          <Ionicons
            name="person-outline"
            size={24}
            color={COLORS.primary}
          />
        </View>
      </View>

      <Text style={styles.subtitle}>
        Stay organized and keep up with your studies.
      </Text>

      <View style={styles.stats}>
        <StatCard
          title="Total Tasks"
          value={String(totalTasks)}
          icon="list-outline"
        />

        <StatCard
          title="Pending"
          value={String(pendingTasks)}
          icon="time-outline"
        />

        <StatCard
          title="Completed"
          value={String(completedTasks)}
          icon="checkmark-circle-outline"
        />
      </View>

      <View style={styles.quickAction}>
        <Text style={styles.sectionTitle}>
          Quick Action
        </Text>

        <AppButton
          title="Browse My Tasks"
          icon="list-outline"
          onPress={() => router.push('/tasks')}
        />
      </View>

      <View style={styles.profileAction}>
        <AppButton
          title="Edit Profile"
          icon="person-outline"
          variant="secondary"
          onPress={() => router.push('/profile')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  greeting: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
  },

  name: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
  },

  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
    marginTop: 6,
    marginBottom: 24,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },

  stats: {
    gap: 12,
  },

  quickAction: {
    marginTop: 28,
  },

  sectionTitle: {
    ...TYPOGRAPHY.heading,
    color: COLORS.text,
    marginBottom: 12,
  },

  profileAction: {
    marginTop: 12,
  },
});