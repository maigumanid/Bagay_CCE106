import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';

type CounterDisplayProps = {
  value: number;
};

export default function CounterDisplay({
  value,
}: CounterDisplayProps) {
  return (
    <View style={styles.card}>
      <ThemedText style={styles.label}>
        CURRENT COUNT
      </ThemedText>

      <ThemedText style={styles.value}>
        {value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 650,
    backgroundColor: '#521525',
    borderRadius: 18,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#E7A0AA',
    marginBottom: 10,
  },

  value: {
    lineHeight: 80,
    fontSize: 64,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
