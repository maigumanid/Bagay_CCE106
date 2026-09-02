import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';

type CalculatorInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
};

export default function CalculatorInput({
  label,
  value,
  onChangeText,
}: CalculatorInputProps) {
  return (
    <View style={styles.field}>
      <ThemedText style={styles.label}>
        {label}
      </ThemedText>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor="#C58A96"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 17,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E7A0AA',
    marginBottom: 7,
  },

  input: {
    minHeight: 48,
    backgroundColor: '#3B0A18',
    borderWidth: 1,
    borderColor: '#8E4A5B',
    borderRadius: 10,
    paddingHorizontal: 14,
    color: '#FFFFFF',
    fontSize: 16,
  },
});
