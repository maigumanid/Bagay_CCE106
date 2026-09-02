import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

type CalculationResultProps = {
  result: string;
  isError: boolean;
};

export default function CalculationResult({
  result,
  isError,
}: CalculationResultProps) {
  if (!result) {
    return null;
  }

  return (
    <View
      style={[
        styles.resultBox,
        isError && styles.errorBox,
      ]}
    >
      <ThemedText style={styles.label}>
        RESULT
      </ThemedText>

      <ThemedText style={styles.result}>
        {result}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  resultBox: {
    backgroundColor: '#3B0A18',
    borderWidth: 1,
    borderColor: '#8E4A5B',
    borderRadius: 10,
    padding: 18,
    marginTop: 20,
  },

  errorBox: {
    borderColor: '#E65A5A',
  },

  label: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#E7A0AA',
    marginBottom: 7,
  },

  result: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
