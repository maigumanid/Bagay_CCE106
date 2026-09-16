import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppButton from '../../components/AppButton';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';
import { tasks } from '../../data/tasks';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const taskIndex = tasks.findIndex(
    (item) => item.id === id
  );

  const task =
    taskIndex !== -1 ? tasks[taskIndex] : null;

  const [status, setStatus] = useState(
    task?.status ?? 'Pending'
  );

  if (!task) {
    return (
      <View style={styles.invalidContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={64}
          color={COLORS.primary}
        />

        <Text style={styles.invalidTitle}>
          Task Not Found
        </Text>

        <Text style={styles.invalidText}>
          The task ID you entered does not exist.
        </Text>

        <AppButton
          title="Go Home"
          icon="home-outline"
          onPress={() => router.replace('/')}
        />
      </View>
    );
  }

  const toggleStatus = () => {
    const newStatus =
      status === 'Completed'
        ? 'Pending'
        : 'Completed';

    tasks[taskIndex].status = newStatus;

    setStatus(newStatus);
  };

  return (
    <View style={styles.container}>
      <AppButton
        title="Back to Tasks"
        icon="arrow-back-outline"
        variant="secondary"
        onPress={() => router.back()}
      />

      <View style={styles.card}>
        <Text style={styles.subject}>
          {task.subject}
        </Text>

        <Text style={styles.title}>
          {task.title}
        </Text>

        <View style={styles.row}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={COLORS.primary}
          />

          <Text style={styles.info}>
            Due: {task.dueDate}
          </Text>
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>
            Status
          </Text>

          <Text
            style={[
              styles.status,
              status === 'Completed'
                ? styles.completed
                : styles.pending,
            ]}
          >
            {status}
          </Text>
        </View>

        <Text style={styles.description}>
          {task.description}
        </Text>

        <AppButton
          title={
            status === 'Completed'
              ? 'Mark as Pending'
              : 'Mark as Completed'
          }
          icon={
            status === 'Completed'
              ? 'time-outline'
              : 'checkmark-circle-outline'
          }
          onPress={toggleStatus}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    marginTop: 18,
  },

  subject: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
  },

  title: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginTop: 6,
    marginBottom: 18,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },

  info: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  statusLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
  },

  status: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    fontWeight: '700',
  },

  completed: {
    backgroundColor: '#DDF4E4',
    color: COLORS.success,
  },

  pending: {
    backgroundColor: '#FFF1C7',
    color: COLORS.primary,
  },

  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
    lineHeight: 24,
    marginBottom: 24,
  },

  invalidContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  invalidTitle: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginTop: 16,
  },

  invalidText: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
});