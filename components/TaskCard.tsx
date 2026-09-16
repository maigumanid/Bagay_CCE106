import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS, TYPOGRAPHY } from '../constants/theme';
import { Task } from '../data/tasks';

type TaskCardProps = {
  task: Task;
  onPress: () => void;
};

export default function TaskCard({
  task,
  onPress,
}: TaskCardProps) {
  const completed = task.status === 'Completed';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Ionicons
            name={
              completed
                ? 'checkmark-circle'
                : 'time-outline'
            }
            size={22}
            color={completed ? '#6B8735' : COLORS.primaryDark}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{task.title}</Text>

          <Text style={styles.subject}>
            {task.subject}
          </Text>

          <View style={styles.dueRow}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={COLORS.textSecondary}
            />

            <Text style={styles.due}>
              {task.dueDate}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.status,
            completed
              ? styles.completed
              : styles.pending,
          ]}
        >
          <Text style={styles.statusText}>
            {task.status}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.98 }],
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },

  content: {
    flex: 1,
  },

  title: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.text,
  },

  subject: {
    marginTop: 3,
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },

  dueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 9,
  },

  due: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  status: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 5,
  },

  pending: {
    backgroundColor: '#FFE7A0',
  },

  completed: {
    backgroundColor: COLORS.success,
  },

  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.text,
  },
});