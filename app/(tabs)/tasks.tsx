import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TaskCard from '../../components/TaskCard';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';
import { tasks } from '../../data/tasks';

type Filter = 'All' | 'Pending' | 'Completed';

export default function TasksScreen() {
  const router = useRouter();

  const [filter, setFilter] = useState<Filter>('All');
  const [, setRefresh] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setRefresh((value) => value + 1);
    }, [])
  );

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') {
      return true;
    }

    return task.status === filter;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Tasks
      </Text>

      <View style={styles.filters}>
        {(['All', 'Pending', 'Completed'] as Filter[]).map(
          (item) => (
            <Text
              key={item}
              onPress={() => setFilter(item)}
              style={[
                styles.filter,
                filter === item && styles.activeFilter,
              ]}
            >
              {item}
            </Text>
          )
        )}
      </View>

      <FlatList
        data={filteredTasks}
        extraData={tasks.map((task) => task.status).join(',')}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() =>
              router.push(`/task/${item.id}`)
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No tasks found.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  title: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginBottom: 18,
  },

  filters: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },

  filter: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    color: COLORS.text,
    overflow: 'hidden',
  },

  activeFilter: {
    backgroundColor: COLORS.primary,
    color: '#FFFFFF',
  },

  list: {
    gap: 12,
    paddingBottom: 30,
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.muted,
  },
});