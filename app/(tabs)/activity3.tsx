import { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import ActivityHeader from '@/components/ActivityHeader';
import CounterDisplay from '@/components/CounterDisplay';
import CounterButton from '@/components/CounterButton';

export default function Activity3Screen() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(Math.max(0, count - 1));
  };

  return (
    <View style={styles.container}>

      <ActivityHeader title="Activity 3" />

      <View style={styles.content}>

        <CounterDisplay value={count} />

        <View style={styles.card}>
          <ThemedText style={styles.sectionTitle}>
            Counter Controls
          </ThemedText>

          <View style={styles.buttonRow}>

            <CounterButton
              title="−"
              onPress={decrement}
              disabled={count === 0}
            />

            <CounterButton
              title="+"
              onPress={increment}
            />

          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B0A18',
    paddingHorizontal: 28,
    paddingTop: 20,
  },

  content: {
    flex: 1,
    paddingTop: 25,
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 650,
    backgroundColor: '#521525',
    borderRadius: 18,
    padding: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
});
